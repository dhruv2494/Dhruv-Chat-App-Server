const { Server } = require("socket.io");
const chatArray = require("../models/chatmodel");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {},
  });

  io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);
    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room ${room}`);
    });

    socket.on("send-msg", async (data) => {
      let a = await chatArray.find({ room: data.room });
      let update = await chatArray.findByIdAndUpdate(a[0]._id, {
        $set: { room: data.room, chat: [...a[0].chat, data.data] },
      });
      socket.broadcast.to(data.room).emit("receive-msg", data.data);
    });

    socket.on("is-typing", async (data) => {
      socket.broadcast.to(data.room).emit("user-typing", data.name);
    });
    socket.on("is-not-typing", async (data) => {
      socket.broadcast.to(data.room).emit("user-not-typing", data.name);
    });
  });
};
