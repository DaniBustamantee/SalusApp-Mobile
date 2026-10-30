import PedidoCard from "@/components/PedidoCard";
import { useEnvios } from "@/hooks/useEnvios";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { useTheme } from "styled-components/native";
import MensajeError from "./MensajeError";



export function PendientesTab() {

    const router = useRouter();
    const { envios, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useEnvios("pendiente");
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
                <Pressable
                    onPress={() => router.push({
                        pathname: "/confirmar",
                        params: { id: envio.id_envio }
                    })}>
                    <PedidoCard
                        nroPedido={envio.nro_pedido}
                        Cliente={envio.contacto_receptor}
                        estado={envio.resultado_entrega ? "Entregado" : "Pendiente"}
                        fecha={envio.fecha_despacho}
                    />
                </Pressable>
            )}
        />
    );
}