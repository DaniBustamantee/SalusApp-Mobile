import { ScrollView, StyleSheet, Text } from "react-native";
import PedidoCard from "../components/PedidoCard";

const pedidos = [
  { nroPedido: "#001", Cliente: "Farmacia Central", estado: "En camino", fecha: "02/09/2026"},
  { nroPedido: "#002", Cliente: "Herboristeria Vida", estado: "Pendiente", fecha: "20/00/2026"},
  { nroPedido: "#003", Cliente: "Distribuidora Norte", estado: "Entregado", fecha: "25/08/2026"},
  { nroPedido: "#004", Cliente: "Farmacia San Martin", estado: "En camino", fecha: "03/09/2026"},
  { nroPedido: "#005", Cliente: "Herboristeria Natural", estado: "Pendiente", fecha: "10/09/2026"},
];

export default function Pedidos() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Pedidos Asignados</Text>
      {pedidos.map((p) => (
        <PedidoCard
          key={p.nroPedido}
          nroPedido={p.nroPedido}
          Cliente={p.Cliente}
          estado={p.estado}
          fecha={p.fecha}
          />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});
