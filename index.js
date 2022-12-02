const app = require('./application/app')
const http = require('http')
const io = require('./webSocket')
const port = process.env.PORT ?? 3030
const server = http.createServer(app)
io.attach(server, {
  cors: {
    origin: [
      'ws://localhost:3000',
      'http://localhost:3000'
    ],
    method: ['GET', 'POST']
  }
})
server.listen(port, () => console.log('server starts at ' + port))
