import express from "express";
import dotenv from "dotenv";
import subjects from "./routes/courses.js";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const port = process.env.PORT || 3000;

// Initialize Express
const app = express();
const state = app.get("env");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

if (state === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan enabled......");
}

app.use("/api/courses", subjects);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
