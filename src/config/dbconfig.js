import { MongoClient } from "mongodb";

//Função assincrona que conecta o servidor ao banco de dados, e que pode ser chamada no documento principal.
export default async function connectDB(connectionString) {
    let mongoClient;

    try{
        mongoClient = new MongoClient(connectionString);
        console.log('Conectando ao cluster do banco de dados...');
        await mongoClient.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');
        return mongoClient;
    } catch (error) {
        console.error('Falha na conexão com o banco!', error);
        process.exit();
    };
};