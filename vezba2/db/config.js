const mongoose = require("mongoose");

const uri = `mongodb+srv://skitac:<password>@cluster0.frwhldk.mongodb.net/semos?retryWrites=true&w=majority`;

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
  }
})();
