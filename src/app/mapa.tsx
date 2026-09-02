import { View, Text, StyleSheet } from "react-native";

export default function mapa() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mapa de entrega</Text>
      <Text>🗺️ Aquí iría la integración con Google Maps</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 15 }
});
