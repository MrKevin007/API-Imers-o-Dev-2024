import fs from "fs";
import { getAllPosts, createPost, updatePost } from "../models/postModel.js";
import generateDescriptionGemini from "../services/geminiService.js";

//Função que pega todos os posts do banco de dados e envia ao usuario,
export async function listPosts(req, res) {
    const result = await getAllPosts();
    res.status(200).json(result);
};

//Função que envia novos posts ao banco de dados.
export async function newPosting(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch(error){
        console.error(error.message);
        res.status(500).json({
            "Erro":"Falha na requisição"
        });
    };
};

//função que permite o upload de arquivos, nesse caso sendo usado imagems
export async function uploadImage(req, res) {
    const newPost = {
        description: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const createdPost = await createPost(newPost);
        const updatedImage = `upload/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);
    } catch(error) {
        console.error(error.message)
        res.status(500).json({"Erro":"Falha na requisição"})
    };
};

//função que atualiza os dados da imagem, tendo integração com o gemini para criação da descrição da imagem caso não tenha uma.
export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`
    try {
        const imgBuffer = fs.readFileSync(`upload/${id}.png`)
        const descriptionAi = await generateDescriptionGemini(imgBuffer);
        const updatedPost = {
        imgUrl: urlImage,
        description: descriptionAi,
        alt: req.body.alt
    }
        const createdPost = await updatePost(id, updatedPost);
        res.status(200).json(createdPost);
    } catch(error){
        console.error(error.message);
        res.status(500).json({
            "Erro":"Falha na requisição"
        });
    };
}