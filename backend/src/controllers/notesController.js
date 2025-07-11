import Note from "../model/Note.js";

export const getAllNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes", error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNotes = await note.save();

    res.status(201).json(savedNotes);
  } catch (e) {
    console.error("Error in createNotes", e);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      }
    );
    if (!updatedNote) {
      res.status(404).json({ message: "Notes not found" });
    }
    res.status(200).json({ "Updated Notes Successfully": updatedNote });
  } catch (e) {
    console.error("Error in Updated Notes", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNotes = async (req, res) => {
  try {
    const deletedNotes = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNotes) {
      res.status(404).json({ message: "Notes Not Found" });
    }
    res.status(200).json({ "Deleted Notes Successfully": deletedNotes });
  } catch (e) {
    console.error("Error in Deleting Notes", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const Notes = await Note.findById(req.params.id);
    if (!Notes) {
      res.status(404).json({ message: "Notes Not Found" });
    }
    res.status(200).json(Notes);
  } catch (e) {
    console.error("Error in Finding Notes", e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
