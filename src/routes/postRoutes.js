import express from "express";
import multer from "multer";
import cors from "cors";
import { listPosts, newPosting, uploadImage, updateNewPost } from "../controllers/postController.js";

//define um endereço externo seguro onde pode ser feitas requisições
const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}
//define o destino que o multer salvara os arquivos
const upload = multer({dest:"./upload"});

const routes = (app) => {
    //a função use tem o papel de informar ao express que ele pode converter os dados em objetos JSON
    app.use(express.json());
    //coloca em uso a configuração do cors criada anteriormente
    app.use(cors(corsOptions));
    //a função get tem o papel de definir uma rota para ao servidor, que quando acessada envia uma informação
    app.get("/posts", listPosts);
    //a função post tem o papel de definir uma rota onde pode ser passado informações ao banco de dados.
    app.post("/posts", newPosting);
    //função que permite o upload de um arquivo.
    app.post("/upload", upload.single("image"), uploadImage);
    //função que atualiza informações de algum arquivo do banco de dados
    app.put("/upload/:id", updateNewPost);
}

export default routes;
