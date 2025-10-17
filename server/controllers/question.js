const Question = require("../models/question");
const Session = require("../models/session");

const addQuestionToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;
    console.log(sessionId, questions);

    if (!sessionId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        message: "Invalid request data",
        success: false,
      });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({
        message: "Session not found",
        success: false,
      });
    }
    const createdQuestions = await Question.insertMany(
      questions.map((q) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );
    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({
      message: "Questions added to session successfully",
      success: true,
      questions: createdQuestions,
    });
  } catch (error) {
    console.error("Error adding questions to session:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

//sample json data for adding questions
// {
//   "sessionId": "60c72b2f9b1e8c001c8e4d3a",
//   "questions": [
//     { "question": "What is Node.js?", "answer": "Node.js is a JavaScript runtime." },
//     { "question": "Explain the event loop in Node.js.", "answer": "The event loop is a mechanism that allows Node.js to perform non-blocking I/O operations." }
//   ]
// }
const togglePinQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", success: false });
    }
    question.isPinned = !question.isPinned;
    await question.save();
    res.status(200).json({
      message: "Question pin status updated successfully",
      success: true,
      question,
    });
  } catch (error) {
    console.error("Error toggling pin status:", error);
    res.status(500).json({
      message: "Failed to update pin status",
      success: false,
      error: error.message,
    });
  }
};
const updateQuestionNote = async (req, res) => {
  const { note } = req.body;
  const questionId = req.params.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res
        .status(404)
        .json({ message: "Question not found", success: false });
    }
    question.note = note || "";
    await question.save();
    res.status(200).json({
      message: "Question note updated successfully",
      success: true,
      question,
    });
  } catch (error) {
    console.error("Error updating question note:", error);
    res.status(500).json({
      message: "Failed to update question note",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  addQuestionToSession,
  updateQuestionNote,
  togglePinQuestion,
};
