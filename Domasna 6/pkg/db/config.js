const mongoose = require("mongoose");
const { getSection } = require("../config");

const { MONGO_USERNAME, MONGO_PASSWORD } = getSection("development");

const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.frwhldk.mongodb.net/semos?retryWrites=true&w=majority&appName=Cluster0`;

async function dbConnect() {
  try {
    await mongoose.connect(uri);
    console.log("connected");
  } catch (err) {
    console.log(err.message);
  }
}

dbConnect();
