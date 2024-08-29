const { Product, Designer, Room, Category } = require('../models')
const { E } = require('../utils')
const Joi = require('joi')
const { redis } = require('../configs/redis')

const VALIDATORS = {

  create:
    Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      avatar: Joi.string().required(),
      images: Joi.array().min(1).items(Joi.string()).required(),
      category: Joi.string().required(),
      designer: Joi.string().required(),
      room: Joi.string().required(),
      inventoryAmount: Joi.number().integer().min(0).default(100),
      price: Joi.number().min(0).required(),
      options: Joi.object().pattern(Joi.string(), Joi.array().min(2).items(Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        price: Joi.number().min(0).required()
      }).unknown(false))).required(),
      recommendations: Joi.array().items(Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0))
      }).unknown(false)).required()
    }).unknown(false).required().custom((value, helpers) => {
      const keys = Object.keys(value.options)
      if (value.recommendations.some(e => Object.keys(e.option).some(t => !keys.includes(t) || e.option[t] < 0 || e.option[t] >= value.options[t].length))) return helpers.message("Invalid recommendation option")
      return value
    })
  ,

  update:
    Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      avatar: Joi.string(),
      images: Joi.array().min(1).items(Joi.string()),
      price: Joi.number().min(0),
      category: Joi.string(),
      designer: Joi.string(),
      room: Joi.string(),
      inventoryAmount: Joi.number().integer().min(0),
      options: Joi.object().pattern(Joi.string(), Joi.array().min(2).items(Joi.object({
        name: Joi.string().required(),
        avatar: Joi.string().required(),
        price: Joi.number().min(0).required()
      }).unknown(false))),
      recommendations: Joi.array().items(Joi.object({
        avatar: Joi.string().required(),
        name: Joi.string().required(),
        option: Joi.object().pattern(Joi.string(), Joi.number().integer().min(0))
      }).unknown(false))
    }).unknown(false).required()
}

class Controller {
  find = async (req, res, next) => {
    try {
      const query = JSON.parse(req.query.q)
      const page = Number.parseInt(req.query.page)
      const limit = Number.parseInt(req.query.limit)
      const products = await Product.find(query).skip(page * limit).limit(limit).select(["_id", "name", "avatar", "designer",])
      const length = await Product.countDocuments(query)
      redis.json.set(req.originalUrl, '$', products)
      res.status(200).json({ status: 200, data: { products, hasMore: length > (page + 1) * limit } })
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      const cache = await redis.json.get('products:' + req.params.id)
      if (cache) return res.status(200).json({ status: 200, data: cache })
      const product = await Product.findById(req.params.id)
      if (!product) throw new E(`Product ${req.params.id} not found`, 400)
      redis.json.set('products:' + req.params.id, '$', product)
      res.status(200).json({ status: 200, data: product })
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      await Product.findByIdAndUpdate(req.params.id, { isDeleted: true })
      redis.json.set('products:' + req.params.id, '$.isDeleted', true)
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  updateById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Product.findByIdAndUpdate(req.params.id, payload)
      redis.json.mSet(Object.entries(payload).map(([a, b]) => { return { key: 'products:' + req.params.id, path: '$.' + a, value: b } }))
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = { ...await VALIDATORS.create.validateAsync(req.body), isDeleted: false }
      await Product.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  summary1 = async (req, res, next) => {
    try {
      const designers = await Designer.find({})
      const categories = await Category.find({})
      const rooms = await Room.find({})
      const products = await Product.find({})
      const data = [{ labels: [], datasets: [{ data: [] }] }, { labels: [], datasets: [{ data: [] }] }, { labels: [], datasets: [{ data: [] }] }]
      designers.forEach(e => {
        data[0].labels.push(e.name)
        data[0].datasets[0].data.push(products.filter(t => t.designer == e._id).length)
      })
      categories.forEach(e => {
        data[1].labels.push(e.name)
        data[1].datasets[0].data.push(products.filter(t => t.category == e._id).length)
      })
      rooms.forEach(e => {
        data[2].labels.push(e.name)
        data[2].datasets[0].data.push(products.filter(t => t.room == e._id).length)
      })
      res.status(200).json({ status: 200, data: data })
    } catch (error) {
      next(error)
    }
  }

  init = async () => {
    const arr = [
      {
        "name": "ACX Mesh",
        "description": "ACX Mesh differs from the two other models in the task chair family ACX Light und Soft in that its backrest has a knitted fabric cover. This semi-transparent mesh textile is made of recycled polyester and comes in a choice of seven colours which combined with either a dark or light frame enables numerous variants. The seat cover can be selected in a complementary knitted fabric or in the textile Plano.",
        "price": 990.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Embody Chair",
        "description": "The Embody Chair is designed to enhance your health and performance. It features a dynamic matrix of pixels that automatically conforms to your every movement, distributing your weight evenly and reducing pressure on your spine. The breathable backrest and seat keep you cool and comfortable, even during long hours of sitting.",
        "price": 1799.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Aeron Chair",
        "description": "A classic ergonomic chair, the Aeron Chair features a breathable pellicle suspension that conforms to your body, providing support and comfort. Its adjustable arms, seat height, and lumbar support allow you to customize the chair to your specific needs.",
        "price": 1295.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Cosm Chair",
        "description": "The Cosm Chair is designed for effortless comfort. Its sophisticated Auto-Harmonic Tilt mechanism responds to your body weight and posture, providing a balanced and supportive sit. The flexible frame and breathable mesh material ensure all-day comfort.",
        "price": 1095.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Gesture Chair",
        "description": "The Gesture Chair is designed to support the widest range of postures. Its 3D LiveBack technology mimics the natural movement of your spine, while its adjustable arms, seat depth, and height allow for a truly personalized fit.",
        "price": 1199.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Mirra 2 Chair",
        "description": "The Mirra 2 Chair is an elegant and responsive chair that moves with you. Its flexible loop spine and adjustable lumbar support provide dynamic back support, while its breathable mesh material keeps you cool and comfortable.",
        "price": 895.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Sayl Chair",
        "description": "Inspired by suspension bridges, the Sayl Chair offers balanced support with a lightweight design. Its 3D Intelligent suspension back allows for freedom of movement, while its adjustable arms and seat height provide a customized fit.",
        "price": 695.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Steelcase Leap Chair",
        "description": "The Steelcase Leap Chair is a highly adjustable chair designed to provide all-day comfort and support. Its LiveBack technology mimics the natural movement of your spine, while its adjustable lumbar support, seat depth, and armrests allow for a personalized fit.",
        "price": 999.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Haworth Zody Chair",
        "description": "The Haworth Zody Chair is a highly ergonomic chair that has been endorsed by the American Physical Therapy Association. It features asymmetrical lumbar adjustments, pelvic support, and adjustable armrests to provide customized support and comfort.",
        "price": 799.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Humanscale Freedom Chair",
        "description": "The Humanscale Freedom Chair is designed to disappear beneath you, providing effortless support and comfort. Its weight-sensitive recline mechanism automatically adjusts to your body weight, while its synchronous armrests move with you, providing constant support.",
        "price": 1099.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Standing Desk",
        "description": "A height-adjustable desk that allows you to switch between sitting and standing throughout the day, promoting better posture and increased energy levels.",
        "price": 599.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Ergonomic Keyboard",
        "description": "A keyboard designed to reduce strain on your wrists and hands, with a split or curved layout and adjustable height settings.",
        "price": 150.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Vertical Mouse",
        "description": "A mouse that positions your hand in a more natural handshake position, reducing strain on your wrist and forearm.",
        "price": 80.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Monitor Arm",
        "description": "A mount that allows you to adjust the height and angle of your monitor, promoting a more ergonomic viewing position.",
        "price": 50.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Footrest",
        "description": "A platform for your feet that improves posture and circulation while sitting.",
        "price": 30.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Laptop Stand",
        "description": "Elevates your laptop to eye level, promoting better posture and reducing neck strain. Many models are adjustable for personalized height and angle preferences.",
        "price": 40.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Blue Light Blocking Glasses",
        "description": "Filter out harmful blue light emitted from screens, reducing eye strain, headaches, and sleep disturbances.",
        "price": 30.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Ergonomic Wrist Rest",
        "description": "Provides support for your wrists while typing or using a mouse, reducing pressure and promoting neutral wrist alignment.",
        "price": 20.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Back Cushion",
        "description": "Offers lumbar support while sitting, promoting proper posture and reducing back pain. Different shapes and sizes cater to various body types and needs.",
        "price": 35.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Under Desk Bike Pedal Exerciser",
        "description": "Allows you to engage in low-impact exercise while sitting at your desk, improving circulation and leg strength.",
        "price": 70.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Balance Ball Chair",
        "description": "Replaces your traditional chair, engaging core muscles and improving balance while sitting. Some models come with a stability ring or backrest for added support.",
        "price": 60.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Kneeling Chair",
        "description": "Promotes an upright posture by tilting your pelvis forward, reducing strain on your back and improving core strength.",
        "price": 80.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      },
      {
        "name": "Anti-Fatigue Mat",
        "description": "Provides cushioning and support for your feet while standing, reducing fatigue and discomfort, especially on hard surfaces.",
        "price": 50.00,
        "avatar": "https://static.vitra.com/media-resized/VbMTotwa9f_zG87VZwUMd5F3S7dv-LSFVieJrE38Ur4/fill/750/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMjk0NDkvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83NzgwNTQ5OS5qcGc.jpg",
        "images": [
          "https://static.vitra.com/media/asset/8849309/storage/v_parallax_1920x1080/82357905.jpg",
          "https://static.vitra.com/media/asset/8898953/storage/v_parallax_1920x1080/82505419.jpg",
          "https://static.vitra.com/media/asset/8849310/storage/v_parallax_1920x1080/82358003.jpg",
          "https://static.vitra.com/media/asset/8953018/storage/v_parallax_1920x1080/82678400.jpg"
        ],
        "options": {
          "model": [
            {
              "name": "ACX Mesh",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_mesh_.png",
              "price": 1
            },
            {
              "name": "ACX Light",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_light_.png",
              "price": 2
            },
            {
              "name": "ACX Soft",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/prod_acx_soft_.png",
              "price": 3
            }
          ],
          "base on": [
            {
              "name": "hard castors, braked, for carpet",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_hard_castor_carpetfloor_.png",
              "price": 2
            },
            {
              "name": "soft castors, braked, for hard floor",
              "avatar": "https://static.vitra.com/OFML/data/wRbGxP50hhnyzUDt1ZL7hg/vitra/material/ANY/1/mat/svg_soft_castor_hardfloor_.png",
              "price": 4
            }
          ]
        },
        "recommendations": [
          {
            "name": "Recommend Product 1",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=07;43300200.BZF_KME_03=07;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=12;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 0,
              "base on": 0
            },
            "_id": "66af90fdaa3edf6e464c63ee"
          },
          {
            "name": "Recommend Product 2",
            "avatar": "https://static.vitra.com/products/43300200/43300200.ACXLUM100=02;43300200.ACXBEZ100=0590_KME;43300200.BZF_GKN_02=01;43300200.BZF_KME_03=01;43300200.ACXMEC100=12;43300200.ACXSIT100=21;43300200.ACXFAB100=53;43300200.ACXARM100=33;43300200.ACXUNG100=41;43300200.ACXFUS100=02;43300200.ACXVEP100=52.jpg",
            "option": {
              "model": 1,
              "base on": 1
            },
            "_id": "66af90fdaa3edf6e464c63ef"
          }
        ],
        "inventoryAmount": 1000,
      }
    ]
    const _id1 = (await Designer.find({})).map(e => e._id)
    const _id2 = (await Category.find({})).map(e => e._id)
    const _id3 = (await Room.find({})).map(e => e._id)

    arr.forEach(e => {
      e.designer = _id1[Math.floor(Math.random() * _id1.length)]
      e.category = _id2[Math.floor(Math.random() * _id2.length)]
      e.room = _id3[Math.floor(Math.random() * _id3.length)]
    })

    await Product.insertMany(arr)
  }
}


module.exports = new Controller()
