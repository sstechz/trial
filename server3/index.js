const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://653a167f86fe846c32bf6ffe--transcendent-toffee-825eb6.netlify.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    //  data represents room
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log(`User with ID: ${socket.id} leaved room: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
