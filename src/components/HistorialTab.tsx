import PedidoCard from "@/components/PedidoCard";
import { useEnvios } from "@/hooks/useEnvios";
import { ActivityIndicator, FlatList } from "react-native";

export function HistorialTab() {
    const { envios, isLoading } = useEnvios();

    if (isLoading) return <ActivityIndicator size="large" color="#2ecc71" />;

    return (
        <FlatList
            data={envios.filter((envio) => envio.resultado_entrega)}
            keyExtractor={(envio) => String(envio.id_envio)}
            renderItem={({ item: envio }) => (
                <PedidoCard
                    nroPedido={envio.nro_pedido}
                    Cliente={envio.contacto_receptor}
                    estado={envio.resultado_entrega}
                    fecha={envio.fecha_entrega_real}
                />

            )}
        />
    );


}