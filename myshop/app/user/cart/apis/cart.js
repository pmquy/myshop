import { ProductApi } from "@/app/product/apis"

const carts = [
  {
    _id: 0,
    username: 'username',
    product: 'ACX Mesh',
    option: {
      model: 0,
      'base on': 0
    },
    quantity: 1,
  },
  {
    _id: 3,
    username: 'username',
    product: 'ACX VIP',
    option: {
      model: 0,
      'base on': 0
    },
    quantity: 1,
  },
  {
    _id: 1,
    username: 'username',
    product: 'ACX Mesh',
    option: {
      model: 0,
      'base on': 1
    },
    quantity: 2,
  },
  {
    _id: 2,
    username: 'username',
    product: 'ACX Mesh',
    option: {
      model: 1,
      'base on': 1
    },
    quantity: 3,
  }
]

class Api {
  get = async query => {
    return carts
  }

  findOne = async query => {
    return carts.filter(e => Object.keys(query).every(key => query[key] == e[key]))[0]
  }

  findMany = async query => {
    return Promise.all(carts.filter(e => Object.keys(query).every(key => query[key] == e[key])).map(e => {
      return ProductApi.findOne({ name: e.product }).then(v => { return { ...e, product: v } })
    }))
  }

  updateById = async (id, update) => {
    return new Promise((resolve) => {
      Object.assign(carts[carts.findIndex(e => e._id == id)], update)
      resolve('OK')
    })
  }

  create = async data => {
    return new Promise((resolve) => {
      carts.push({ ...data, _id: carts.length ? carts[carts.length - 1]._id + 1 : 0 })
      resolve('create')
    })
  }

  checkDiscount = async code => {
    return new Promise((resolve) => {
      let t = Math.random()
      let a = Math.ceil(Math.random() * 40)
      if (t < 0.3) {
        resolve({
          status: 'success',
          info: `${a}% discount`,
          value: `${a}%`,
          code
        })
      } else if (t < 0.6) {
        resolve({
          status: 'success',
          info: `${a} discount`,
          value: `${a}`,
          code
        })
      } else {
        resolve({
          status: 'wrong',
          info: 'Your code is wrong',
          code
        })
      }
    })
  }

}


export default new Api()