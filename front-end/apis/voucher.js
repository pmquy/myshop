import { fetchWithRefresh, parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_PAYMENT_SERVICE ? process.env.NEXT_PUBLIC_PAYMENT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query) => {
    return fetchWithRefresh(`${url}/vouchers${parseQuery(query)}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
    })
  }

  findByCode = async code => {
    return fetchWithRefresh(`${url}/vouchers/${code}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
    })
  }

  create = async data => {
    return fetchWithRefresh(`${url}/vouchers`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  updateByCode = async (code, data) => {
    return fetchWithRefresh(`${url}/vouchers/${code}`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  deleteByCode = async code => {
    return fetchWithRefresh(`${url}/vouchers/${code}`, {
      method: 'DELETE',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
    })
  }
}

export default new Api()
