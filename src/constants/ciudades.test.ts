import { coordenadasDe } from "./ciudades";

describe("coordenadasDe", () => {
    it("encuentra una ciudad ignorando tildes, mayusculas y espacios", () => {
        const cordoba = coordenadasDe("Córdoba");
        expect(cordoba).not.toBeNull();
        expect(cordoba!.lat).toBeCloseTo(-31.4, 0);
        expect(cordoba!.lng).toBeCloseTo(-64.2, 0);
        expect(coordenadasDe("CORDOBA  ")).toEqual(cordoba);
    });

    it("ignora la palabra 'capital' al final", () => {
        expect(coordenadasDe("Córdoba Capital")).toEqual(coordenadasDe("Córdoba"));
    });

    it("encuentra una ciudad que está en una sola provincia", () => {
        const rosario = coordenadasDe("Rosario");
        expect(rosario).not.toBeNull();
        expect(rosario!.lat).toBeCloseTo(-32.9, 0);
    });

    it("prefiere Córdoba cuando el nombre existe en varias provincias", () => {
        const sanMartin = coordenadasDe("San Martín");
        expect(sanMartin).toEqual(coordenadasDe("San Martín", "Córdoba"));
    });

    it("devuelve null si el nombre es ambiguo y ninguna es Córdoba", () => {
        expect(coordenadasDe("Bermejo")).toBeNull();
    });

    it("con la provincia se resuelve la ambiguedad", () => {
        expect(coordenadasDe("Bermejo", "San Juan")).not.toBeNull();
    });

    it("con provincia no busca en las demas", () => {
        expect(coordenadasDe("Río Cuarto")).not.toBeNull();
        expect(coordenadasDe("Río Cuarto", "Mendoza")).toBeNull();
    });

    it("devuelve null si la ciudad no existe", () => {
        expect(coordenadasDe("Ciudad Inventada")).toBeNull();
    })
})