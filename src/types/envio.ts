export type ItemEnvio = {
    id_producto: number;
    producto: string;
    cantidad: number;
};

export type Envio = {
    id_envio: number;
    nro_envio: string;
    id_pedido: number;
    nro_pedido: string;
    direccion_entrega: string;
    ciudad_entrega: string;
    contacto_receptor: string | null;
    telefono_receptor: string | null;
    notas: string | null;
    fecha_despacho: string | null;
    fecha_entrega_est: string | null;
    fecha_entrega_real: string | null;
    resultado_entrega: "completo" | "parcial" | "fallido" | null;
    observaciones: string | null;
    tiene_incidencia: boolean;
    detalle_incidencia: string | null;
    items: ItemEnvio[];
};