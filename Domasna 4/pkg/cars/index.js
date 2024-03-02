const { readData, writeData } = require("../files");
const DATA_SOURCE = `${__dirname}/../../data`;

///Users/vangelhristov/semos-education/web-services-g1/c03/data.json
//ova e apsolutna pateka

// ../files
// simbolicna pateka

//add car
const addCar = async (car) => {
  const cars = await readData(DATA_SOURCE);
  cars.push(car);
  await writeData(cars, DATA_SOURCE);
  return await readData(DATA_SOURCE);
};

//remove car
const removeCar = async (index) => {
  const cars = await readData(DATA_SOURCE);
  const remainCars = cars.filter((_, i) => Number(index) !== i);
  return await writeData(remainCars, DATA_SOURCE);
};

//update car
const updateCar = async (index, car) => {
  let cars = await readData(DATA_SOURCE);
  cars = cars.map((data, i) => {
    if (Number(index) === i) {
      return { ...data, ...car };
    }
    return data;
  });
  await writeData(cars, DATA_SOURCE);
};

//get all cars
const getAllLocalCars = async () => {
  return await readData();
};

//get car by index
const getCarByIndex = async (index) => {
  const cars = await readData(DATA_SOURCE);
  const carByIndex = cars.find((_, i) => Number(index) === i);
  return carByIndex;
};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllLocalCars,
  getCarByIndex,
};
