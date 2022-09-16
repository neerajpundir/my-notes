const express = require("express");
const {
  addNotes,
  getAllNotes,
  getNote,
  updateNotes,
  deleteNotes,
} = require("../controllers/notesController");
const mynotesRouter = express.Router();

mynotesRouter.post("/addnotes", addNotes);
mynotesRouter.get("/notes", getAllNotes);
mynotesRouter.get("/notes/:id", getNote);
mynotesRouter.get("/update-notes/:id", updateNotes);
mynotesRouter.get("/delete-notes/:id", deleteNotes);

module.exports = mynotesRouter;
