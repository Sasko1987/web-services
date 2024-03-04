const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { create, setNewPassword } = require("../pkg/account/index");
const { getByEmail } = require("../pkg/account/index");
const {
  validate,
  AccountLogin,
  AccountRegister,
  AccountReset,
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
    const { email, password, confirmPassword, fullName } = req.body;
    const exists = await getByEmail(req.body.email);
    if (exists) {
      return res.status(400).send("Account with this email already exists");
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .send("Confirm password is not the same as Password");
    }

    req.body.password = bcrypt.hashSync(req.body.password);
    const acc = await create(req.body);
    return res.status(201).send(acc);
  } catch (err) {
    console.log(err);
    res.status(err.status).send(err.message);
  }
}

async function refreshToken(req, res) {
  const payload = {
    ...req.auth,
    exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60,
  };

  const token = jwt.sign(payload, getSection("development").jwt_secret);

  return res.status(200).send({ token });
}

async function resetPassword(req, res) {
  console.log("hello there");
  await validate(req.body, AccountReset);
  const { newPassword, oldPassword, email } = req.body;

  const account = await getByEmail(email);

  if (!account) {
    res.status(400).send("Account not found");
  }

  if (!bcrypt.compareSync(oldPassword, account.password)) {
    return res.status(400).send("incorrect old password");
  }

  if (newPassword === oldPassword) {
    return res.status(400).send("New password cannot be same as old Password");
  }

  const newPasswordHashed = bcrypt.hashSync(newPassword);

  const userPasswordChanged = await setNewPassword(
    account._id.toString(),
    newPasswordHashed
  );

  return res.status(200).send(userPasswordChanged);
}

async function forgotPassword() {}

module.exports = {
  login,
  register,
  resetPassword,
  forgotPassword,
  refreshToken,
};
