const users = [
  {
    _id: 0,
    firstName: 'Pham Minh',
    lastName: 'Quy',
    email: 'email@gmail.com',
    password: 'password'
  }
]

class Api {
  login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      const user = users.filter(e => e.email == email && e.password == password)[0]
      if (user) resolve(user)
      else reject(new Error('Wrong email or password'))
    })
  }

  create = async (user) => {
    return new Promise((resolve, reject) => {
      users.push(user)
      resolve('Success')
    })
  }
}

export default new Api()