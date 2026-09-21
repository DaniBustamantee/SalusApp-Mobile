import { API_URL } from "@/constants/api";
import * as SecureStore from "expo-secure-store";


export async function login(email:string, password: string) {
    
    const res = await fetch(`${API_URL}/auth/login`,{
        method: "POST",
        headers:{"Content-Type":"application/json"
    },
        body: JSON.stringify({email, password}),
    });


    const data = await res.json();

    if(!res.ok){
        throw new Error(data.error || "Datos incorrectos"
        );
    }

    

    return data;

}

export async function fetchAuth(ruta:string, opciones: RequestInit = {}) {
    const token = await SecureStore.getItemAsync("token");

    const res = await fetch(`${API_URL}${ruta}`,{
        ...opciones,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    return res;
}
