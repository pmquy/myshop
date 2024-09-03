import { fetchWithRefresh, parseQuery } from "@/utils"
const url = process.env.NEXT_PUBLIC_CART_SERVICE ? process.env.NEXT_PUBLIC_CART_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL


class Api {

  find = async (query) => {
    return fetchWithRefresh(`${url}/carts${parseQuery(query)}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }

  findById = async id => {
    return fetchWithRefresh(`${url}/carts/${id}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }

  create = async data => {
    return fetchWithRefresh(`${url}/carts/`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  updateById = async (id, data) => {
    return fetchWithRefresh(`${url}/carts/${id}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  deleteById = async id => {
    return fetchWithRefresh(`${url}/carts/${id}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
      method: 'DELETE',
    })
  }
}


export default new Api()