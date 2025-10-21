import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
    <View>
      <Button title="Adicionar nota" onPress={()=>router.push("/add")}></Button>
      <Text>LISTA DE NOTASS</Text>
    </View>
      
  );
}
