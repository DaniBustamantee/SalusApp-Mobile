import { StyleSheet, Text, View } from "react-native";

type Props = {
    nroPedido: string;
    Cliente: string;
    estado: string;
    fecha: string;
};

export default function PedidoCard({ nroPedido, Cliente, estado, fecha }: Props) {
    return (
        <View style={styles.card}>
            <Text style ={styles.numero}>Pedido {nroPedido}</Text>
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
});