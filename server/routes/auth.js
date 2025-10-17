const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getUserProfile,
} = require("../controllers/auth");
const { authenticateUser } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const imagekit = require("../config/imagekit");

router.post("/login", loginUser);
router.post("/register", registerUser);

router.get("/profile", authenticateUser, getUserProfile);

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const response = await imagekit.upload({
      file: req.file.buffer,
      fileName: `${Date.now()}-${req.file.originalname}`,
      folder: "/uploads",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      success: true,
      profileImageUrl: response.url,
    });
  } catch (err) {
    console.error("ImageKit Upload Error:", err);
    res
      .status(500)
      .json({ error: "Image upload failed", details: err.message });
  }
});

module.exports = router;
