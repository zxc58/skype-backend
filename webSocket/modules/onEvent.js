/* eslint-disable no-unused-vars */
const emitEvents = require('./emitEvent')
const { roomIn } = require('./helpers')
const onEvents = {
  onInitUsers: (io, socket) => {
    socket.on('getUsers', async (callback) => {
      const sockets = await io.fetchSockets()
      const users = sockets.map(e => ({ id: e.id, name: e.data.name }))
      callback(users)
    })
  },
  onRegister: (io, socket) => {
    socket.on('register', (name) => {
      socket.data.name = name
      emitEvents.broadcastEmitDisplay(io, socket)
    })
  },
  onDisconnect: (io, socket) => {
    socket.on('disconnect', () => {
      emitEvents.broadcastEmitHide(io, socket)
    })
  },
  onInvite: (io, socket) => {
    socket.on('invite', (id) => {
      socket.to(id).emit('invite', { id: socket.id, name: socket.data.name })
    })
  },
  onAccept: (io, socket) => {
    socket.on('accept', ({ user1Id, user2Id }) => {
      console.log('onAccept')
      console.log(user1Id)
      console.log(user2Id)
    })
  },
  onCreateRoom: (io, socket) => {
    socket.on('createRoom', (roomId) => {
      const isInRoomId = roomIn(socket)
      if (isInRoomId) { socket.leave(isInRoomId) }
      socket.join(roomId)
      emitEvents.broadcastEmitHide(io, socket)
    })
  },
  onPeerconnectSignaling: (io, socket) => {
    socket.on('peerconnectSignaling', (message) => {
      console.log('接收資料：', message)

      const nowRoom = roomIn(socket)
      socket.to(nowRoom).emit('peerconnectSignaling', message)
    })
  }
}
module.exports = onEvents
