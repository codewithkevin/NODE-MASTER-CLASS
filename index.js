import express from "express";
import dotenv from "dotenv";
import subjects from "./routes/courses.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/courses", subjects);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
