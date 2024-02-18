const express = require("express");
const app = express();
require("./db/config");

const {
  getAllCars,
  addCar,
  updatedCar,
  deletedCar,
  getSortedCars,
} = require("./controllers/cars");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.get("/", getAllCars);
app.post("/", addCar);
app.put("/:id", updatedCar);
app.delete("/:id", deletedCar);
app.get("/sorted", getSortedCars);

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
