const express = require('express')
const app = express()
const cors = require('cors')
const redisClient = require('./config/redis')
app.use(cors())
app.get('/user', async (req, res) => {
  const { name } = req.query
  console.log(name)
  const result = await redisClient.get(name)
  if (result) { return res.json({ status: false, msg: 'repeat name' }) }
  await redisClient.set(name, name)
  return res.json({ status: true, msg: 'register successfully' })
})
module.exports = app
