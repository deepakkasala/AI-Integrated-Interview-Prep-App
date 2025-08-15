const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/dbConfig");
const port = process.env.PORT || 3060;
require("dotenv").config();
// Middleware to parse JSON bodies

app.use(
  cors({
    origin: `http://localhost:${port}`,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

// Start the server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
