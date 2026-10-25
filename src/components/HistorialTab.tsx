import PedidoCard from "@/components/PedidoCard";
import { useEnvios } from "@/hooks/useEnvios";
import { ActivityIndicator, FlatList } from "react-native";
import { useTheme } from "styled-components/native";



export function HistorialTab() {
    const { envios, isLoading } = useEnvios();
    const theme = useTheme();



    if (isLoading) return <ActivityIndicator size="large" color= {theme.colors.primary}/>;

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