const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  avatar: String,
  favorite: Boolean,
  phone: String,
  website: String,
  address: {
    streetA: String,
    streetB: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
  posts: [
    {
      words: [String],
      sentence: String,
      sentences: String,
      paragraph: String,
    },
  ],
  accountHistory: [
    {
      amount: String,
      date: String,
      business: String,
      name: String,
      type: String,
      account: String,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
