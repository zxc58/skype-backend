const emitEvents = {
  broadcastEmitHide: (io, socket) => {
    socket.broadcast.emit('hide', socket.id)
  },
  broadcastEmitDisplay: (io, socket) => {
    const user = { id: socket.id, name: socket.data.name }

    socket.broadcast.emit('display', user)
  }
}
module.exports = emitEvents
