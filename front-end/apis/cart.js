import ProductAPI from "./product"
const url = process.env.NEXT_PUBLIC_CART_SERVICE ? process.env.NEXT_PUBLIC_CART_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL


class Api {

  find = async (query = {}) => {
    return fetch(`${url}/carts?q=${JSON.stringify(query)}`, {
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

  checkDiscount = async code => {
    return new Promise((resolve) => {
      let t = Math.random()
      let a = Math.ceil(Math.random() * 40)
      if (t < 0.3) {
        resolve({
          status: 'success',
          info: `${a}% discount`,
          value: `${a}%`,
          code
        })
      } else if (t < 0.6) {
        resolve({
          status: 'success',
          info: `${a} discount`,
          value: `${a}`,
          code
        })
      } else {
        resolve({
          status: 'wrong',
          info: 'Your code is wrong',
          code
        })
      }
    })
  }

}


export default new Api()