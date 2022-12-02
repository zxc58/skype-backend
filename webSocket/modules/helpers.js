const roomIn = (client) => Object.keys(client.rooms).find(roomId => roomId !== client.id)
module.exports = { roomIn }
