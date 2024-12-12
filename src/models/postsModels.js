import 'dotenv/config'
import { ObjectId } from "mongodb";
import  conectarAoBanco  from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO) 
//aqui fazemos a conexão do banco de dados como um todo com a aplicação


export async function getTodosPosts(){
    const db = conexao.db("imerssao-instabytes") 
    //aqui vamos conectar ao armario "imersao0instabytes"
    const colecao = db.collection("posts") 
    // aqui estamos conectando a gaveta posts
    return colecao.find().toArray();
     //aqui estamos retornando todos os documentos do "posts" em forma de array para poder manipular
}


export async function criarPost(novoPost){
    const db = conexao.db("imerssao-instabytes") 
    const colecao = db.collection("posts") 

    return colecao.insertOne(novoPost)
    //aqui estamos inserindo um novo post no "posts"
    //pra isso serve o insertOne, quem define isso é a biblioteca de
    //BANCO que estamos usando, que no caso é o mongoDB

}

export async function atualizarNovoPost(id, novoPost){
    const db = conexao.db("imerssao-instabytes") 
    const colecao = db.collection("posts") 

    const objID = ObjectId.createFromHexString(id)
    //isso estava na documentação do mongoDB
    //aqui estamos guardando a id que vamos atualizar


    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost})
    //aqui estamos atualizando um novo post no "posts"
    //o _id ele é passado assim dentro do mongoDB,
    //o id ele vai criar um novo objeto  
    //e o $set é usado para alterar os dados que queremos atualizar


    //pra isso serve o updateOne, quem define isso é a biblioteca de
    //BANCO que estamos usando, que no caso é o mongoDB

}



// # regras de negócio da aplicação,
//Conterá esquemas (schemas) ou definições de tabelas e funções para manipular os dados no banco.