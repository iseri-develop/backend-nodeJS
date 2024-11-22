import express from "express";
import multer from "multer";
import cors from "cors"
import { listPosts, postNewPosts, uploadImagem, updateNewPost } from "../controllers/postController.js";

const corsOptions = { 
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    dest: "./uploads", storage
});

const routes = (app) => {
    // permite que o servidor interprete requisicoes com corpo no formato json
    app.use(express.json());

    app.use(cors(corsOptions))

    //rota para buscar todos os posts
    app.get("/posts", listPosts);

    // rota para criar um novo posst
    app.post("/posts", postNewPosts);

    //rota para subir uma imagem
    app.post("/upload", upload.single("imagem"), uploadImagem);

    //rota para atualizar um post
    app.put("/upload/:id", updateNewPost)
}

export default routes;