import express from 'express';
import multer from 'multer';
import { atualizaNovoPost, listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsControllers.js';
import cors from 'cors'
//cors serve como medida de segurança para passar os dados para o front
const corsOptions = {
  origin: "http://localhost:8000",
  //aqui vamos conseguir enviar para o front para esse endereço, ja estabelecido no front
  optionsSuccessStatus: 200,
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Especifica o diretório para armazenar as imagens enviadas
      cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
    },
    filename: function (req, file, cb) {
      // Mantém o nome original do arquivo por simplicidade
      cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
    }
  });
//configuração do multer para quem ta no windows

const upload = multer({storage: storage})
//aqui eu inicio o multer, receita de bolo e crio uma pasta onde ele vai armazenar as imagens

export const routes = (app) => {
    app.use(express.json());
     //utilizando o express para lidar com o JSON, tudo que ele reconhecer ele vai retornar em JSON

  app.use(cors(corsOptions))
  //para ativarmos o cors 
  
    app.get("/posts", listarPosts);
    //puxamos os posts

    app.post("/posts",postarNovoPost )
    //cadastramos novos posts

    app.post("/upload", upload.single("imagem"), uploadImagem)
    //.single("imagem") quer dizer que a KEY, vai se chamar imagem
    //aqui eu crio uma rota para upload de imagens, o multer.single("imagem") é para pegar a imagem com o nome "imagem"

    app.put("/upload/:id", atualizaNovoPost )

  }
