import { HistorialTab } from "@/components/HistorialTab";
import { PendientesTab } from "@/components/PendientesTab";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



const TABS = [

    { id: 1, label: "Pendientes", component: <PendientesTab/> },
    { id: 2, label: "Historial", component: <HistorialTab/> },
];


export default function Envios() {

    const [activeTab, setActiveTab] = useState(TABS[0]);


    return (
        <View style={styles.container}>
            <View style={styles.tabBar}>
                {TABS.map((tab) => {
                    const isActive = activeTab.id === tab.id;
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            onPress={() => setActiveTab(tab)}
                            style={[styles.tab, isActive && styles.tabActive]}
                        >
                            <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            <View style={styles.content}>
                {activeTab.component}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
    tabBar: { flexDirection: "row", gap: 10, marginBottom: 15 },
    tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, borderWidth: 1, borderColor: "#ddd", backgroundColor: "#fff" },
    tabActive: { backgroundColor: "#2ecc71", borderColor: "#2ecc71" },
    tabLabel: { color: "#555", fontSize: 14 },
    tabLabelActive: { color: "#fff", fontWeight: "bold" },
    content: { flex: 1 },
})