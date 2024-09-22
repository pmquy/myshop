import { UserAPI } from "@/apis"

const fetchWithRefresh = async (input, init) => {

  return fetch(input, init)
    .then(res => {
      if (res.status === 401 || res.status === 403) return UserAPI.refresh().then(() => fetch(input, init))
      return res
    })
    .then(res => res.json())
    .then(res => {
      if (res.status != 200) throw new Error(res.data)
      return res.data
    })
}

export default fetchWithRefresh