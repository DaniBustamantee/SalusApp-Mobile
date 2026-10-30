import PedidoCard from "@/components/PedidoCard";
import { useEnvios } from "@/hooks/useEnvios";
import { ActivityIndicator, FlatList } from "react-native";
import { useTheme } from "styled-components/native";
import MensajeError from "./MensajeError";


export function HistorialTab() {
    const { envios, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useEnvios("entregado");
    const theme = useTheme();



    if (isLoading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

    if (error && envios.length === 0) {
        return <MensajeError mensaje={error.message} onReintentar={() => refetch()} />
    }


    return (
        <FlatList
            data={envios}
            keyExtractor={(envio) => String(envio.id_envio)}
            onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <ActivityIndicator color={theme.colors.primary} /> : null}
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