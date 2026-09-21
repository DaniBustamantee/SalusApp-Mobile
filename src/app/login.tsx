import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput } from "react-native";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogin() {

        setError("");
        try {
            const data = await login(email, password);
            await SecureStore.setItemAsync("token", data.token)
            await SecureStore.setItemAsync("usuario", JSON.stringify(data.usuario));
            router.replace("/")
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error");
        }
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>


            <Image
                source={require("../../assets/images/logo-vitabiosa.png")}
                style={styles.logo}
                resizeMode="contain"
                accessibilityLabel="Logo de Vita Biosa"
            />

            <Text style={styles.titulo}>Inicia Sesion</Text>

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Contraseña"
                secureTextEntry
            />

            {error !== "" && <Text style={styles.error}>{error}</Text>}

            <Pressable style={styles.boton} onPress={handleLogin}>
                <Text style={styles.botonTexto}>Ingresar</Text>
            </Pressable>

        </KeyboardAvoidingView>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f9f9f9" },
    logo: { width: 140, height: 140, alignSelf: "center", marginBottom: 12 },
    titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
    input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, marginBottom: 14, fontSize: 16 },
    error: { color: "#e74c3c", textAlign: "center", marginBottom: 14 },
    boton: { backgroundColor: "#2ecc71", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 6 },
    botonTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
})
