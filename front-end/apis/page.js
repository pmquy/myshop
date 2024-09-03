import { fetchWithRefresh } from "@/utils"

const url = process.env.NEXT_PUBLIC_PAGE_SERVICE ? process.env.NEXT_PUBLIC_PAGE_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL + '/page'

class Api {
  getProvinces = async () => {
    return fetchWithRefresh(`${url}/provinces`, { cache: 'force-cache'})
  }
}


export default new Api()