import { Href, useRouter } from "expo-router";
import styled from "styled-components/native";

type Props = {
  title: string;
  route: Href;
};

const Boton = styled.TouchableOpacity`
background-color: ${(props) => props.theme.colors.primary};
padding: ${(props) => props.theme.spacing.medium}px;
margin: 10px 0;
border-radius: 8px;
align-items: center;
`;

const Texto = styled.Text`
color: ${(props) => props.theme.colors.surface};
font-weight: bold;
`;

export default function MenuButton({ title, route }: Props) {
  const router = useRouter();

  return (
    <Boton onPress={() => router.push(route)}>
      <Texto>{title}</Texto>
    </Boton>
  );
}

