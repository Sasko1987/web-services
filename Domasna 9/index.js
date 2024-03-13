const express = require("express");
const { getSection } = require("./pkg/config");

const getCharacters = require("./handlers/rickandmorty");

const api = express();

api.get("/api/rickandmorty", getCharacters);
// server startup
api.listen(getSection("rickandmorty").port, () => {
  console.log(`Server started at port ${getSection("rickandmorty").port}`);
});
