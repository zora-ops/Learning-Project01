import Note from '../models/Note.js';

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })    
    }
}

export const getNoteById = async (req, res) => {
    try {
        const noteId = req.params.id;
        const note = await Note.findById({_id: noteId});
        if(!note) return res.status(404).json({message: "Note not found"});

        res.status(200).json(note)
    } catch (error) {
        console.log(error.message);
    }
}

export const createNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const newNote = new Note({title, content});
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log("Error", error.message);
        
    }
}

export const updateNote = async (req, res) => {
    try {
        const {title, content} = req.body;
        const updateFound = await Note.findByIdAndUpdate(req.params.id,{ title, content },{ new: true });
        if(!updateFound) return res.status(404).json({message: "Note not found"})

        res.status(201).json({message: "bing bang bang"})
    } catch (error) {
        console.log("error", error.message);
    }
}

export const deleteNote = async(req,res) => {
    try {
        const id = req.params.id;
        const deleted = await Note.findByIdAndDelete(id);
        if(!deleted) return res.status(404).json({message: "Note not found"});

        res.status(200).json({deleted})
    } catch (error) {
        
    }
}