const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/auth");
const {
  createSession,
  getSessionById,
  getMySessions,
  deleteSession,
} = require("../controllers/session");

router.post("/create", authenticateUser, createSession);
router.get("/my-sessions", authenticateUser, getMySessions);
router.get("/:id", authenticateUser, getSessionById);
router.delete("/:id", authenticateUser, deleteSession);

module.exports = router;
