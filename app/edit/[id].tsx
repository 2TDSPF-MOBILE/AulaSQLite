import { getNotes } from "@/src/db/notes";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, TextInput, View,Alert } from "react-native";
import { updatedNote } from "@/src/db/notes";

interface Note{
    id:number,
    title:string,
    content:string,
    createdAt:string
}

export default function EditNoteScreen(){
    const params = useLocalSearchParams<{id:string}>()
    const router = useRouter()

    const[title,setTitle]=useState("")
    const[content,setContent]=useState("")

    useEffect(()=>{
        if(!params.id) return //Se não tiver id, nada é realizado.

        const note = (getNotes() as Note[])
            .find(n=>n.id === Number(params.id))
        
        //Se encontrou a nota
        if(note){
            setTitle(note.title)
            setContent(note.content)
        }
    },[params.id])

    //Função para atualizar a nota
    function handleUpdate(){
        if(!title.trim()){//Validação simples, o title não pode estar vazio.
            Alert.alert("Atenção","Digite um título")
            return
        }
        updatedNote(Number(params.id),title,content) //Atualiza a nota no banco de dados
        router.back()//Volta para a tela anterior
    }

    return(
        <View style={{flex:1, padding:20}}>

            {/* TextInput do título */}
            <TextInput
            placeholder="Título"
            value={title}
            onChangeText={(value)=>setTitle(value)}
            style={{borderWidth:1, padding:10,
                marginBottom:10, borderRadius:6
            }}
            />
              {/* TextInput do conteúdo da nota */}
              <TextInput
              placeholder="Conteúdo"
              value={content}
              onChangeText={(value)=>setContent(value)}
              multiline
              style={{borderWidth:1, padding:20,
              marginBottom:10, borderRadius:6 }}
              />
              <Button title="Atualizar" onPress={handleUpdate}/>
        </View>
    )
}