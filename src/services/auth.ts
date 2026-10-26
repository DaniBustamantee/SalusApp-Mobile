import { API_URL } from "@/constants/api";
import * as SecureStore from "expo-secure-store";

const ERROR_CONEXION = "No se pudo conectar con el servidor. Revisá tu conexión";


export async function login(email: string, password: string) {

    let res: Response;

    try {
        res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
    } catch {
        throw new Error(ERROR_CONEXION);
    }
    const data = await res.json();

    if (!res.ok){
        throw new Error(data.error || "Datos incorrectos");
    }

    return data;
}


export async function fetchAuth(ruta: string, opciones: RequestInit = {}) {
    const token = await SecureStore.getItemAsync("token");

    try {
        return await fetch(`${API_URL}${ruta}`, {
            ...opciones,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    } catch {
        throw new Error(ERROR_CONEXION);
    }

}
