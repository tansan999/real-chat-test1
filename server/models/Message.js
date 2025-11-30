const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    // createdAt добавит дату создания автоматически
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
