const redis = require('redis')
// const logger = require('../helpers/winston')
const redisClient = redis.createClient({
  url: process.env.REDIS_CONNECT_STRING ?? 'redis://localhost:6379'
})
redisClient.on('connect', () => {
  console.info('Redis client connected')
})
redisClient.on('error', () => { console.error('redis on error') })
redisClient.connect()
module.exports = redisClient
