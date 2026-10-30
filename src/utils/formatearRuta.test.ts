import { formatearRuta } from "./formatearRuta";

describe("formatearRuta", () => {
    it("muestra solo minutos si dura menos de una hora", () =>{
        expect(formatearRuta(12.4, 25)).toBe("12 km - 25 min");
    });

    it ("muestra horas y minutos si dura una hora o mas", () => {
        expect(formatearRuta(2164.2, 1636)).toBe("2164 km - 27 h 16 min");
    });

    it ("redondea antes de separar horas y minutos", () => {
        expect(formatearRuta(100, 119.6)).toBe("100 km - 2 h 0 min");
    });

    it("una hora exacta", () => {
        expect(formatearRuta(50, 60)).toBe("50 km - 1 h 0 min");
    }); 

    it("ruta de cero", () => {
        expect(formatearRuta(0, 0)).toBe("0 km - 0 min");
    });
});