import { fetchAuth } from "@/services/auth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import PedidoCard from "../components/PedidoCard";



export default function Pedidos() {

  const [envios, setEnvios] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function cargar() {
      const res = await fetchAuth("/envios/mis-envios");
      const data = await res.json();
      setEnvios(data);
    }
    cargar();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Pedidos Asignados</Text>
      {envios.filter((envio) => !envio.resultado_entrega).map((envio) => (
        <Pressable
          key={envio.id_envio}
          onPress={() => router.push({ pathname: "/confirmar", params: { id: envio.id_envio } })}>
          <PedidoCard
            nroPedido={envio.nro_pedido}
            Cliente={envio.contacto_receptor}
            estado={envio.resultado_entrega ? "Entregado" : "Pendiente"}
            fecha={envio.fecha_despacho}
          />
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});
