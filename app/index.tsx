import { Button, FlatList, Text, View } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { getNotes, deleteNote } from "../src/db/notes"
import { useCallback, useState } from "react";
import {MotiText,MotiView} from "moti"

export default function Index() {
  const router = useRouter()
  const [notes, setNotes] = useState<any[]>([])//Estado para armazenar as notas

  //Será executado todas que a tela receber foco
  useFocusEffect(
    useCallback(() => {
      setNotes(getNotes())//Carrega as notas do banco.
    }, [])
  )

  //Função para deletar a nota
  function handleDelete(id: number) {
    deleteNote(id)
    setNotes(getNotes())//atualiza a lista
  }

  return (
    <View>
      <Button title="Adicionar nota" onPress={() => router.push("/add")}></Button>
      <View style={{alignItems:'center'}}>
        <Text>LISTA DE NOTAS</Text>
      </View>
      <FlatList
        data={notes}
        keyExtractor={item=>item.id.toString()}
        renderItem={({ item,index })  => (
          <MotiView
            from={{opacity:0, translateY:20}}
            animate={{opacity:1,translateY:0}}
            transition={{delay:index*1000}}
            style={{ borderBottomWidth: 1, padding: 10, marginBottom: 5 }}
          >
            <MotiText
              from={{scale:0.95}}
              animate={{scale:1}}
              transition={{delay:index*1000}}
              style={{ fontWeight: 'bold', fontSize: 16 }}
            >
              {item.title}
           </MotiText>

            <Text>{item.content}</Text>
            {/* Botões para editar e deletar a nota */}
            <View style={{ flexDirection: 'row', marginTop: 5, gap: 5 }}>
              <Button title="Editar" onPress={()=>router.push(`/edit/${item.id}`)}/>
              <Button color='red' title="Deletar" onPress={()=>handleDelete(item.id)} />
            </View>
          </MotiView>
        )}
      />
    </View>

  );
}
