const { Validator } = require("node-input-validator");

const CarFieldValidate = {
  make: "required|string",
  model: "required|string",
  manufacturer: "required|string",
  year: "required|integer",
  color: "required|string",
};

const CarFieldValidateOnUpdate = {
  make: "string",
  model: "string",
  manufacturer: "string",
  //   test: "array",
  year: "integer",
  color: "string",
};

const validateCar = async (data, schema) => {
  let v = new Validator(data, schema); // data = req.body, schema = CarFieldValidate
  let e = await v.check();
  if (!e) {
    throw v.errors;
  }
};

module.exports = {
  CarFieldValidate,
  CarFieldValidateOnUpdate,
  validateCar,
};
