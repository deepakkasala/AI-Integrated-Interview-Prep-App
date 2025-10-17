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
// {
//     origin: `http://localhost:${port}`,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }
app.use(cors());
app.use(express.json());
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
