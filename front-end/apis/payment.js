import { fetchWithRefresh } from "@/utils"

const url = process.env.NEXT_PUBLIC_PAYMENT_SERVICE ? process.env.NEXT_PUBLIC_PAYMENT_SERVICE : process.env.NEXT_PUBLIC_SERVER_URL


class Api {

  find = async (query = {}) => {
    return fetchWithRefresh(`${url}/payments?q=${JSON.stringify(query)}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      }
    })
  }
  
  confirmPayByOrder = async (order) => {
    return fetchWithRefresh(`${url}/payments/${order}/confirmPay`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      },
      method: 'POST'
    })
  }
  
  revokePayByOrder = async (order) => {
    return fetchWithRefresh(`${url}/payments/${order}/revokePay`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      },
      method: 'POST'
    })
  }
  
  findByOrder = async (order) => {
    return fetchWithRefresh(`${url}/payments/${order}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token')
      },
    })
  }

  summary1 = async ({startAt, endAt}) => {
    return fetchWithRefresh(`${url}/payments/summary1?startAt=${startAt}&endAt=${endAt}`, {
      headers: {
        'Authorization': sessionStorage.getItem('access_token'),
      },
      method: 'POST',
    })
  }

}


export default new Api()