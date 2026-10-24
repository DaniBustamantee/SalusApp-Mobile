import { fetchAuth } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function useEnvios() {
    const { data: envios = [], isLoading, refetch } = useQuery<any[]>({
        queryKey: ["mis-envios"],
        queryFn: async () => {
            const res = await fetchAuth("/envios/mis-envios");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al obtener envios");
            return data;
        },
    });

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    return { envios, isLoading };
}