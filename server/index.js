const User = require("./models/User");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const route = require("./route");
const { addUser, findUser, getRoomUsers, removeUser } = require("./user");
const Message = require("./models/Message");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

// Initialize Socket.io with CORS enabled
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Database Connection String
const MONGO_URI =
  "mongodb+srv://kudash1525_db_user:GBbokt5ovNp10zrT@cluster0.khrt3lp.mongodb.net/?appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 DB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Endpoint to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Endpoint to fetch existing rooms
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Message.distinct("room");
    res.json(rooms);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

io.on("connection", (socket) => {
  // Event: User joins a room
  socket.on("join", async ({ name, room }) => {
    socket.join(room);

    // 1. Fetch user details from MongoDB (to get email, phone, etc.)
    let dbUserData = {};
    try {
      const userFromDb = await User.findOne({ name: name });
      if (userFromDb) {
        dbUserData = userFromDb.toObject();
      }
    } catch (error) {
      console.error("Error finding user in DB:", error);
    }

    // 2. Add user to the active room list
    const { user, isExist } = addUser({ ...dbUserData, name, room });

    const userMessage = isExist
      ? `${user.name}, welcome back`
      : `Welcome ${user.name}`;

    // 3. Load chat history from MongoDB
    try {
      const history = await Message.find({ room: user.room });
      socket.emit("history", { data: history });
    } catch (error) {
      console.error("Error loading history:", error);
    }

    // Send welcome message to the user
    socket.emit("message", {
      data: {
        user: { name: "Admin" },
        message: userMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    });

    // Notify others in the room
    socket.broadcast.to(user.room).emit("message", {
      data: {
        user: { name: "Admin" },
        message: `${user.name} has joined`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    });

    // Update room user list
    io.to(user.room).emit("joinRoom", {
      data: { room: user.room, users: getRoomUsers(user.room) },
    });
  });

  // Event: Send a message
  socket.on("sendMessage", async ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Save message to Database
      const newMessage = new Message({
        room: user.room,
        user: user.name,
        message: message,
        time: time,
      });

      const savedMessage = await newMessage.save();

      // Broadcast message to the room
      io.to(user.room).emit("message", { data: savedMessage });
    }
  });

  // Event: Delete a message
  socket.on("deleteMessage", async ({ id, room }) => {
    await Message.findByIdAndDelete(id);
    io.to(room).emit("deleteMessage", { id });
  });

  // Event: Kick user (Admin only)
  socket.on("kick", ({ params }) => {
    const user = removeUser(params);

    if (user) {
      io.to(user.room).emit("message", {
        data: {
          user: { name: "Admin" },
          message: `${user.name} has been kicked.`,
        },
      });

      io.to(user.room).emit("joinRoom", {
        data: { users: getRoomUsers(user.room) },
      });
    }
  });

  // Event: Typing indicator
  socket.on("typing", ({ params }) => {
    const user = findUser(params);
    if (user) {
      socket.broadcast.to(user.room).emit("typing", { data: user.name });
    }
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
