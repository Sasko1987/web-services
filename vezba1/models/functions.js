const fs = require("fs");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    if (err) return console.log(err);
  }
}

async function findUsersByCompany(companyName) {
  try {
    const users = await fetchData("https://jsonplaceholder.typicode.com/users");
    const usersInCompany = users
      .filter((user) => user.company.name === companyName)
      .map((user) => user.name);
    return usersInCompany;
  } catch (err) {
    if (err) return console.log(err);
  }
}

async function findUserCityByUsername(username) {
  try {
    const users = await fetchData("https://jsonplaceholder.typicode.com/users");
    const cities = users
      .filter((user) => user.username === username)
      .map((user) => user.address.city);
    return cities;
  } catch (err) {
    return err;
  }
}

async function findUserPosts(id) {
  try {
    const users = await fetchData("https://jsonplaceholder.typicode.com/posts");
    const posts = users.filter((user) => user.id === Number(id));
    const title = posts.map((tl) => tl.title);
    const body = posts.map((post) => post.body);
    return { title, body };
  } catch (err) {
    return err;
  }
}

async function read() {
  return new Promise((resolve, reject) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }
      const parsedData = JSON.parse(data);
      return resolve(parsedData);
    });
  });
}

async function findMenAndWoman() {
  const people = await read();
  const men = people
    .filter((man) => man.gender === "male")
    .map((ime) => ime.name);
  const woman = people
    .filter((women) => women.gender === "female")
    .map((ime) => ime.name);

  return { men, woman };
}

async function manOlderThanThirty() {
  const men = await read();
  const older = men
    .filter((years) => years.age > 30 && years.gender === "male")
    .map((men) => men.name);
  return older;
}

async function womanYoungerThenThirty() {
  const woman = await read();
  const younger = woman
    .filter((woman) => woman.age < 30 && woman.gender === "female")
    .map((users) => users.name);
  return younger;
}

async function secondOlderWoman() {
  const people = await read();
  const woman = people
    .filter((woman) => woman.gender === "female")
    .sort((a, b) => b.age - a.age);
  const secondWoman = woman[1].name;
  return secondWoman;
}

async function oldestUser() {
  const people = await read();
  const oldest = people
    .sort((a, b) => a.age - b.age)
    .slice(-1)
    .map((user) => user.name);

  const youngest = people.reduce((younger, older) =>
    younger.age < older.age ? younger : older
  );
  const young = youngest.name;
  return { oldest, young };
}

async function sortedByAge() {
  const people = await read();
  const sorted = people
    .sort((a, b) => a.age - b.age)
    .map((user) => ({
      name: user.name,
      age: user.age,
    }));
  return sorted;
}

module.exports = {
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
};
