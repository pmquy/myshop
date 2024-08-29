const { Category } = require('../models')
const { E } = require('../utils')
const Joi = require('joi')

const VALIDATORS = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    avatar: Joi.string().required(),
    images: Joi.array().min(1).items(Joi.string()).required()
  }).unknown(false).required(),

  update: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    avatar: Joi.string(),
    images: Joi.array().min(1).items(Joi.string())
  }).unknown(false).required()
}

class Controller {

  find = async (req, res, next) => {
    try {
      const query = JSON.parse(req.query.q)
      const categories = await Category.find(query).select(["_id", "name"])
      res.status(200).json({ status: 200, data: categories })
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      const category = await Category.findById(req.params.id)
      res.status(200).json({ status: 200, data: category })
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      await Category.findByIdAndUpdate(req.params.id, { isDeleted: true })
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  updateById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Category.findByIdAndUpdate(req.params.id, payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = { ...await VALIDATORS.create.validateAsync(req.body), isDeleted: false }
      await Category.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  init = async () => {
    const arr = [
      {
        "name": "Fashion",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes clothing, accessories, footwear, and jewelry for men, women, and children. Covers a wide range of styles, from casual to formal, streetwear to haute couture."
      },
      {
        "name": "Technology",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Encompasses electronics, computers, software, gadgets, and other innovative devices. Includes categories like smartphones, laptops, tablets, wearables, and smart home devices."
      },
      {
        "name": "Home & Garden",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Covers products for the home, including furniture, decor, kitchenware, appliances, gardening tools, and outdoor furniture. Offers a wide range of styles and price points."
      },
      {
        "name": "Beauty & Personal Care",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes cosmetics, skincare, hair care, fragrances, and personal hygiene products. Offers a wide range of brands and products for all skin types and hair types."
      },
      {
        "name": "Books & Media",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Covers books, magazines, movies, music, and other forms of media. Includes categories like fiction, non-fiction, audiobooks, DVDs, and streaming services."
      },
      {
        "name": "Toys & Games",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes toys, games, puzzles, and other products for children and adults. Covers a wide range of age groups and interests."
      },
      {
        "name": "Sports & Outdoors",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes sports equipment, outdoor gear, fitness products, and apparel. Covers categories like running, cycling, swimming, camping, and hiking."
      },
      {
        "name": "Automotive",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes cars, trucks, motorcycles, and other vehicles. Also includes parts, accessories, and services for vehicles."
      },
      {
        "name": "Food & Beverage",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes groceries, snacks, beverages, and other food products. Covers categories like fresh produce, meat, dairy, and pantry staples."
      },
      {
        "name": "Travel",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes travel services, accommodations, flights, and other travel-related products. Covers categories like hotels, airlines, rental cars, and travel insurance."
      },
      {
        "name": "Health & Wellness",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes health supplements, vitamins, fitness equipment, and other products related to health and wellness. Covers categories like weight loss, immunity, and stress management."
      },
      {
        "name": "Arts & Crafts",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes art supplies, craft materials, and other products for creative pursuits. Covers categories like painting, drawing, sculpting, and jewelry making."
      },
      {
        "name": "Baby & Kids",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes products for babies and children, including clothing, toys, furniture, and other essentials. Covers categories like diapers, strollers, and car seats."
      },
      {
        "name": "Pets",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes pet food, toys, accessories, and other products for pets. Covers categories like dogs, cats, birds, and fish."
      },
      {
        "name": "Office Supplies",
        "avatar": "https://static.vitra.com/media-resized/NfC4_Aebx0IUAwLwRlRJUpORtztBNq5LFOxAJktx9x4/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzc5NjYxOTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc4NDcxNC5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/9171890/storage/v_parallax_1920x1080/83044271.jpg", "https://static.vitra.com/media/asset/8928713/storage/v_parallax_1920x1080/82645427.jpg", "https://static.vitra.com/media/asset/8906085/storage/v_parallax_1920x1080/82708523.jpg"],
        "description": "Includes office supplies, stationery, and other products for work and school. Covers categories like paper, pens, folders, and binders."
      }
    ]
    await Category.insertMany(arr)
  }
}


module.exports = new Controller()

