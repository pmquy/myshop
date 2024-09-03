import { parseQuery } from "@/utils"
const url = process.env.NEXT_PUBLIC_CART_SERVICE ? process.env.NEXT_PUBLIC_CART_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL


class Api {

  find = async (query) => {
    return fetch(`${url}/carts${parseQuery(query)}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  findById = async id => {
    return fetch(`${url}/carts/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  create = async data => {
    return fetch(`${url}/carts/`, {
      headers: {
        'Authorization': localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
  
  updateById = async (id, data) => {
    return fetch(`${url}/carts/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
  
  deleteById = async id => {
    return fetch(`${url}/carts/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token'),
      },
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}


export default new Api()