import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Content is required"],
    },
    pinned: {
      type: Boolean,
      required: [true, "Pinned is required"],
      default: false,
    },
    type: {
      type: String,
      enum: ["personal", "college", "work", "ideas", "others"]
    }
  },
  {
    timestamps: true,
  },
);

const Note = mongoose.model("note", noteSchema);
export default Note;
