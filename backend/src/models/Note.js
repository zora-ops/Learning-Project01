import mongoose from "mongoose";

//create schema
const modelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, { timestamps: true })



//create model

const Note = mongoose.model("Note", modelSchema)

export default Note;