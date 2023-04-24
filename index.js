import express from "express";
import dotenv from "dotenv";
import joi from "joi";

dotenv.config();

const port = process.env.PORT || 3000;

// Initialize Express
const app = express();
app.use(express.json());

const generas = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Comedy" },
  { id: 4, name: "LoveSeries" },
];

app.get("/api/generas", (req, res) => {
  res.send(generas);
});

app.get("/api/generas/:id", (req, res) => {
  const genera = generas.find((c) => c.id === parseInt(req.params.id));

  if (!genera)
    return res.status(404).send("The genera with the given ID was not found");

  res.send(genera);
});

app.put("/api/generas/:id", (req, res) => {
  const genera = generas.find((c) => c.id === parseInt(req.params.id));

  if (!genera)
    return res.status(404).send("The genera with the given ID was not found");

  const schema = joi.object({ name: joi.string().min(3).required() });
  const { error } = schema.validate(req.body);

  if (error) {
    //400 Bad Request
    res.status(400).send(error.details[0].message);
    return;
  }

  genera.name = req.body.name;
  res.send(genera);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
