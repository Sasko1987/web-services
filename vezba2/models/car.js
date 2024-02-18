const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  color: String,
  mileage: Number,
  price: Number,
});

const Car = mongoose.model("Car", carsSchema, "cars");

async function viewCars() {
  return await Car.find();
}

async function createCar(data) {
  const newCar = new Car(data);
  return await newCar.save();
}

async function updateCar(data, id) {
  return await Car.updateOne({ _id: id }, data);
}

async function deleteCar(id) {
  return await Car.deleteOne({ _id: id });
}

async function sortCarsByName() {
  return await Car.find({}).sort({ make: -1 });
}
module.exports = { viewCars, createCar, updateCar, deleteCar, sortCarsByName };
