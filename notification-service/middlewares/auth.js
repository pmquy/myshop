const url = process.env.USER_SERVICE ? process.env.USER_SERVICE : process.env.SERVER_URL

module.exports = async (req, res, next) => {
  try {
    await fetch(`${url}/users/me`, {
      headers: {
        Authorization: req.headers.authorization
      }
    })
      .then(res => res.json())
      .then(res => {
        if(res.status === 200) req.user = res.data
      })
  } catch (error) {
    
  } finally {
    next()
  }
}