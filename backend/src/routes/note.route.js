import autMiddleware from "../middleware/auth.middleware.js";
import {
  createNote,
  getNotes,
  togglePin,
  getPinnedNotes,
  deleteNote,
} from "../controllers/note.controller.js";
import express from "express";

const router = express.Router();

router.post("/create", autMiddleware, createNote);
router.get("/get", autMiddleware, getNotes);
router.patch("/toggle-pin/:id", autMiddleware, togglePin);
router.get("/pinned", autMiddleware, getPinnedNotes);
router.delete("/delete/:id", autMiddleware, deleteNote);

export default router;
