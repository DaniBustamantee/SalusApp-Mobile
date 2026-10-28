import MensajeError from "@/components/MensajeError";
import { DEPOSITO } from "@/constants/ciudades";
import { useEnvios } from "@/hooks/useEnvios";
import { armarParadas } from "@/utils/armarParadas";
import { construirHtmlMapa } from "@/utils/construirHtmlMapa";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useMemo, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { DefaultTheme, useTheme } from "styled-components/native";


export default function Mapa() {
  const theme = useTheme();
  const styles = useMemo(() => crearEstilos(theme), [theme]);
  const { envios, isLoading, error, refetch } = useEnvios();
  const webViewRef = useRef<WebView>(null);
  const [ubicando, setUbicando] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState("");
  const { paradas, sinUbicacion } = useMemo(
    () => armarParadas(envios.filter((envio) => !envio.resultado_entrega)),
    [envios]
  );

  const html = useMemo(
    () => construirHtmlMapa(paradas, DEPOSITO, {
      colorParada: theme.colors.primary,
      colorDeposito: theme.colors.secondary,
    }),
    [paradas, theme]
  );

  async function irAMiUbicacion() {
    setErrorUbicacion("");
    setUbicando(true);
    try {
      const { granted } = await
        Location.requestForegroundPermissionsAsync();
      if (!granted) {
        setErrorUbicacion("Permiso de ubicación denegado");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      webViewRef.current?.injectJavaScript(
        `window.mostrarMiPosicion(${pos.coords.latitude}, ${pos.coords.longitude}); true;`
      );
    } catch {
      setErrorUbicacion("No se pudo obtener tu ubicación");
    } finally {
      setUbicando(false);
    }
  }

  if (isLoading) return <ActivityIndicator size="large" color={theme.colors.primary} />;
  if (error && envios.length === 0) {
    return <MensajeError mensaje={error.message} onReintentar={() => refetch()} />;
  }

  if (paradas.length === 0) {
    return (
      <View style={styles.centro}>
        <Text style={styles.texto}>No hay envíos pendientes con ubicación para mostrar</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      {sinUbicacion > 0 && (
        <Text style={styles.aviso}>
          {sinUbicacion} {sinUbicacion === 1 ? "envío sin ubicación" : "envíos sin ubicación"}
        </Text>
      )}
      {errorUbicacion !== "" && <Text style={styles.avisoError}>{errorUbicacion}</Text>}
      <View style={styles.zonaMapa}>
        <WebView ref={webViewRef} source={{ html, baseUrl: "https://salusapp.local" }} style={styles.mapa} />
        <Pressable style={styles.botonUbicacion} onPress={irAMiUbicacion} disabled={ubicando}>
          {ubicando
            ? <ActivityIndicator color={theme.colors.surface} />
            : <Ionicons name="locate" size={26} color={theme.colors.surface} />}
        </Pressable>
      </View>
    </SafeAreaView>
  );

}

const crearEstilos = (theme: DefaultTheme) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  zonaMapa: { flex: 1 },
  mapa: { flex: 1 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24, backgroundColor: theme.colors.background },
  texto: { color: theme.colors.textSecondary, textAlign: "center" },
  aviso: { backgroundColor: theme.colors.warning, color: theme.colors.surface, padding: 10, textAlign: "center", fontWeight: "bold" },
  avisoError: { backgroundColor: theme.colors.danger, color: theme.colors.surface, padding: 10, textAlign: "center", fontWeight: "bold" },
  botonUbicacion: { position: "absolute", right: 16, bottom: 40, width: 52, height: 52, borderRadius: 26, backgroundColor: theme.colors.primary, alignItems: "center", justifyContent: "center", elevation: 4 },
});
