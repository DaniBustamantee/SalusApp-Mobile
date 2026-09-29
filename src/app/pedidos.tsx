import { fetchAuth } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import PedidoCard from "../components/PedidoCard";



export default function Pedidos() {

  const router = useRouter();
  const { data: envios = [], isLoading, refetch } = useQuery<any[]>({
    queryKey: ["mis-envios"],
    queryFn: async () => {
      const res = await fetchAuth("/envios/mis-envios");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error consiguiendo envios");
      return data;
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );




  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Pedidos Asignados</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#2ecc71" />
      ) : (
        <FlatList
          data={envios.filter((envio) => !envio.resultado_entrega)}
          keyExtractor={(envio) => String(envio.id_envio)}
          renderItem={({ item: envio }) => (
            <Pressable
              onPress={() => router.push({ pathname: "/confirmar", params: { id: envio.id_envio } })}>
              <PedidoCard
                nroPedido={envio.nro_pedido}
                Cliente={envio.contacto_receptor}
                estado={envio.resultado_entrega ? "Entregado" : "Pendiente"}
                fecha={envio.fecha_despacho}
              />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});
