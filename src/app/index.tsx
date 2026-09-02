import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import MenuButton from "../components/MenuButton";

export default function Index() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("../../assets/images/logo-vitabiosa.png")}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Logo de Vita Biosa"
      />

      <Text style={styles.titulo}>Panel del Repartidor</Text>

      <View style={styles.menu}>
        <MenuButton title=" Pedidos asignados" route="/pedidos" />
        <MenuButton title=" Mapa de entrega" route="/mapa" />
        <MenuButton title=" Historial de entregas" route="/historial" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  content: { padding: 20 },
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 12
  },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  menu: { flexDirection: "column", gap: 15 }
});
