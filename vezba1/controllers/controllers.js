const { render } = require("ejs");
const {
  fetchData,
  findUsersByCompany,
  findUserCityByUsername,
  findUserPosts,
  read,
  findMenAndWoman,
  manOlderThanThirty,
  womanYoungerThenThirty,
  secondOlderWoman,
  oldestUser,
  sortedByAge,
} = require("../models/functions");

async function homepage(req, res) {
  res.render("index");
}

async function getDataFromApi(req, res) {
  const data = await fetchData("https://jsonplaceholder.typicode.com/users");
  res.render("all-users", { data });
}

async function companyPage(req, res) {
  res.render("company");
}

async function findByCompany(req, res) {
  const users = await findUsersByCompany(req.body.company);
  console.log(req.body);
  res.status(200).send(`Users who work in this comany are: ${users}`);
}

async function getUsername(req, res) {
  res.render("username");
}

async function findByUsername(req, res) {
  const city = await findUserCityByUsername(req.body.username);
  res
    .status(200)
    .send(
      `The User with username <strong>${req.body.username}</strong> is living in ${city}`
    );
}

async function postsPage(req, res) {
  res.render("user-posts");
}

async function getPosts(req, res) {
  const posts = await findUserPosts(req.body.id);
  console.log(req.body.id);
  res.status(200).send(`Title: ${posts.title},<br> Post: ${posts.body}`);
}

async function getMenAndWoman(req, res) {
  try {
    const people = await findMenAndWoman();
    res
      .status(200)
      .send(
        `There are ${people.men.length} man: ${people.men} and there are ${people.woman.length} women: ${people.woman} `
      );
  } catch (err) {
    console.log(err);
    res.send(500).status("Internal Server Error");
  }
}

async function findManOlderThanThirty(req, res) {
  try {
    const olderman = await manOlderThanThirty();
    res.status(200).send(`Man older than 30 years are ${olderman}`);
  } catch (err) {
    console.log(err);
    res.send(500).status("Internal Server Error");
  }
}

async function findWomenYoungerThenThirty(req, res) {
  const youngerWoman = await womanYoungerThenThirty();
  res.status(200).send(`Women younger than 30 years are ${youngerWoman}`);
}

async function findTheSecondOldestWoman(req, res) {
  const secondWoman = await secondOlderWoman();
  res.status(200).send(`Second oldest woman is ${secondWoman}`);
}

async function findOldestAndYoungest(req, res) {
  try {
    const people = await oldestUser();
    res
      .status(200)
      .send(
        `Oldest user is ${people.oldest}, <br> Youngest user is ${people.young}`
      );
  } catch (err) {
    console.log(err);
    res.send(500).status("Internal Server Error");
  }
}

async function getSortedUsers(req, res) {
  try {
    const sorted = await sortedByAge();
    res.render("sorted-users", { sorted });
  } catch (err) {
    console.log(err);
    res.send(500).status("Internal Server Error");
  }
}
module.exports = {
  getDataFromApi,
  companyPage,
  findByCompany,
  findByUsername,
  getPosts,
  getMenAndWoman,
  findManOlderThanThirty,
  findWomenYoungerThenThirty,
  findTheSecondOldestWoman,
  findOldestAndYoungest,
  getSortedUsers,
  homepage,
  getUsername,
  postsPage,
};
