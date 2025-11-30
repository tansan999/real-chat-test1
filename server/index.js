const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const route = require("./route");
const { addUser, findUser, getRoomUsers } = require("./user");
const Message = require("./models/Message"); 

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const MONGO_URI = "mongodb+srv://kudash1525_db_user:GBbokt5ovNp10zrT@cluster0.khrt3lp.mongodb.net/?appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("🔥 DB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

io.on("connection", (socket) => {
  
  socket.on("join", async ({ name, room }) => { 
    socket.join(room);

    const { user, isExist } = addUser({ name, room });

    const userMessage = isExist
      ? `${user.name}, welcome back`
      : `Welcome ${user.name}`;

    try {
      const history = await Message.find({ room: user.room });
      socket.emit("history", { data: history });
    } catch (error) {
      console.error("Error loading history:", error);
    }

    socket.emit("message", {
      data: { 
        user: { name: "Admin" }, 
        message: userMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    });

    socket.broadcast.to(user.room).emit("message", {
      data: { 
        user: { name: "Admin" }, 
        message: `${user.name} has joined`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
    });

    io.to(user.room).emit("joinRoom", {
      data: { room: user.room, users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", async ({ message, params }) => { // Добавили async
    const user = findUser(params);

    if (user) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      const newMessage = new Message({
        room: user.room,
        user: user.name,
        message: message,
        time: time
      });

      await newMessage.save(); 

      io.to(user.room).emit("message", { data: { user, message, time } });
    }
  });

  socket.on("typing", ({ params }) => {
    const user = findUser(params);
    if(user) {
        socket.broadcast.to(user.room).emit("typing", { data: user.name });
    }
  });

  io.on("disconnect", () => {
    console.log("Disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});