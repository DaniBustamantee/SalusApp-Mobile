import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack initialRouteName="login" >
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ title: "Inicio" }} />
        <Stack.Screen name="envios" options={{ title: "Mis envíos" }} />
        <Stack.Screen name="mapa" options={{ title: "Mapa de entrega" }} />
        <Stack.Screen name="confirmar" options={{ title: "Confirmar entrega" }} />
      </Stack>
    </QueryClientProvider>
  );
}
