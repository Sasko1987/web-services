const { Validator } = require("node-input-validator");

const localCarsValidator = {
  manufacturer: "required|string",
  model: "required|string",
  year: "required|integer",
};

const updateLocalCalValidator = {
  manufacturer: "string",
  model: "string",
  year: "integer",
};

async function validateLocalCars(data, schema) {
  let v = new Validator(data, schema);
  console.log("v", v);
  let e = await v.check();
  console.log("error", v.errors);
  if (!e) {
    throw v.errors;
  }
}

module.exports = {
  localCarsValidator,
  updateLocalCalValidator,
  validateLocalCars,
};
