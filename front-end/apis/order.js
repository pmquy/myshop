import { parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_ORDER_SERVICE ? process.env.NEXT_PUBLIC_ORDER_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {

  find = async (query) => {
    return fetch(`${url}/orders${parseQuery(query)}`, {
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
    return fetch(`${url}/orders/${id}`, {
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
    return fetch(`${url}/orders/`, {
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

  cancelById = async id => {
    return fetch(`${url}/orders/${id}`, {
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

  summary1 = async ({startAt, endAt}) => {
    return fetch(`${url}/orders/summary1?startAt=${startAt}&endAt=${endAt}`, {
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
  
  summary2 = async ({startAt, endAt, product}) => {
    return fetch(`${url}/orders/summary2?startAt=${startAt}&endAt=${endAt}&product=${product}`, {
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