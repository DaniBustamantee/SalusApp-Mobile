import { coordenadasDe } from "@/constants/ciudades";
import type { Envio } from "@/types/envio";
import type { Parada } from "@/utils/construirHtmlMapa";

export function armarParadas(envios: Envio[]) {
    const usadas: Record<string, number> = {};
    const paradas: Parada[] = [];
    let sinUbicacion = 0;

    for (const envio of envios) {
        const coord = coordenadasDe(envio.ciudad_entrega);
        if (!coord) {
            sinUbicacion++;
            continue;
        }

        const clave = `${coord.lat},${coord.lng}`;
        const repetidas = usadas[clave] ?? 0;
        usadas[clave] = repetidas + 1;

        paradas.push({
            id: envio.id_envio,
            numero: paradas.length + 1,
            lat: coord.lat + repetidas * 0.008,
            lng: coord.lng + repetidas * 0.005,
            titulo: `${envio.nro_envio} · ${envio.nro_pedido}`,
            detalle: `${envio.contacto_receptor ?? "-"} - ${envio.ciudad_entrega}`,
        });
    }

    return { paradas, sinUbicacion }
}