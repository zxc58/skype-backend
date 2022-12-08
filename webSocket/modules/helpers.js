const roomIn = (socket) => Array.from(socket.rooms).find(roomId => roomId !== socket.id)
module.exports = { roomIn }
