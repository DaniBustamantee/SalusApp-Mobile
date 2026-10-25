import { useSessionStore } from "@/store/useSessionStore";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useMemo } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DefaultTheme, useTheme } from "styled-components/native";
import MenuButton from "../components/MenuButton";

export default function Index() {

  const usuario = useSessionStore((state) => state.usuario);
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useSessionStore((state) => state.logout);
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => crearEstilos(theme), [theme]);


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
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 20 }]}
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
        <MenuButton title=" Mis envíos" route="/envios" />
        <MenuButton title=" Mapa de entrega" route="/mapa" />
        <Pressable style={styles.cerrarsesion} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={theme.colors.danger}></Ionicons>
          <Text style={styles.cerrarTexto}>Cerrar sesion</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const crearEstilos = (theme: DefaultTheme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  content: { padding: 20 },
  logo: {
    width: 160,
    height: 160,
    alignSelf: "center",
    marginBottom: 12
  },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  menu: { flexDirection: "column", gap: 15 },
  saludo: { textAlign: "center", fontSize: 16, color: theme.colors.text, marginBottom: 20 },
  cerrarsesion: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.danger, backgroundColor: theme.colors.surface },
  cerrarTexto: { color: theme.colors.danger, fontWeight: "bold", fontSize: 16 }
});
