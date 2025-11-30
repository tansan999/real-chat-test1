const mongoose = require("mongoose");
const User = require("./models/User");
const fs = require("fs");
const path = require("path");

const MONGO_URI =
  "mongodb+srv://kudash1525_db_user:GBbokt5ovNp10zrT@cluster0.khrt3lp.mongodb.net/?appName=Cluster0";

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("🔥 Connected to DB");

    const data = fs.readFileSync(path.join(__dirname, "user.json"), "utf-8");
    const users = JSON.parse(data);

    await User.deleteMany({});
    console.log("🧹 Old data cleared");

    await User.insertMany(users);
    console.log(`✅ Successfully imported ${users.length} users!`);

    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

seedDatabase();
