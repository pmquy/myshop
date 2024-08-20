const url = process.env.NEXT_PUBLIC_PAGE_SERVICE ? process.env.NEXT_PUBLIC_PAGE_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL + '/page'

class Api {
  getProvinces = async () => {
    return fetch(`${url}/provinces`, { cache: 'force-cache'})
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}


export default new Api()