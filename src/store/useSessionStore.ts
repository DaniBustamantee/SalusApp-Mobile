import { create } from "zustand";


type Usuario = {id: number; nombre: string; apellido: string; email: string; rol: string;};

type SessionStore = {
    usuario:  Usuario | null;
    setUsuario: (usuario: Usuario) =>void;
    logout: () => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
    usuario:  null,
    setUsuario: (usuario) => set ({ usuario }),
    logout: () => set({ usuario: null }),
}));