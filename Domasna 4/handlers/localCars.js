const {
  addCar,
  removeCar,
  updateCar,
  getAllLocalCars,
  getCarByIndex,
} = require("../pkg/cars/index");
const {
  validateLocalCars,
  localCarsValidator,
  updateLocalCalValidator,
} = require("../pkg/cars/validateLocal");

async function createLocalCar(req, res) {
  try {
    await validateLocalCars(req.body, localCarsValidator);
    const cars = await addCar(req.body);
    res.status(201).send(cars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteLocalCars(req, res) {
  try {
    await removeCar(req.params.index);
    res.status(201).send("Car Deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function updateLocalCar(req, res) {
  try {
    validateLocalCars(req.body, updateLocalCalValidator);
    await updateCar(req.params.index, req.body);
    res.status(201).send("Car Updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function allLocalCars(req, res) {
  try {
    const allCars = await getAllLocalCars();
    res.status(200).send(allCars);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

async function carByIndex(req, res) {
  try {
    const car = await getCarByIndex(req.params.index);
    res.status(200).send(car);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  createLocalCar,
  deleteLocalCars,
  updateLocalCar,
  allLocalCars,
  carByIndex,
};
