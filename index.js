import express from "express";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const port = process.env.PORT || 3000;

// Initialize Express
const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "Computer Administrator" },
  { id: 2, name: "Earth Science" },
  { id: 3, name: "Physics Administrator" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("The course with the given ID was not found");
  } else {
    res.send(course);
  }
});

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.query);
});

app.post("/api/courses", (req, res) => {
  const schema = joi.object({ name: joi.string().min(3).required() });

  const result = schema.validate(req.body);

  if (result.error) {
    //400 Bad Request
    res.status(400).send("Name is required and should be minimum 3 characters");
    return;
  }

  const course = { id: courses.length + 1, name: req.body.name };

  courses.push(course);

  res.send(course);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
