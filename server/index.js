const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const sessionRoutes = require("./routes/session");
const questionRoutes = require("./routes/question");
const aiRoutes = require("./routes/ai");
// Middleware to parse JSON bodies
const port = process.env.PORT || 3060;

// Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-integrated-interview-prep-app-cl.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

app.use("/auth", authRoutes);
app.use("/session", sessionRoutes);
app.use("/questions", questionRoutes);
app.use("/ai", aiRoutes);
// Start the server
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
