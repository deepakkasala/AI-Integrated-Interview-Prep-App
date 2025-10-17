const express = require("express");
const router = express.Router();

const {
  addQuestionToSession,
  updateQuestionNote,
  togglePinQuestion,
} = require("../controllers/question");
const { authenticateUser } = require("../middlewares/auth");

// Route to add a question to a session
router.post("/add", authenticateUser, addQuestionToSession);

// Route to update a question's note
router.post("/:id/note", authenticateUser, updateQuestionNote);

// Route to toggle pin status of a question
router.post("/:id/pin", authenticateUser, togglePinQuestion);

module.exports = router;
