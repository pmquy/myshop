const url = process.env.NEXT_PUBLIC_PAYMENT_SERVICE ? process.env.NEXT_PUBLIC_PAYMENT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL


class Api {

  find = async (query = {}) => {
    return fetch(`${url}/payments?q=${JSON.stringify(query)}`, {
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
  
  payById = async (id) => {
    return fetch(`${url}/payments/${id}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
      method: 'PUT'
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

}


export default new Api()