import { parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_PAYMENT_SERVICE ? process.env.NEXT_PUBLIC_PAYMENT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query) => {
    return fetch(`${url}/vouchers${parseQuery(query)}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  findByCode = async code => {
    return fetch(`${url}/vouchers/${code}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  create = async data => {
    return fetch(`${url}/vouchers`, {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  updateByCode = async (code, data) => {
    return fetch(`${url}/vouchers/${code}`, {
      method: 'PUT',
      headers: {
        'Authorization': localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  deleteByCode = async code => {
    return fetch(`${url}/vouchers/${code}`, {
      method: 'DELETE',
      headers: {
        'Authorization': localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}

export default new Api()
