import localidades from "@/data/localidades.json";


export type Coordenadas = {
    lat: number;
    lng: number;
};

export const DEPOSITO: Coordenadas & { nombre: string } = {
    lat: -31.385,
    lng: -64.235,
    nombre: "Depósito Salus Aequitas",
};

const PROVINCIA_POR_DEFECTO = "cordoba";



function normalizar(texto: string) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/ capital$/, "");
}

const INDICE: Record<string, Record<string, Coordenadas>> = {};

for (const [provincia, localidadesDeLaProvincia] of Object.entries(localidades)) {
    const porNombre: Record<string, Coordenadas> = {};
    for (const [nombre, [lat, lng]] of Object.entries(localidadesDeLaProvincia)) {
        porNombre[normalizar(nombre)] = { lat, lng };
    }
    INDICE[normalizar(provincia)] = porNombre;
}

export function coordenadasDe(ciudad: string, provincia?: string): Coordenadas | null {
    const nombre = normalizar(ciudad);

    if (provincia) {
        return INDICE[normalizar(provincia)]?.[nombre] ?? null;
    }

    const enLaDeDefecto = INDICE[PROVINCIA_POR_DEFECTO]?.[nombre];
    if (enLaDeDefecto) return enLaDeDefecto;

    const encontradas = Object.values(INDICE)
        .map((porNombre) => porNombre[nombre])
        .filter(Boolean);

    return encontradas.length === 1 ? encontradas[0] : null;
}
