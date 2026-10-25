import { HistorialTab } from "@/components/HistorialTab";
import { PendientesTab } from "@/components/PendientesTab";
import { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DefaultTheme, useTheme } from "styled-components/native";

const TABS = [

    { id: 1, label: "Pendientes", component: <PendientesTab /> },
    { id: 2, label: "Historial", component: <HistorialTab /> },
];


export default function Envios() {

    const [activeTab, setActiveTab] = useState(TABS[0]);
    const theme = useTheme();
    const styles = useMemo(() => crearEstilos(theme), [theme])

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
}


const crearEstilos = (theme: DefaultTheme) => StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: theme.colors.background },
    tabBar: { flexDirection: "row", gap: 10, marginBottom: 15 },
    tab: { paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.border, backgroundColor: theme.colors.surface },
    tabActive: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
    tabLabel: { color: theme.colors.textSecondary, fontSize: 14 },
    tabLabelActive: { color: theme.colors.surface, fontWeight: "bold" },
    content: { flex: 1 },
})