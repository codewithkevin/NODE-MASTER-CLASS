import express from "express";
import joi from "joi";

const subjects = express.Router();

const courses = [
  { id: 1, name: "Computer Administrator" },
  { id: 2, name: "Earth Science" },
  { id: 3, name: "Physics Administrator" },
];

//Get All Courses
subjects.get("/", (req, res) => {
  res.send(courses);
});

//Get Course
subjects.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  } else {
    res.send(course);
  }
});

// subjects.get("/api/courses/:year/:month", (req, res) => {
//   res.send(req.query);
// });

//Create a course
subjects.post("/", (req, res) => {
  const schema = joi.object({ name: joi.string().min(3).required() });

  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = { id: courses.length + 1, name: req.body.name };

  courses.push(course);

  res.send(course);
});

//Update a Course
subjects.put("/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  // Validate the course
  // If Invalid, return 404 - Bad Request
  const { error } = ValidateForm(req.body);

  if (error) {
    //400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  // Update course
  // Return the updated course
  course.name = req.body.name;
  res.send(course);
});

//Delete the course
subjects.delete("/api/courses/:id", (req, res) => {
  // Look up the course
  // If not existing, return 404
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("The course with the given ID was not found");
    return;
  }

  //Delete Course
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  // Return the same course
  res.send(course);
});

function ValidateForm(course) {
  const schema = joi.object({ name: joi.string().min(3).required() });
  return schema.validate(course);
}

export default subjects;
