/* eslint-disable no-unused-vars */
const { Server } = require('socket.io')
const { onGetUsers, onRegister, onDisconnect, onInvite, onAccept, onJoinRoom, onPeerconnectSignaling } = require('./modules/onEvent')
const onEvents = require('./modules/onEvent')
const { peerconnectSignaling } = require('./modules/signal-server')
// const cors = require('cors')
// const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next)
const io = new Server()
// io.use(wrap(cors()))
io.on('connection', async (socket) => {
  Object.values(onEvents).forEach(onEvent => onEvent({ io, socket }))
})
module.exports = io
