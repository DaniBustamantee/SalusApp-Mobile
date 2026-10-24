import PedidoCard from "@/components/PedidoCard";
import { useEnvios } from "@/hooks/useEnvios";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Pressable } from "react-native";

export function PendientesTab() {

    const router = useRouter();
    const { envios, isLoading } = useEnvios();

    if (isLoading) return <ActivityIndicator size="large" color="#2ecc71" />;

    return (
        <FlatList
            data={envios.filter((envio) => !envio.resultado_entrega)}
            keyExtractor={(envio) => String(envio.id_envio)}
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