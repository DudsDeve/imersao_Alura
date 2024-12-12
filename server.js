import express from 'express';
import { routes } from './src/routes/postRoutes.js';

const app = express(); //assim iniciamos o expres
app.use(express.static("uploads"))
//utilizamos para abrir a pasta uploads para o publioco, para servir arquivos estaticos
routes(app)

app.listen(3000, () => { //criar o servidor
    console.log('Server rodando na porta 3000');
});








//---------------------------- 
//Tudo abaixo dessa linha devia ta em outro aquivo apenas para estudo
function buscarPostPorId(id){
return posts.findIndex((post) => post.id === Number(id))
 //FindIndex, aqui ele vai achar o id e comparar com o id que foi passado, colocamos o Number caso ele chegue em formato de string ele vire um number
}
app.get("/posts/:id", (req, res) => { //para criar uma rota com id para pegar apenas um especifico

    const index = buscarPostPorId(req.params.id) 
    //toda req tem parametros, o parametro é o que passamos onde está escrito :id,
    // poderia ser qualquer valor que mesmo assim o params conseguiria acessar

     res.status(200).json(posts[index]); 
     //aqui estamos entrando em posts e passando a posição do item que queremos retornar de dentro do array

  
  });
//para testar http://localhost:3000/api
