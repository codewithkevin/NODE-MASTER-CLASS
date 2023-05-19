const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.update(courseId);
  course.author.name = "Mosh Hamedani";
  course.save();
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorName) {
  const course = await Course.findById(courseId);
  const author = course.authors.find((author) => author.name === authorName);

  if (!author) {
    throw new Error(`Author with name ${authorName} not found.`);
  }
  author.remove();
  await course.save();
}

// async function removeauthor(courseId, author) {
//   const course = await Course.findById(courseId);
//   const author =  course.authors.id(author);
//   author.remove();
//   course.save();
// }

// addAuthor("646588ee26a168313517fdb3", new Author({ name: "Amy" }));
removeAuthor("646588ee26a168313517fdb3", "Kevin");
// createCourse("React Course", [
//   new Author({ name: "Kevin" }),
//   new Author({ name: "Mike Williams" }),
// ]);
// updateAuthor("646118b4a2ea851e2ea40638");
