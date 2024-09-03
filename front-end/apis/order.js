import { fetchWithRefresh, parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_ORDER_SERVICE ? process.env.NEXT_PUBLIC_ORDER_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {

  find = async (query) => {
    return fetchWithRefresh(`${url}/orders${parseQuery(query)}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }

  findById = async id => {
    return fetchWithRefresh(`${url}/orders/${id}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }

  create = async data => {
    return fetchWithRefresh(`${url}/orders/`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  cancelById = async id => {
    return fetchWithRefresh(`${url}/orders/${id}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
      method: 'DELETE',
    })
  }

  summary1 = async ({startAt, endAt}) => {
    return fetchWithRefresh(`${url}/orders/summary1?startAt=${startAt}&endAt=${endAt}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
      method: 'POST',
    })
  }
  
  summary2 = async ({startAt, endAt, product}) => {
    return fetchWithRefresh(`${url}/orders/summary2?startAt=${startAt}&endAt=${endAt}&product=${product}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
      method: 'POST',
    })
  }
}


export default new Api()