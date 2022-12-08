const emit = {
  broadcast: {
    hide: (socket) => {
      socket.broadcast.emit('hide', socket.id)
    },
    display: (socket) => {
      const user = { id: socket.id, name: socket.data.name }
      socket.broadcast.emit('display', user)
    },
    toggleBusy: (socket) => {
      socket.broadcast.emit('toggleBusy', socket.id)
    }
  }
}
module.exports = emit
