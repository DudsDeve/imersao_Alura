import { atualizarNovoPost, criarPost, getTodosPosts,  } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServise.js";
export async function listarPosts(req, res)  {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
    }

export async function postarNovoPost(req, res){
const novoPost = req.body
//toda rquisição tem um corpo quando vai se enviar dados (metodo post)

try{ 
    //utilizamos o try para ele tentar criar o post
    const postCriado = await criarPost(novoPost)
    res.status(200).json(postCriado);
} catch (erro){
    console.error(erro.message)
    res.status(500).json({"Erro": 'Falha ao salvar o post' });

}
}

export async function uploadImagem(req, res){
    const novoPost = req.body
    //toda rquisição tem um corpo quando vai se enviar dados (metodo post)
    
    try{ 
        //utilizamos o try para ele tentar criar o post
        const postCriado = await criarPost(novoPost)
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        //enviamos o endereço da imagem que esta no nosso servidor
        //e cada imagem enviada para o servidor tem uma Id diferente no insertedId, então passamos isso para pegar o id da imagem salva
        
        fs.renameSync(req.file.path, imagemAtualizada)
        //para renomear o arquivo com o id novo gerado
        //nome do caminho da requisição e renomeamos com o novo nome no imagem atualizada

        res.status(200).json(postCriado);
    } catch (erro){
        console.error(erro.message)
        res.status(500).json({"Erro": 'Falha ao salvar o post' });
    
    }
    
    
    }

export async function atualizaNovoPost(req, res) {

    const id = req.params.id;
    //pegar o id da url

    const urlImagem = `http://localhost:3000/${id}.png`
    //aqui ja estamos linkando o id da imagem ao servidor

   

try{ 
  
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    //vamos no file sistem para ele ler uma imagem especifica pelo id dela
    const descricao = await gerarDescricaoComGemini(imgBuffer)

    const post = {
        imgUrl: urlImagem,
        //descricao: req.body.descricao,
        //essa informação vem do put, então vamo mandar essa requisição quando criamos a imagem

        descricao: descricao,
        //agora a descrição vai ser gerada pelo gemini

        alt: req.body.alt,
        //tambem vamos receber do put

        //tudo que vier do put, temos que passar como REQ.BODY

    }

    const postCriado = await atualizarNovoPost(id, post)
    //id = eu passo onde vai ser atualizado
    //post = dados que vamos atualizar no banco de dados
    

    res.status(200).json(postCriado);
} catch (erro){
    console.error(erro.message)
    res.status(500).json({"Erro": 'Falha ao salvar o post' });

}
    }




    //controllers são tudo o que vai ser ligado as rotas, 
   // como  por exemplor pegar o  banco de dados
  
   // Gerenciar as requisições (requests) e respostas (responses) do servidor.
   //Receber requisições HTTP, interagir com o modelo para buscar ou alterar dados, e retornar respostas ao cliente.