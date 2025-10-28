import { addNotes } from "@/src/db/notes";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { MotiView,MotiText } from "moti";
export default function AddNoteScreen(){
    const [title, setTitle]=useState("")//estado para o title
    const [content, setContent]= useState("")// state para o content
    const router = useRouter()//hook de navigation

    //func que será acionada quando clicar em salvar
    function handleSave(){
        if(!title.trim()){
            Alert.alert("Atenção", "Digite um título para a nota")
            return
        }

        addNotes(title, content)// salva 
        router.back()
    }

    return(
        <View style={{flex:1, padding:20}}>

            <MotiView
                from={{opacity:0,translateX:-30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
            {/* TextInput do título */}
            <TextInput
            placeholder="Título"
            value={title}
            onChangeText={(value)=>setTitle(value)}
            style={{borderWidth:1, padding:10,
                marginBottom:10, borderRadius:6
            }}
            />
            </MotiView>
            
            <MotiView
                from={{opacity:0,translateX:30}}
                animate={{opacity:1,translateX:0}}
                transition={{delay:300}}
            >
                {/* TextInput do conteúdo da nota */}
              <TextInput
              placeholder="Conteúdo"
              value={content}
              onChangeText={(value)=>setContent(value)}
              multiline
              style={{borderWidth:1, padding:20,
              marginBottom:10, borderRadius:6 }}
              />
            </MotiView>
             
             <MotiView
                from={{scale:1}}
                animate={{scale:1.05}}
                transition={{
                    loop:true,
                    type:"timing",
                    duration:300
                }}
             >
                <Button title="salvar" onPress={handleSave}/>
             </MotiView>
             
        </View>
    )
}