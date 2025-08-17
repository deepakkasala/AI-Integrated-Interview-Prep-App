const express = require("express");
const router = express.Router();

const {
  generateInterviewQuestions,
  generateConceptExplanation,
} = require("../controllers/ai");

const { authenticateUser } = require("../middlewares/auth");

router.post(
  "/generate-questions",
  authenticateUser,
  generateInterviewQuestions
);
router.post(
  "/generate-explanation",
  authenticateUser,
  generateConceptExplanation
);

module.exports = router;
