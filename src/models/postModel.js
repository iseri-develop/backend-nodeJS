import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

//Conectar ao banco na nuvem
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Funcao assicrona para buscar todos os posts do banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados
    const db = conexao.db("imersao-instabytes");
    // Seleciona a colecao dentro do banco
    const colexao = db.collection("posts");

    // Retorna o array com todos os dados de colecao
    return colexao.find().toArray();
}

export async function createPost(newPost) {
    // Conecta-se ao banco de dados MongoDB "imersao-instabytes" e seleciona a coleção "posts".
    const db = conexao.db("imersao-instabytes");
    const colexao = db.collection("posts");

    // Insere um novo documento (post) na coleção "posts" e retorna um objeto com informações sobre a inserção.
    return colexao.insertOne(newPost);
}

export async function updatedPost(id, post) {
    const objectId = ObjectId.createFromHexString(id)
    // Conecta-se ao banco de dados MongoDB "imersao-instabytes" e seleciona a coleção "posts".
    const db = conexao.db("imersao-instabytes");
    const colexao = db.collection("posts");

    // Atualiza um novo documento (post) na coleção "posts" e retorna um objeto com informações sobre a inserção.
    return colexao.updateOne({ _id: new ObjectId(objectId) },
        { $set: post });
}