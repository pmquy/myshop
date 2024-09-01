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
  
  confirmPayByOrder = async (order) => {
    return fetch(`${url}/payments/${order}/confirmPay`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
  
  revokePayByOrder = async (order) => {
    return fetch(`${url}/payments/${order}/revokePay`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
      method: 'POST'
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
  
  findByOrder = async (order) => {
    return fetch(`${url}/payments/${order}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token')
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  summary1 = async ({startAt, endAt}) => {
    return fetch(`${url}/payments/summary1?startAt=${startAt}&endAt=${endAt}`, {
      headers: {
        'Authorization': localStorage.getItem('access_token'),
      },
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

}


export default new Api()