
const emit = require('./emitEvent')
const { roomIn } = require('./helpers')
// const maxSize = process.env.MAX_SIZE ?? 2
const onEvents = {
  onGetUsers: ({ io, socket }) => socket.on('getUsers', async (callback) => {
    const sockets = await io.fetchSockets()
    const users = sockets.map(e => ({ id: e.id, name: e.data.name, isBusy: !!roomIn(e) }))
    callback(users)
  }),
  onRegister: ({ io, socket }) => socket.on('register', (name) => {
    socket.data.name = name
    emit.broadcast.display(socket)
  }),
  onDisconnect: ({ io, socket }) => socket.on('disconnect', () => {
    emit.broadcast.hide(socket)
  }),
  onInvite: ({ io, socket }) => socket.on('invite', (invitation) => {
    socket.to(invitation.invitingId).emit('invite', invitation)
  }),
  onJoinRoom: ({ io, socket }) => socket.on('joinRoom', (room, callback) => {
    const { id, size } = room
    if (io.of('/').adapter.rooms.get(id)?.size === size) {
      const result = false
      return callback(result)
    }
    const currentRoom = roomIn(socket)
    if (currentRoom) { socket.leave(currentRoom) }
    socket.join(id)
    emit.broadcast.toggleBusy(socket)
    const socketIds = io.of('/').adapter.rooms.get(id)
    // console.log(socketIds)
    if (callback) { callback(Array.from(socketIds)) }
    socket.in(id).emit('newOneJoin', socket.id)
  }),
  onLeaveRoom: ({ io, socket }) => socket.on('leaveRoom', () => {
    const currentRoom = roomIn(socket)
    socket.broadcast.in(currentRoom).emit('leaveRoom', socket.id)
    socket.leave(currentRoom)
    emit.broadcast.toggleBusy(socket)
  }),
  onPeerconnectSignaling: ({ io, socket }) => socket.on('peerconnectSignaling', (message, callback) => {
    const { recipientId } = message
    socket.to(recipientId).emit('peerconnectSignaling', message)
    if (callback) { callback() }
  }),
  onreturn: ({ io, socket }) => socket.on('return', (name, msg) => setTimeout(() => socket.emit(name, msg), 8000))
}
module.exports = onEvents
