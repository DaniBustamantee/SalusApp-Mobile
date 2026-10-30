import type { Envio } from "@/types/envio";
import { armarParadas } from "./armarParadas";

function envio(datos: Partial<Envio>): Envio {
    return{
        id_envio: 1,
        nro_envio: "ENV-0001",
        id_pedido: 1,
        nro_pedido: "PED-0001",
        direccion_entrega: "Calle 123",
        ciudad_entrega: "Córdoba",
        contacto_receptor: "Ana",
        telefono_receptor: null,
        notas: null,
        fecha_despacho: null,
        fecha_entrega_est: null,
        fecha_entrega_real: null,
        resultado_entrega: null,
        observaciones: null,
        tiene_incidencia: false,
        detalle_incidencia: null,
        items: [],
        ...datos,
    };
}


describe("armarParadas", () =>{
    it("con una lista vacia no hay paradas", () => {
        expect(armarParadas([])).toEqual({paradas: [], sinUbicacion: 0});
    });

    it("arma la parada con id, numero, titulo y detalle", () => {
        const{paradas} = armarParadas([envio({id_envio: 7})]);
        expect(paradas).toHaveLength(1);
        expect(paradas[0]).toMatchObject({
            id: 7,
            numero: 1,
            titulo: "ENV-0001 · PED-0001",
            detalle: "Ana - Córdoba",
        });
    });

    it("usa un guion si el envio no tiene contacto", () => {
        const {paradas} = armarParadas([envio({contacto_receptor: null})]);
        expect(paradas[0].detalle).toBe("- - Córdoba");
    });

    it("cuenta los envios sin ubicacion y no les arma parada", () => {
        const {paradas, sinUbicacion} = armarParadas([
            envio({id_envio: 1}),
            envio({id_envio: 2, ciudad_entrega: "Ciudad Inventada"}),
            envio({id_envio: 3, ciudad_entrega: "Rosario"}),
        ]);

        expect(sinUbicacion).toBe(1);
        expect(paradas.map((p) => p.id)).toEqual([1, 3]);
        expect(paradas.map((p) => p.numero)).toEqual([1, 2]);
    });

    it("separa un poco las paradas de la misma ciudad para que no se tapen", () => {
        const {paradas} = armarParadas([
            envio({id_envio: 1}),
            envio({id_envio: 2}),
            envio({id_envio: 3}),
        ]);

        const posiciones = new Set(paradas.map((p) => `${p.lat},${p.lng}`));
        expect(posiciones.size).toBe(3);
        expect(paradas[1].lat - paradas[0].lat).toBeCloseTo(0.008, 5);
    });
})