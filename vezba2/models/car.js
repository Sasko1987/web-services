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
  return await Cars.updateOne({ _id: id }, data);
}

async function deleteCar(id) {
  return await Cars.deleteOne({ _id: id });
}
module.exports = { viewCars, createCar, updateCar, deleteCar };
