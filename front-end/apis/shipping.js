import { parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_SHIPPING_SERVICE ? process.env.NEXT_PUBLIC_SHIPPING_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {

  find = async (query) => {
    return fetch(`${url}/shippings${parseQuery(query)}`, {
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

  findByOrder = async order => {
    return fetch(`${url}/shippings/${order}`, {
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
  
  trackByOrder = async order => {
    return fetch(`${url}/shippings/${order}/tracking`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
  
  confirmByOrder = async order => {
    return fetch(`${url}/shippings/${order}/confirm`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
      method: "POST"
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  create = async data => {
    return fetch(`${url}/shippings/`, {
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
  
  updateByOrder = async (order, data) => {
    return fetch(`${url}/shippings/${order}`, {
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

  deleteByOrder = async order => {
    return fetch(`${url}/shippings/${order}`, {
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