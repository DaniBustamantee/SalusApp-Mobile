import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter, Href } from "expo-router"; 

type Props = {
  title: string;
  route: Href; 
};

export default function MenuButton({ title, route }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push(route)}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2ecc71",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center"
  },
  text: { color: "#fff", fontWeight: "bold" }
});
