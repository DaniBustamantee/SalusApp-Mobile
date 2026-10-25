import { fetchAuth } from "@/services/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { DefaultTheme, useTheme } from "styled-components/native";

const OPCIONES = ["completo", "parcial", "fallido"];

export default function Confirmar() {

    const { id } = useLocalSearchParams();
    const [resultado, setResultado] = useState("completo");
    const [observaciones, setObservaciones] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");
    const theme = useTheme();
    const styles = useMemo(() => crearEstilos(theme), [theme])

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

const crearEstilos = (theme: DefaultTheme) => StyleSheet.create({
    container: { flex: 1, padding: 24, backgroundColor: theme.colors.background },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
    opciones: { flexDirection: "row", gap: 10, marginBottom: 20 },
    opcion: { flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface, alignItems: "center" },
    opcionElegida: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
    opcionTexto: { color: theme.colors.textSecondary, fontWeight: "600" },
    opcionTextoElegido: { color: theme.colors.surface },
    input: { backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, padding: 14, fontSize: 16, minHeight: 90, textAlignVertical: "top", marginBottom: 20 },
    boton: { backgroundColor: theme.colors.primary, padding: 15, borderRadius: 8, alignItems: "center" },
    botonTexto: { color: theme.colors.surface, fontWeight: "bold", fontSize: 16 },
    error: { color: theme.colors.danger, textAlign: "center", marginBottom: 12 },
});