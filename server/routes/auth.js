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
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }
  // const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
  //   req.file.filename
  // }`;

  const fileName = `${Date.now()}-${req.file.originalname}`;

  // Upload to ImageKit
  const response = await imagekit.upload({
    file: req.file.buffer, // file buffer from memoryStorage
    fileName,
    folder: "/uploads", // optional folder
  });
  return res.status(200).json({
    message: "Image uploaded successfully",
    success: true,
    profileImageUrl: response.url, // hosted image URL
  });
});
module.exports = router;
