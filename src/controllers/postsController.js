import { createPost, getAllPosts, updatePost } from "../models/postsModel.js";
import { generateDescriptionGemini } from "../services/geminiService.js";
import fs from "fs";

export async function listAllPosts (req, res)  {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function createNewPost(req, res) {
    const newPost = req.body;
    try{
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    }catch(ex){
        console.error(ex.message);
        console.error(ex.stacktrace);
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

export async function uploadImg(req, res) {
    const newPost = {
        "descricao": "",
        "imgUrl": req.file.originalname,
        "alt": ""
      };

    try{
        const createdPost = await createPost(newPost);
        const updatedImg = `uploads/${createdPost.insertedId}.png`;
        fs.renameSync(req.file.path, updatedImg);
        res.status(200).json(createdPost);
    }catch(ex){
        console.error(ex.message);
        console.error(ex.stacktrace);
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}

export async function updateNewPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`
    

    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await generateDescriptionGemini(imgBuffer);

        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }


        const updatedPost = await updatePost(id, post);
        res.status(200).json(updatedPost);
    }catch(ex){
        console.error(ex.message);
        console.error(ex.stacktrace);
        res.status(500).json({"Erro":"Falha na Requisição"});
    }
}
