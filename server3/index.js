const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      "https://658803af8c16a81fbfdf4909--quiet-tartufo-935f26.netlify.app",
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    const { room, s_id } = data;

    socket.join(room);

    if (!onlineUsers[room]) {
      onlineUsers[room] = [];
    }

    if (!onlineUsers[room].some((user) => user.id === socket.id)) {
      onlineUsers[room].push({ id: socket.id, s_id });
    }

    io.to(room).emit("update_online_users", onlineUsers);

    console.log(
      `User with ID: ${socket.id} & s_id: ${s_id} joined room: ${room}`
    );
    // console.log("list of online members are : ", onlineUsers);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("fetch_online_members", (data) => {
    const { room } = data;

    if (onlineUsers[room]) {
      socket.emit("update_online_users", onlineUsers);
    } else {
      console.error(`Room ${room} not found in onlineUsers`);
    }
  });

  socket.on("leave_room", (data) => {
    const { room, s_id } = data;

    if (onlineUsers[room]) {
      onlineUsers[room] = onlineUsers[room].filter(
        (user) => user.id !== socket.id
      );

      io.to(room).emit("update_online_users", onlineUsers);

      // console.log("list of online members are : ", onlineUsers);
      console.log(
        `User with ID: ${socket.id} & s_id: ${s_id} leaved room: ${room}`
      );
    } else {
      console.error(`Room ${room} not found in onlineUsers`);
    }
  });

  socket.on("disconnect", () => {
    Object.keys(onlineUsers).forEach((room) => {
      onlineUsers[room] = onlineUsers[room].filter(
        (user) => user.id !== socket.id
      );
      io.to(room).emit("update_online_users", onlineUsers);
    });

    console.log("User Disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 3100;

server.listen(PORT, () => {
  console.log("SERVER RUNNING");
});
