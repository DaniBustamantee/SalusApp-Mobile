import styled from "styled-components/native";


type Props = {
    mensaje: string;
    onReintentar: () => void;
};

const Contenedor = styled.View`
align-items: center;
padding: ${(props) => props.theme.spacing.large}px;
`;

const Mensaje = styled.Text`
color: ${(props) => props.theme.colors.danger};
text-align: center;
margin-bottom: ${(props) => props.theme.spacing.medium}px;
`;

const Boton = styled.TouchableOpacity`
background-color: ${(props) => props.theme.colors.primary};
padding: 10px 20px;
border-radius: 8px
`;

const TextoBoton = styled.Text`
color: ${(props) => props.theme.colors.surface};
font-weight: bold;
`;

export default function MensajeError({mensaje, onReintentar}: Props){
    return(
        <Contenedor>
            <Mensaje>{mensaje}</Mensaje>
            <Boton onPress={onReintentar}>
                <TextoBoton>Reintentar</TextoBoton>
            </Boton>
        </Contenedor>
    );
}