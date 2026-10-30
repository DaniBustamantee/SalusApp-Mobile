import { theme } from "@/styles/theme";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ThemeProvider } from "styled-components/native";
import MensajeError from "./MensajeError";


async function mostrar(mensaje:string, onReintentar = jest.fn()) {
    await render(
        <ThemeProvider theme={theme}>
            <MensajeError mensaje={mensaje} onReintentar={onReintentar}></MensajeError>
        </ThemeProvider>
    );

    return onReintentar;
    
}

describe("MensajeError", () => {
    it("muestra el mensaje recibido", async () => {
        await mostrar("No se pudo conectar con el servidor");

        expect(screen.getByText("No se pudo conectar con el servidor")).toBeTruthy();
    });

    it("al tocar Reintentar llama a onReintentar una vez", async () => {
        const onReintentar = await mostrar("Error");

        await fireEvent.press(screen.getByText("Reintentar"));

        expect(onReintentar).toHaveBeenCalledTimes(1);
    });
});