const express = require("express");
const fileUpload = require("express-fileupload");
const { expressjwt: jwt } = require("express-jwt");
const { getSection } = require("./pkg/config");
const {
  login,
  register,
  refreshToken,
  resetPassword,
  getAllUsers,
} = require("./handlers/auth");

require("./pkg/db");

const {
  upload,
  download,
  readFiles,
  deleteFiles,
} = require("./handlers/storage");

const app = express();

// middlewares

app.use(express.json());
app.use(
  jwt({
    secret: getSection("development").jwt_secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      //dokolku sme na nekoja od ovie pateki nema da ni bara da bideme avtenticirani
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot-password",
      "/api/auth/reset-password",
      "/getall",
    ],
  })
);
app.use(fileUpload());

// routes -  GET, POST, PUT, PATCH, DELETE
app.get("/getall", getAllUsers);
app.post("/api/auth/login", login);
app.get("/api/auth/refresh-token", refreshToken);
app.post("/api/auth/register", register);
app.post("/api/auth/reset-password", resetPassword);
// moze da bide i put

app.post("/api/storage", upload);
app.get("/api/storage/:filename", download);
app.get("/api/files", readFiles);
app.delete("/api/files/:filename", deleteFiles);

// server startup
app.listen(getSection("development").port, () => {
  console.log(`Server started at port ${getSection("development").port}`);
});
