const express = require("express");
const app = express();

const {
  getDataFromApi,
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
  companyPage,
  getUsername,
  postsPage,
} = require("./controllers/controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", homepage);
app.get("/firstApi", getDataFromApi);
app.get("/company", companyPage);
app.post("/company", findByCompany);
app.get("/city", getUsername);
app.post("/city", findByUsername);
app.get("/posts", postsPage);
app.post("/posts", getPosts);
app.get("/men", getMenAndWoman);
app.get("/olderman", findManOlderThanThirty);
app.get("/youngerwoman", findWomenYoungerThenThirty);
app.get("/secondwoman", findTheSecondOldestWoman);
app.get("/userage", findOldestAndYoungest);
app.get("/sortedusers", getSortedUsers);

app.listen(3000, () => console.log("Server is listening on port 3000"));
