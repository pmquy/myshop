const url = process.env.NEXT_PUBLIC_PRODUCT_SERVICE ? process.env.NEXT_PUBLIC_PRODUCT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL

class Api {
  find = async (query = {}) => {
    return fetch(`${url}/products?q=${JSON.stringify(query)}`, {cache : 'force-cache'})
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }

  findById = async id => {
    return fetch(`${url}/products/${id}`, { cache: 'force-cache' })
      .then(res => res.json())
      .then(res => {
        if (res.status != 200) throw new Error(res.data)
        return res.data
      })
  }
}

export default new Api()
