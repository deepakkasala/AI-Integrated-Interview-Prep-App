const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getUserProfile,
} = require("../controllers/auth");
const { authenticateUser } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/profile", authenticateUser, getUserProfile);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({
    message: "Profile image uploaded successfully",
    success: true,
    profileImageUrl: imageUrl,
  });
});
module.exports = router;
