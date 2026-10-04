import { useSessionStore } from "@/store/useSessionStore";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import MenuButton from "../components/MenuButton";



export default function Index() {

  const usuario = useSessionStore((state) => state.usuario);
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useSessionStore((state) => state.logout);


  async function handleLogout() {
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("usuario");
    logout();
    queryClient.clear();
    router.replace("/login")
  }

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
      <Text style={styles.saludo}>Hola {usuario?.nombre}</Text>
      <View style={styles.menu}>
        <MenuButton title=" Pedidos asignados" route="/pedidos" />
        <MenuButton title=" Mapa de entrega" route="/mapa" />
        <MenuButton title=" Historial de entregas" route="/historial" />
        <Pressable style={styles.cerrarsesion} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={"#e74c3c"}></Ionicons>
          <Text style={styles.cerrarTexto}>Cerrar sesion</Text>
        </Pressable>
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
  menu: { flexDirection: "column", gap: 15 },
  saludo: { textAlign: "center", fontSize: 16, color: "#0f0101", marginBottom: 20 },
  cerrarsesion: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: "#e74c3c", backgroundColor: "#fff" },
  cerrarTexto: { color: "#e74c3c", fontWeight: "bold", fontSize: 16 }
});
