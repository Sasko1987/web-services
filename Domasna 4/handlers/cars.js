const {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
} = require("../pkg/cars/mongo");

const { getAllLocalCars } = require("../pkg/cars");
const {
  validateCar,
  CarFieldValidate,
  CarFieldValidateOnUpdate,
} = require("../pkg/cars/validate");

//source of data => cars manupulation => handlers for cars =>  /api/cars

const getAll = async (req, res) => {
  try {
    // validate(req.body);
    const cars = await getAllCars();
    return res.status(200).send(cars);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

//cars/:id?month=10
const getOne = async (req, res) => {
  try {
    const car = await getOneCar(req.params.id);
    return res.status(200).send(car);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const create = async (req, res) => {
  try {
    await validateCar(req.body, CarFieldValidate);
    const newCar = await addCar(req.body);
    return res.status(200).send(newCar);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const update = async (req, res) => {
  try {
    await validateCar(req.body, CarFieldValidateOnUpdate);
    // koga rabotime so fajlovi
    // const test = {
    //   ...starotoTelo,
    //   ...req.body,
    // }
    const newCar = await updateCar(req.params.id, req.body);
    return res.status(200).send(newCar);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

const remove = async (req, res) => {
  try {
    await removeCar(req.params.id);
    return res.status(200).send("Car deleted successfully!");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
