const express = require("express");
const http = require("http"); // предоставляет сам node.js http
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const route = require("./route");
const { log } = require("console");

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
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
