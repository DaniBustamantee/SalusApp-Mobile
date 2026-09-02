import { View, Text, StyleSheet } from "react-native";

export default function historial() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de entregas</Text>
      <Text>✅ Pedido #1 - Entregado</Text>
      <Text>✅ Pedido #2 - Entregado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 }
});
