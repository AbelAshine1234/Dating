const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIO = require("socket.io");
const { setIo, registerUserSocket, getSocketIdForUser, removeSocket } = require('./socket');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const userIdToSocketId = new Map();

setIo(io);

io.on("connection", (socket) => {
  console.log('[socket] client connected', socket.id);
  socket.emit("socketId", socket.id);

  socket.on("registerUser", ({ userId }) => {
    if (userId) {
      registerUserSocket(String(userId), socket.id);
      console.log('[socket] registerUser', { userId: String(userId), socketId: socket.id });
    }
  });

  socket.on(
    "initiateCall",
    ({ targetId, signalData, senderId, senderName }) => {
      // targetId is expected to be a userId; map to socket
      const targetSocketId = getSocketIdForUser(String(targetId)) || targetId;
      console.log('[socket] initiateCall', { senderId, targetId, resolvedSocketId: targetSocketId, senderName });
      io.to(targetSocketId).emit("incomingCall", {
        signal: signalData,
        from: senderId,
        name: senderName,
      });
      console.log('[socket] incomingCall emitted', { to: targetSocketId });
    }
  );

  socket.on("changeMediaStatus", ({ mediaType, isActive }) => {
    socket.broadcast.emit("mediaStatusChanged", {
      mediaType,
      isActive,
    });
  });

  socket.on("sendMessage", ({ targetId, message, senderName }) => {
    const targetSocketId = getSocketIdForUser(String(targetId)) || targetId;
    console.log('[socket] sendMessage', { targetId, resolvedSocketId: targetSocketId, senderName, message });
    io.to(targetSocketId).emit("receiveMessage", { message, senderName });
  });

  socket.on("answerCall", (data) => {
    socket.broadcast.emit("mediaStatusChanged", {
      mediaType: data.mediaType,
      isActive: data.mediaStatus,
    });
    const targetSocketId = getSocketIdForUser(String(data.to)) || data.to;
    io.to(targetSocketId).emit("callAnswered", data);
  });

  socket.on("terminateCall", ({ targetId }) => {
    const targetSocketId = getSocketIdForUser(String(targetId)) || targetId;
    console.log('[socket] terminateCall', { targetId, resolvedSocketId: targetSocketId });
    io.to(targetSocketId).emit("callTerminated");
  });

  socket.on("disconnect", () => {
    console.log('[socket] client disconnected', socket.id);
    removeSocket(socket.id);
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
