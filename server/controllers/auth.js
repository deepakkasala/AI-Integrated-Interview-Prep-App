const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    // Generate token and send response
    const token = generateToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in user",
      success: false,
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, profileImageUrl } = req.body;
  try {
    // Logic to register user
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    // Hash password and save user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    // Update password to hashed version
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profileImageUrl: newUser.profileImageUrl,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({
      error: "Error registering user",
      success: false,
      message: error.message,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Logic to get user profile
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user profile",
      success: false,
      error: error.message,
    });
  }
};

// const uploadImage = async (req, res) => {
//   try {
//     // Logic to upload image
//     if (!req.file) {
//       return res.status(400).json({ error: "No image file provided" });
//     }
//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//       req.file.filename
//     }`;
//     res.status(200).json({
//       message: "Profile image uploaded successfully",
//       success: true,
//       profileImageUrl: imageUrl,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error uploading profile image",
//       success: false,
//       error: error.message,
//     });
//   }
// };

module.exports = {
  loginUser,
  registerUser,
  getUserProfile,
};
