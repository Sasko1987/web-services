const getAllCharacters = require("../pkg/rickandmorty/index");

async function getCharacters(req, res) {
  try {
    const data = await getAllCharacters();
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = getCharacters;
