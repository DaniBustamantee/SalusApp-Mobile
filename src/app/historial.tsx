import PedidoCard from "@/components/PedidoCard";
import { fetchAuth } from "@/services/auth";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";



export default function Historial() {

  const [envios, setEnvios] = useState<any[]>([]);

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
      <Text style={styles.titulo}>Historial de Pedidos</Text>
      {envios.filter((envio) => envio.resultado_entrega).map((envio) => (
        <PedidoCard
          key={envio.id_envio}
          nroPedido={envio.nro_pedido}
          Cliente={envio.contacto_receptor}
          estado={envio.resultado_entrega}
          fecha={envio.fecha_entrega_real}
        />
      ))}
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 }
});
