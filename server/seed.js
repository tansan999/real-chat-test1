// server/seed.js

const mongoose = require("mongoose");
const User = require("./models/User");
const fs = require("fs");
const path = require("path");

// GBbokt5ovNp10zrT

// 692ca3ae20cea55cb6898ae0
// Кудаш's Org - 2025-11-30
// 11/30/25 - 08:06:06 PM

const MONGO_URI =
  "mongodb+srv://kudash1525_db_user:GBbokt5ovNp10zrT@cluster0.khrt3lp.mongodb.net/?appName=Cluster0";

// Если сервер выдаст ошибку "getaddrinfo ENOTFOUND", значит адрес кластера (после @) неправильный.
// В таком случае возьми строку, которую дал сайт MongoDB, и просто вставь в нее свой пароль.

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
