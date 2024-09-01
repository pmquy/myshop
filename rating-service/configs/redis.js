const redis = require('redis').createClient({
  url: process.env.REDIS_URI
})

redis.on('error', (err) => {
  console.log('Redis Client Error:', err);
});

const connect = () => {
  redis.connect()
    .then(() => console.log('Connected Redis: ' + process.env.REDIS_URI))
    .catch(err => console.error(err.message))
}

module.exports = { redis , connect}


