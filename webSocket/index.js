/* eslint-disable no-unused-vars */
const { Server } = require('socket.io')
const { onInitUsers, onRegister, onDisconnect, onInvite, onAccept, onCreateRoom, onPeerconnectSignaling } = require('./modules/onEvent')
const { peerconnectSignaling } = require('./modules/signal-server')
// const cors = require('cors')
// const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next)
const io = new Server()
// io.use(wrap(cors()))
io.on('connection', async (socket) => {
  onRegister(io, socket)
  onInitUsers(io, socket)
  onPeerconnectSignaling(io, socket)
  onCreateRoom(io, socket)

  onDisconnect(io, socket)
})
module.exports = io
