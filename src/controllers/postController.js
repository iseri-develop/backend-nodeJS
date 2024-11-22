import fs from "fs";
import { getAllPosts, createPost, updatedPost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listPosts(req, res) {
    // Chama funcao para buscar todos os posts
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 (ok) e os posts no formato JSON
    res.status(200).json(posts)
}

export async function postNewPosts(req, res) {
    // Obtém os dados da nova publicação do corpo da requisição.
    const newPost = req.body;

    // Tenta criar a nova publicação e trata possíveis erros.
    try {
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Falha na requisição" });
    }
}

export async function uploadImagem(req, res) {
    // Obtém os dados da nova publicação do corpo da requisição.
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    // Tenta subir uma imagem e trata possíveis erros.
    try {
        const createdPost = await createPost(newPost);
        const updatedImagem = `uploads/${createdPost.insertedId}.png`

        fs.renameSync(req.file.path, updatedImagem);

        res.status(200).json(createdPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Falha na requisição" });
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id
    const urlImg = `http"//localhost:3000/${id}.png`

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        };
        const updatePost = await updatedPost(id, post);
        res.status(200).json(updatePost);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Falha na requisição" });
    }
}