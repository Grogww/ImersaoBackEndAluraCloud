import 'dotenv/config'
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const connection = await conectarAoBanco(process.env.CONNECTION_STRING);

/// FUNCTIONS
export async function getAllPosts() {
    const db = connection.db("ImersaoBackEnd");
    const collection = db.collection("posts");
    return collection.find().toArray();
}

export async function createPost(newPost) {
    const db = connection.db("ImersaoBackEnd");
    const collection = db.collection("posts");

    return collection.insertOne(newPost);

}

export async function updatePost(id, post) {
    const db = connection.db("ImersaoBackEnd");
    const collection = db.collection("posts");

    const objId = ObjectId.createFromHexString(id);

    return collection.updateOne({_id: new ObjectId(objId)}, {$set:post});

}
