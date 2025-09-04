const { getIo, getSocketIdForUser } = require('../utils/socket');

exports.startCall = async (req, res) => {
  try {
    const { calleeId, mediaType = 'video' } = req.body;
    const callerId = req.user?.id;
    if (!callerId || !calleeId) return res.status(400).json({ error: 'Missing caller or callee' });
    const io = getIo();
    if (!io) return res.status(500).json({ error: 'Socket unavailable' });
    const calleeSocketId = getSocketIdForUser(String(calleeId));
    if (!calleeSocketId) return res.status(202).json({ message: 'Callee offline; will notify when online' });
    io.to(calleeSocketId).emit('incomingCall', { from: String(callerId), name: req.user?.fullName, mediaType });
    return res.json({ message: 'Call initiated' });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to start call' });
  }
};

exports.answerCall = async (req, res) => {
  try {
    const { callerId, accept = true, mediaType = 'video' } = req.body;
    const calleeId = req.user?.id;
    if (!callerId || !calleeId) return res.status(400).json({ error: 'Missing caller or callee' });
    const io = getIo();
    if (!io) return res.status(500).json({ error: 'Socket unavailable' });
    const callerSocketId = getSocketIdForUser(String(callerId));
    if (callerSocketId) {
      if (accept) io.to(callerSocketId).emit('callAnswered', { from: String(calleeId), mediaType });
      else io.to(callerSocketId).emit('callTerminated');
    }
    return res.json({ message: accept ? 'Call accepted' : 'Call declined' });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to answer call' });
  }
};

exports.endCall = async (req, res) => {
  try {
    const { otherUserId } = req.body;
    const io = getIo();
    if (!io) return res.status(500).json({ error: 'Socket unavailable' });
    const targetSocketId = getSocketIdForUser(String(otherUserId));
    if (targetSocketId) io.to(targetSocketId).emit('callTerminated');
    return res.json({ message: 'Call ended' });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to end call' });
  }
};


