let ioInstance = null;
const userIdToSocketId = new Map();

function setIo(io) {
  ioInstance = io;
}

function getIo() {
  return ioInstance;
}

function registerUserSocket(userId, socketId) {
  if (userId && socketId) {
    userIdToSocketId.set(String(userId), socketId);
  }
}

function getSocketIdForUser(userId) {
  return userIdToSocketId.get(String(userId)) || null;
}

function removeSocket(socketId) {
  for (const [uid, sid] of userIdToSocketId.entries()) {
    if (sid === socketId) userIdToSocketId.delete(uid);
  }
}

module.exports = {
  setIo,
  getIo,
  registerUserSocket,
  getSocketIdForUser,
  removeSocket,
};


