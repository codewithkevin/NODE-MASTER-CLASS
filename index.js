import express from "express";
import dotenv from "dotenv";

dotenv.config();

var port = process.env.PORT || 3000;

//Intialize Express Express
var app = express();

app.listen(port, function () {
  console.log("Server is running at http://localhost:" + port);
});
