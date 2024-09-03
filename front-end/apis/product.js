import { fetchWithRefresh, parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_PRODUCT_SERVICE ? process.env.NEXT_PUBLIC_PRODUCT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query) => {
    return fetchWithRefresh(`${url}/products${parseQuery(query)}`)
  }

  findById = async id => {
    return fetchWithRefresh(`${url}/products/${id}`)
  }

  create = async data => {
    return fetchWithRefresh(`${url}/products`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  updateById = async (id, data) => {
    return fetchWithRefresh(`${url}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  deleteById = async id => {
    return fetchWithRefresh(`${url}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
    })
  }
  
  summary1 = async () => {
    return fetchWithRefresh(`${url}/products/summary1`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
    })
  }
}

export default new Api()
