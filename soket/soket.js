const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {},
  });

  io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);
    socket.join("room");

    socket.on("new-user-joined", (Name) => {
      socket.broadcast.to("room").emit("user-join", Name);
    });

    socket.on("send-msg", (msg) => {
      socket.broadcast.to("room").emit("receive-msg", msg);
    });
  });
};
