import { parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_RATING_SERVICE ? process.env.NEXT_PUBLIC_RATING_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query) => {
    return fetch(`${url}/ratings${parseQuery(query)}`)
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  create = async data => {
    return fetch(`${url}/ratings`, {
      method: 'POST',
      headers: {
        'Authorization': localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  updateById = async (id, data) => {
    return fetch(`${url}/ratings/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  getAvgRating = async (query) => {
    return fetch(`${url}/ratings/avg${parseQuery(query)}`)
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}

export default new Api()
