import Note from "../models/Note.js";

export async function getAllNotes(_, res){
    try {
        const notes = await Note.find().sort({createdAt:-1}); // Note.find artinya ngambil SEMUA note. karna argumen find kosong
        res.status(200).json(notes); // kasih status dan versi notes json-ified
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message: "Note not found"});
        res.status(200).json(note);
    } catch (error) {
        console.error("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const createNote = async (req, res) => {
    try {
        const {title,content} = req.body;
        const newNote = new Note({title,content});
        // sama dengan :
        // const newNote = new Note({title: title, content: content})
        // bisa disingkat kaya gitu.
        await newNote.save();
        res.status(201).json({message: "Note created successfully"});
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const updateNote = async (req, res) => {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title, content}, 
            {new: true,}
        );

        if(!updatedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({updatedNote});
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message: "Note not found"});
        res.status(200).json({message:"note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message: "Internal server error"});
    }
};