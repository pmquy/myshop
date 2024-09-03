import { fetchWithRefresh, parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_RATING_SERVICE ? process.env.NEXT_PUBLIC_RATING_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query) => {
    return fetchWithRefresh(`${url}/ratings${parseQuery(query)}`)
  }

  create = async data => {
    return fetchWithRefresh(`${url}/ratings`, {
      method: 'POST',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  updateById = async (id, data) => {
    return fetchWithRefresh(`${url}/ratings/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
  }

  getAvgRating = async (query) => {
    return fetchWithRefresh(`${url}/ratings/avg${parseQuery(query)}`)
  }
}

export default new Api()
