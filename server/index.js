const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const route = require("./route");
const { addUser, findUser, getRoomUsers } = require("./user");

app.use(cors({ origin: "*" }));
app.use(route);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user, isExist } = addUser({ name, room });

    const userMessage = isExist
      ? `${user.name}, welcome back`
      : `Welcome ${user.name}`;

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

    io.to(user.room).emit("joinRoom", {
      data: { room: user.room, users: getRoomUsers(user.room) },
    });
  });

  socket.on("sendMessage", ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      io.to(user.room).emit("message", { data: { user, message, time } });
    }
  });

  socket.on("typing", ({ params }) => {
    const user = findUser(params);
    if (user) {
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
