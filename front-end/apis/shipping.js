import { fetchWithRefresh, parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_SHIPPING_SERVICE ? process.env.NEXT_PUBLIC_SHIPPING_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {

  find = async (query) => {
    return fetchWithRefresh(`${url}/shippings${parseQuery(query)}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }

  findByOrder = async order => {
    return fetchWithRefresh(`${url}/shippings/${order}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }
  
  trackByOrder = async order => {
    return fetchWithRefresh(`${url}/shippings/${order}/tracking`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      },
      method: "POST"
    })
  }
  
  confirmByOrder = async order => {
    return fetchWithRefresh(`${url}/shippings/${order}/confirm`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      },
      method: "POST"
    })
  }

  create = async data => {
    return fetchWithRefresh(`${url}/shippings/`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  updateByOrder = async (order, data) => {
    return fetchWithRefresh(`${url}/shippings/${order}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  deleteByOrder = async order => {
    return fetchWithRefresh(`${url}/shippings/${order}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
      method: 'DELETE',
    })
  }
}


export default new Api()