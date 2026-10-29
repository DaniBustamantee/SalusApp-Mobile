import type { Coordenadas } from "@/constants/ciudades";
import type { Parada } from "@/utils/construirHtmlMapa";


const OSRM = "https://router.project-osrm.org";
const ERROR_RUTA = "No se pudo calcular la ruta";

export type Ruta = {
    paradas: Parada[];
    trazado: [number, number][];
    distanciaKm: number;
    duracionMin: number;
};

export async function calcularRuta(paradas: Parada[], deposito: Coordenadas):
    Promise<Ruta> {
    const puntos = [deposito, ...paradas].map((p) => `${p.lng},${p.lat}`).join(";");
    const url = `${OSRM}/trip/v1/driving/${puntos}?roundtrip=false&source=first&geometries=geojson&overview=full`;

    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        if (!respuesta.ok || datos.code !== "Ok") throw new Error();

        const viaje = datos.trips[0];
        const ordenadas = paradas
            .map((parada, i) => ({ parada, posicion: datos.waypoints[i + 1].waypoint_index as number }))
            .sort((a, b) => a.posicion - b.posicion)
            .map((item, i) => ({ ...item.parada, numero: i + 1 }));

        return {
            paradas: ordenadas,
            trazado: viaje.geometry.coordinates.map(([lng, lat]: [number, number]) =>
                [lat, lng]),
            distanciaKm: viaje.distance / 1000,
            duracionMin: viaje.duration / 60,
        };
    } catch {
        throw new Error(ERROR_RUTA);
    }
}