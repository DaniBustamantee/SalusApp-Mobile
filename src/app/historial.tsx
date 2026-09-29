import PedidoCard from "@/components/PedidoCard";
import { fetchAuth } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";



export default function Historial() {

  const { data: envios = [], isLoading, refetch } = useQuery<any[]>({
    queryKey: ["mis-envios"],
    queryFn: async () => {
      const res = await fetchAuth("/envios/mis-envios");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al conseguir envios");
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
      <Text style={styles.titulo}>Historial de Pedidos</Text>
      {isLoading ? (
        <ActivityIndicator size="large" color="#2ecc71" />
      ) : (
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
      )}

    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 }
});
