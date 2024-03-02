const express = require("express");
require("./pkg/db");

const { getAll, getOne, create, update, remove } = require("./handlers/cars");
const {
  createLocalCar,
  deleteLocalCars,
  updateLocalCar,
  allLocalCars,
  carByIndex,
} = require("./handlers/localCars");

const api = express();

api.use(express.json());

api.get("/api/cars", getAll);

api.get("/api/cars/:id", getOne);

api.post("/api/cars", create);

api.put("/api/cars/:id", update);

api.delete("/api/cars/:id", remove);

api.post("/local/cars", createLocalCar);

api.delete("/local/cars/:index", deleteLocalCars);

api.put("/local/cars/:index", updateLocalCar);

api.get("/local/cars", allLocalCars);

api.get("/local/cars/:index", carByIndex);

api.listen(10000, (err) => {
  err ? console.log(err) : console.log("Server started on port 10000");
});
