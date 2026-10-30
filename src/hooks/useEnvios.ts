import { fetchAuth } from "@/services/auth";
import { Envio } from "@/types/envio";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const LIMITE = 10;

type Estado = "pendiente" | "entregado";


async function pedirEnvios(parametros: string): Promise<Envio[]> {
    const res = await fetchAuth(`/envios/mis-envios?${parametros}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al obtener envíos");
    return data;

}

function useRefrescarAlEnfocar(refetch: () => unknown) {
    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [refetch])
    );
}

export function useEnvios(estado: Estado) {
    const { data, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ["mis-envios", estado],
        initialPageParam: 1,
        queryFn: ({ pageParam }) =>
            pedirEnvios(`estado=${estado}&limit=${LIMITE}&page=${pageParam}`),
        getNextPageParam: (ultimaPagina, paginas) =>
            ultimaPagina.length === LIMITE ? paginas.length + 1 : undefined,
    });

    useRefrescarAlEnfocar(refetch);

    const envios = data?.pages.flat() ?? [];
    return { envios, isLoading, error, refetch, fetchNextPage, hasNextPage, isFetchingNextPage };
}

export function useTodosLosPendientes() {
    const { data: envios = [], isLoading, error, refetch } = useQuery<Envio[]>({
        queryKey: ["mis-envios", "pendiente", "todos"],
        queryFn: () => pedirEnvios("estado=pendiente"),
    });

    useRefrescarAlEnfocar(refetch);

    return { envios, isLoading, error, refetch };
}