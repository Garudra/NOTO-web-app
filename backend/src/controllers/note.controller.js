import Note from "../models/notes.model.js";

export const createNote = async (req, res) => {
  const { title, description, pinned, type } = req.body;
  if (!title || !description || !type || pinned === undefined) {
    return res
      .status(400)
      .json({ message: "Title, description, pinned and type are required" });
  }
  try {
    const newNote = new Note({
      user: req.user._id,
      title,
      description,
      pinned,
      type,
    });
    const savedNote = await newNote.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    return res.status(500).json({ message: "Error creating note" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching notes" });
  }
};

export const togglePin = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.pinned = !note.pinned;

    await note.save();

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating pinned status",
    });
  }
};

export const getPinnedNotes = async (req, res) => {
  try {
    const notes = await Note.find({
      user: req.user._id,
      pinned: true,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(notes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error fetching pinned notes",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error deleting note",
    });
  }
};
