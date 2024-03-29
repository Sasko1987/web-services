const {
  viewCars,
  createCar,
  updateCar,
  deleteCar,
  sortCarsByName,
  cheapCars,
  expenciveCars,
  updateOneValue,
} = require("../models/car");

async function getAllCars(req, res) {
  try {
    const allCars = await viewCars();
    res.status(200).send(allCars);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function addCar(req, res) {
  try {
    const addedCar = await createCar(req.body);
    res.status(200).send(addedCar);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function updatedCar(req, res) {
  try {
    await updateCar(req.body, req.params.id);
    res.status(201).send(`Car with ID: ${req.params.id} was updated`);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function deletedCar(req, res) {
  try {
    await deleteCar(req.params.id);
    res.status(200).send(`Car with ID: ${req.params.id} was deleted`);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}

async function getSortedCars(req, res) {
  try {
    const sorted = await sortCarsByName();
    res.status(200).send(sorted);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getCheapCars(req, res) {
  try {
    const cheapcars = await cheapCars();
    res.status(200).send(cheapcars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getExpenciveCars(req, res) {
  try {
    const exprencive = await expenciveCars();
    res.status(200).send(exprencive);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function updateOne(req, res) {
  try {
    await updateOneValue(req.param.id, req.body);
    res.status(201).send("Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllCars,
  addCar,
  updatedCar,
  deletedCar,
  getSortedCars,
  getCheapCars,
  getExpenciveCars,
  updateOne,
};
