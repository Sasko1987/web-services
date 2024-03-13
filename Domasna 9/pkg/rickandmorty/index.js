const { getSection } = require("../config");

let CACHE = {};
let CACHE_WEATHER = {};

async function getAllCharacters() {
  let now = new Date().getTime() / 1000;

  if (
    CACHE &&
    now < CACHE.timestamp + getSection("rickandmorty").cache_expiery
  ) {
    return CACHE;
  }

  let URL = getSection("rickandmorty").API_URL;
  console.log(URL);

  try {
    let res = await fetch(URL);
    let data = await res.json();

    CACHE = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };
    return CACHE;
  } catch (err) {
    throw err;
  }
}

module.exports = getAllCharacters;
