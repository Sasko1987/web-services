const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  manufacturer: String, //BMW
  year: Number,
  color: String,
  // year: {
  //   type: Number,
  //   // max: 2030,
  //   // min: 2010,
  //   validate: {
  //     validator: function (v) {
  //       v > 2015 && v < 2020;
  //     },
  //     message: "Year is not in scope!",
  //   },
  // },
  // dateManufactured: 2020,
  // dateRepaired: 2019,
  // manufacturer: { // ako sakame da imame relacija, treba da imame model Manifacturer, linija 17
  //   type: mongoose.SchemaTypes.ObjectId,
  // ref: "Manifacturer"
  // }
});

const Car = mongoose.model("Car", carSchema, "cars");
// const Manifacturer = mongoose.model("Manifacturer", manifacturerSchema, "manifacturers")

const addCar = async (car) => {
  const newCar = new Car(car);
  return await newCar.save();
};

//remove car
const removeCar = async (id) => {
  return await Car.deleteOne({ _id: id });
};

//update car
const updateCar = async (id, car) => {
  return await Car.updateOne({ _id: id }, car);
};

//get all cars
const getAllCars = async () => {
  return await Car.find({});
};

//get one car
const getOneCar = async (id) => {
  return await Car.find({ _id: id });
};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
};
