import { fetchAuth } from "@/services/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";


const OPCIONES = ["completo", "parcial", "fallido"];

export default function Confirmar() {

    const { id } = useLocalSearchParams();
    const [resultado, setResultado] = useState("completo");
    const [observaciones, setObservaciones] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");


    async function handleConfirmar() {
        setError("");
        try {
            const res = await fetchAuth(`/envios/${id}/confirmar`, {
                method: "PATCH",
                body: JSON.stringify({ resultado, observaciones }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "No se pudo confirmar la entrega");
            }
            router.back();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error inesperado");
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Confirmar entrega</Text>


            <View style={styles.opciones}>
                {OPCIONES.map((opcion) => (
                    <Pressable
                        key={opcion}
                        style={[styles.opcion, resultado === opcion && styles.opcionElegida]}
                        onPress={() => setResultado(opcion)}>
                        <Text style={[styles.opcionTexto, resultado === opcion && styles.opcionTextoElegido]}>
                            {opcion}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <TextInput
                style={styles.input}
                value={observaciones}
                onChangeText={setObservaciones}
                placeholder="Observaciones (opcional)"
                multiline>
            </TextInput>

            {error !== "" && <Text style={styles.error}>{error}</Text>}
            <Pressable style={styles.boton} onPress={handleConfirmar}>
                <Text style={styles.botonTexto}>Confirmar entrega</Text>
            </Pressable>
        </View>
    );



}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: "#f9f9f9" },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    opciones: { flexDirection: "row", gap: 10, marginBottom: 20 },
    opcion: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#fff", alignItems: "center" },
    opcionElegida: { backgroundColor: "#2ecc71", borderColor: "#2ecc71" },
    opcionTexto: { color: "#555", fontWeight: "600" },
    opcionTextoElegido: { color: "#fff" },
    input: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 14, fontSize: 16, minHeight: 90, textAlignVertical: "top", marginBottom: 20 },
    boton: { backgroundColor: "#2ecc71", padding: 15, borderRadius: 8, alignItems: "center" },
    botonTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    error: { color: "#e74c3c", textAlign: "center", marginBottom: 12 },
});