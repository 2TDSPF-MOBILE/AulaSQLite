import axios from "axios"

//Token da Hugging Face
const HF_API_KEY = process.env.EXPO_PUBLIC_HF_API_KEY

export async function generateTitleFromContentHF(content:string){
    //Validação simples caso o campo estiver vazio
    if(!content.trim()) return ""

    try{
        //Requisição que será realizada, será através do método POST
        //Estamos utilizando o model 'facebook/bart-large-cnn'
        const response = await axios.post("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", //URL do modelo
            {
                //inputs é o texto que será enviado e processado pelo modelo
                inputs:content,

                //Parametros adicionais do modelo
                parameters:{
                    max_length:20,    //tamanho máximo do título gerado
                    min_length:3,     //tamanho mínimo do título
                    do_sample:false,  //se true, haverá variações aleatórias
                    early_stopping: true //encerra a geração assim que o modelo achar adequado.
                }
            },
            {
                //Cabeçalho da requisição
                headers:{
                    Authorization: `Bearer ${HF_API_KEY}`, //Autorização
                    "Content-Type":"application/json" //Tipo do conteúdo
                }
            }
        )

        //O modelo retorna um array de resultados
    const generatedText = response.data?.[0]?.summary_text || response.data?.[0]?.generated_text || ""

    //Retorna o título gerado sem espaços
    return generatedText.trim()

    }catch(error){
        console.log("Erro ao gerar título com IA ",error)
        return ""
    }

}