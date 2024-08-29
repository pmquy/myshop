const url = process.env.NEXT_PUBLIC_PRODUCT_SERVICE ? process.env.NEXT_PUBLIC_PRODUCT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query = {}) => {
    return fetch(`${url}/rooms?q=${JSON.stringify(query)}`)
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  findById = async id => {
    return fetch(`${url}/rooms/${id}`)
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  create = async data => {
    return fetch(`${url}/rooms`, {
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

  updateById = async (id, data) => {
    return fetch(`${url}/rooms/${id}`, {
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

  deleteById = async id => {
    return fetch(`${url}/rooms/${id}`, {
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
