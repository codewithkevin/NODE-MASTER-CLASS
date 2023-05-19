const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: async function (value) {
        const authorCount = await mongoose.models.Author.countDocuments({
          name: value,
        });
        return authorCount === 0;
      },
      message: "Author name must be unique.",
    },
  },
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  })
);

async function createAuthor(name, bio, website) {
  try {
    const author = new Author({
      name,
      bio,
      website,
    });

    const result = await author.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function createCourse(name, authorName) {
  const author = await Author.findOne({ name: authorName });
  if (!author) {
    return new Error(`Author with name ${authorName} not found.`);
  }

  const course = new Course({
    name,
    author: author._id,
  });

  const result = await course.save();
  console.log(result);
}

// Example usage
createAuthor("John Doe", "Bio of John Doe", "https://johndoe.com");
// createCourse("Course 1", "John Doe");
