import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { DefaultTheme, useTheme } from "styled-components/native";





type Props = {
    nroPedido: string;
    Cliente: string | null;
    estado: string | null;
    fecha: string | null;
};

function iconos(estado: string | null, theme: DefaultTheme) {
    if (estado === "completo") return { icono: "checkmark-circle", color: theme.colors.primary } as const;
    if (estado === "parcial") return { icono: "alert-circle", color: theme.colors.warning } as const;
    if (estado === "fallido") return { icono: "close-circle", color: theme.colors.danger } as const
    return { icono: "time", color: theme.colors.muted } as const;
}



export default function PedidoCard({ nroPedido, Cliente, estado, fecha }: Props) {

    const theme = useTheme();
    const { icono, color } = iconos(estado, theme);
    const dato = [styles.dato, { color: theme.colors.textSecondary }];

    return (
        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderLeftColor: color }]}>
            <View style={styles.encabezado}>
                <Text style={styles.numero}>Pedido {nroPedido}</Text>
                <Ionicons name={icono} size={24} color={color} />
            </View>
            <Text style={dato}>Cliente: {Cliente ?? "-"}</Text>
            <Text style={dato}>Estado: {estado ?? "-"}</Text>
            <Text style={dato}>Fecha: {fecha ?? "-"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 4,
        elevation: 2,
    },
    numero: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    dato: { fontSize: 14, },
    encabezado: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
});