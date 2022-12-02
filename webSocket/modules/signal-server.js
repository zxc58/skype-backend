const { roomIn } = require('./helpers')
const peerconnectSignaling = (io, client) => (message) => {
  const nowRoom = roomIn(client)
  client.to(nowRoom).emit('peerconnectSignaling', message)
}
module.exports = { peerconnectSignaling }
