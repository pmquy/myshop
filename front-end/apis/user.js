const url = process.env.NEXT_PUBLIC_USER_SERVICE ? process.env.NEXT_PUBLIC_USER_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {

  login = async ({ phoneNumber, password }) => {
    return fetch(`${url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phoneNumber: phoneNumber, password: password })
    })
      .then(res => {
        localStorage.setItem('access_token', res.headers.get('Authorization'))
        return res.json()
      })
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  getMe = async () => {
    return fetch(`${url}/users/me`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status == 200) return res.data
      })
  }

  create = async (user) => {
    return fetch(`${url}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  updateMe = async (update) => {
    return fetch(`${url}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  changePassword = async (update) => {
    return fetch(`${url}/users/me/changepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('access_token')
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}

export default new Api()