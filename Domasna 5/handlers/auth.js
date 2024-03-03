const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { create } = require("../pkg/account/index");
const { getByEmail } = require("../pkg/account/index");
const {
  validate,
  AccountLogin,
  AccountRegister,
} = require("../pkg/account/validate");
const { getSection } = require("../pkg/config");

async function login(req, res) {
  try {
    await validate(req.body, AccountLogin);
    const { email, password } = req.body;
    const account = await getByEmail(email);
    if (!account) {
      return res.status(400).send("Account not found");
    }
    if (!bcrypt.compareSync(password, account.password)) {
      account.loginAttempts = (account.loginAttempts || 0) + 1;
      await account.save();
      return res
        .status(400)
        .send(`Wrong password! ${account.loginAttempts} failed attempts`);
    }

    //payload

    const payload = {
      fullName: account.fullName,
      email: account.email,
      id: account._id,
      exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
    };

    // signiture

    const token = jwt.sign(payload, getSection("development").jwt_secret);
    if (token) {
      account.loginAttempts = 0;
      await account.save();
    }
    return res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function register(req, res) {
  try {
    await validate(req.body, AccountRegister);
    const exists = await getByEmail(req.body.email);
    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err.message);
  }
}

async function resetPassword() {}

async function forgotPassword() {}

async function refreshToken() {}

module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
};
