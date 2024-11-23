import express from "express";
import multer from "multer";
import cors from "cors"
import { createNewPost, listAllPosts, uploadImg, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200 
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
//Linux ou Mac
//const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    app.use(express.json()); //Define que o servidor trabalhará com respostas em JSON

    app.use(cors(corsOptions));

    //retorna todos os posts
    app.get("/posts", listAllPosts);

    app.post("/posts", createNewPost);

    app.post("/upload", upload.single("img"), uploadImg);

    app.put("/upload/:id", updateNewPost);
} 

export default routes;

