const Session = require("../models/session");
const Question = require("../models/question");

const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    // console.log(req.user);

    const userId = req.user._id;

    const newSession = new Session({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // If questions are provided, create Question documents
    if (questions && questions.length > 0) {
      const questionDocs = await Promise.all(
        questions.map(async (q) => {
          const question = await Question.create({
            session: newSession._id,
            question: q.question,
            answer: q.answer,
          });
          return question._id;
        })
      );
      newSession.questions = questionDocs;
    }
    await newSession.save();
    res.status(201).json({
      message: "Session created successfully",
      success: true,
      session: newSession,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create session",
      success: false,
      error: error.message,
    });
  }
};

const getMySessions = async (req, res) => {
  try {
    const userId = req.user._id;
    const sessions = await Session.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json({
      message: "Fetched my sessions successfully",
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch my sessions",
      success: false,
      error: error.message,
    });
  }
};
const getSessionById = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const session = await Session.findById(sessionId)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: -1 } },
      })
      .exec();
    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found", success: false });
    }
    res.status(200).json({
      message: "Fetched session successfully",
      success: true,
      session,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch session",
      success: false,
      error: error.message,
    });
  }
};
const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;
    const session = await Session.findById(sessionId);
    if (!session) {
      return res
        .status(404)
        .json({ message: "Session not found", success: false });
    }
    //check if logged in user id owns the session
    if (session.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Forbidden,not authorized to delete",
        success: false,
      });
    }
    //first delete all questions associated with the session
    await Question.deleteMany({ session: sessionId });
    //then delete the session
    await session.deleteOne();
    
    res.status(200).json({
      message: "Session deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete session",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
};
