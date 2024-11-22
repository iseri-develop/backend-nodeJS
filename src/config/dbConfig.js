import { MongoClient } from 'mongodb';

export default async function conectarAoBanco(stringConexao) {
    let mongoClient;

    try {
        mongoClient = new MongoClient(stringConexao)
        console.log("Conectado ao cluster ao banco de dados...");
        await mongoClient.connect();
        console.log("Conectado ao MongoDB Atlas com sucesso!");

        return mongoClient;
    } catch (error) {
        console.error("Falha na conexão ao banco de dados!", error);
        process.exit();
    }
}