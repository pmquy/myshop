import { fetchWithRefresh, parseQuery } from "@/utils"

const url = process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE ? process.env.NEXT_PUBLIC_NOTIFICATION_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query) => {
    return fetchWithRefresh(`${url}/notifications${parseQuery(query)}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
    })
  }
}

export default new Api()
