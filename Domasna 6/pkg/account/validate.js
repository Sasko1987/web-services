const { Validator } = require("node-input-validator");

const AccountLogin = {
  email: "required|string",
  password: "required|string",
};

const AccountRegister = {
  email: "required|email",
  password: "required|string",
  confirmPassword: "required|string",
  fullName: "required|string",
};

const AccountReset = {
  email: "required|string",
  newPassword: "required|string",
  oldPassword: "required|string",
};

async function validate(data, schema) {
  let v = new Validator(data, schema);
  let e = await v.check();

  if (!e) {
    throw {
      code: 400,
      error: v.errors,
    };
  }
}

module.exports = {
  AccountLogin,
  AccountRegister,
  validate,
  AccountReset,
};
