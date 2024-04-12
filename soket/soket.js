const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {},
  });

  io.on("connection", (socket) => {
    // console.log("New client connected:", socket.id);
    socket.join("room");

    socket.on("new-user-joined", (Name) => {
      socket.to("room").broadcast.emit("user-join", Name);
    });

    socket.on("send-msg", (msg) => {
      socket.to("room").broadcast.emit("receive-msg", msg);
    });
  });
};
