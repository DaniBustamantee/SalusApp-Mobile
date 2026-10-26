import { fetchAuth } from "@/services/auth";
import { Envio } from "@/types/envio";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export function useEnvios() {

    const { data: envios = [], isLoading, error, refetch } = useQuery<Envio[]>({
        queryKey: ["mis-envios"],
        queryFn: async () => {
            const res = await fetchAuth("/envios/mis-envios");
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al obtener envíos");
            return data;
        },
    });

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );

    return { envios, isLoading, error, refetch };
}