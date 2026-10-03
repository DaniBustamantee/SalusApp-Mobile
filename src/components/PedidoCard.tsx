import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";





type Props = {
    nroPedido: string;
    Cliente: string;
    estado: string;
    fecha: string;
};

function iconos(estado: string) {
    if (estado === "completo") return { icono: "checkmark-circle", color: "#2ecc71" } as const;
    if (estado === "parcial") return { icono: "alert-circle", color: "#f39c12" } as const;
    if (estado === "fallido") return { icono: "close-circle", color: "#e74c3c" } as const
    return { icono: "time", color: "#95a5a6" } as const;
}



export default function PedidoCard({ nroPedido, Cliente, estado, fecha }: Props) {

    const { icono, color } = iconos(estado);


    return (
        <View style={styles.card}>
            <View style={styles.encabezado}>
                <Text style={styles.numero}>Pedido {nroPedido}</Text>
                <Ionicons name={icono} size={24} color={color} />
            </View>
            <Text style={styles.dato}>Cliente: {Cliente}</Text>
            <Text style={styles.dato}>Estado: {estado}</Text>
            <Text style={styles.dato}>Fecha: {fecha}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        borderLeftWidth: 4,
        borderLeftColor: "#2ecc71",
        elevation: 2,
    },
    numero: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
    dato: { fontSize: 14, color: "#555" },
    encabezado: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }
});