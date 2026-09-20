import { login } from "@/services/auth";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

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
        <View>
            <Text>Inicia Sesion</Text>

            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="password"
                secureTextEntry
            />

            {error !== "" && <Text>{error}</Text>}

            <Pressable onPress={handleLogin}>
                <Text>Ingresar</Text>
            </Pressable>

        </View>
    );

}