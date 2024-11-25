import { ObjectId } from "mongodb";
import connectDB from "../config/dbconfig.js";

const conec = await connectDB(process.env.URL_MONGODB);

//função que acessa o banco de dados e depois a coleção desejada e retorna convertendo em um array
export async function getAllPosts() {
    const db = conec.db("imersaodev");
    const collec = db.collection("posts");
    return collec.find().toArray();
};

//função que acessa o banco de dados e depois a coleção desejada e adicionar novos dados.
export async function createPost(newPost) {
    const db = conec.db("imersaodev");
    const collec = db.collection("posts");
    return collec.insertOne(newPost);
};

//função que acessa o banco de dados e depois a coleção desejada para atualizar novos dados
export async function updatePost(id, newPost) {
    const db = conec.db("imersaodev");
    const collec = db.collection("posts");
    const objId = ObjectId.createFromHexString(id)
    return collec.updateOne({_id: new ObjectId(objId)}, {$set: newPost});
};