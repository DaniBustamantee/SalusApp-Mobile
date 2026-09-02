import { View, Text, ScrollView, StyleSheet } from "react-native";
import MenuButton from "../components/MenuButton";
import { useRouter, Href } from "expo-router";




export default function Index() {
  const router = useRouter();
  return (
    <ScrollView style={styles.container}>
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
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  menu: { flexDirection: "column", gap: 15 }
});
