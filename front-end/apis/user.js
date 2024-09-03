import { fetchWithRefresh } from "@/utils"

const url = process.env.NEXT_PUBLIC_USER_SERVICE ? process.env.NEXT_PUBLIC_USER_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {

  login = async ({ phoneNumber, password }) => {
    return fetch(`${url}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ phoneNumber: phoneNumber, password: password })
    })
      .then(res => {
        sessionStorage.setItem('access_token', res.headers.get('Authorization'))
        return res.json()
      })
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  getMe = async () => {
    return fetchWithRefresh(`${url}/users/me`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }

  create = async (user) => {
    return fetch(`${url}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    return fetchWithRefresh(`${url}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
      },
      body: JSON.stringify(update)
    })
  }

  changePassword = async (update) => {
    return fetchWithRefresh(`${url}/users/me/changepassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('access_token')
      },
      body: JSON.stringify(update)
    })
  }

  refresh = async () => {
    return fetch(`${url}/users/me/refresh`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => {
        sessionStorage.setItem('access_token', res.headers.get('Authorization'))
        return res.json()
      })
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}

export default new Api()