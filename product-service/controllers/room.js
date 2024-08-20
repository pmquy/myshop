const { Room } = require('../models')
const { E } = require('../utils')
const Joi = require('joi')

const VALIDATORS = {
  create: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    avatar: Joi.string().required(),
    images: Joi.array().items(Joi.string()).required()
  }).unknown(false).required(),

  update: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    avatar: Joi.string(),
    images: Joi.array().items(Joi.string())
  }).unknown(false).required()
}

class Controller {

  find = async (req, res, next) => {
    try {
      const rooms = await Room.find(JSON.parse(req.query.q)).select(["_id", "name"])
      res.status(200).json({ status: 200, data: rooms})
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      const room = await Room.findById(req.params.id)
      res.status(200).json({ status: 200, data: room })
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      await Room.findByIdAndDelete(req.params.id)
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  updateById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Room.findByIdAndUpdate(req.params.id, payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = await VALIDATORS.create.validateAsync(req.body)
      await Room.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  init = async () => {
    const arr = [
      {
        "name": "Bedroom",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "The room dedicated to sleep and relaxation, typically featuring a bed, nightstands, dresser, and closet."
      },
      {
        "name": "Living Room",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "The main social space in a home, often featuring a sofa, chairs, coffee table, TV, and entertainment system."
      },
      {
        "name": "Kitchen",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "The heart of the home, equipped with appliances like a stove, oven, refrigerator, dishwasher, and sink, as well as cabinets for storage."
      },
      {
        "name": "Bathroom",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A room for personal hygiene, typically including a shower or bathtub, toilet, sink, and mirror."
      },
      {
        "name": "Dining Room",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A space for formal or casual dining, featuring a dining table, chairs, and sometimes a buffet or sideboard."
      },
      {
        "name": "Office",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A dedicated workspace, often featuring a desk, chair, computer, and storage for documents and supplies."
      },
      {
        "name": "Laundry Room",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A room for washing and drying clothes, typically equipped with a washing machine, dryer, and sink."
      },
      {
        "name": "Garage",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A space for storing vehicles, tools, and other items, often attached to the house."
      },
      {
        "name": "Basement",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A lower level of the house, often used for storage, recreation, or as a finished living space."
      },
      {
        "name": "Attic",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "The uppermost level of the house, often used for storage or as a finished living space."
      },
      {
        "name": "Hallway",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A passageway connecting different rooms in a house, often featuring a floor runner, artwork, or a coat rack."
      },
      {
        "name": "Entryway",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "The first space you enter when coming into a home, often featuring a coat rack, shoe storage, and a mirror."
      },
      {
        "name": "Sunroom",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A room with large windows that allow natural light to flood in, often used for relaxation or gardening."
      },
      {
        "name": "Patio",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "An outdoor space adjacent to the house, often featuring a seating area, barbecue grill, and plants."
      },
      {
        "name": "Balcony",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "An outdoor space attached to a building, often featuring a railing and a view."
      },
      {
        "name": "Garden",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "An outdoor space for growing plants, flowers, and vegetables."
      },
      {
        "name": "Pool",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A body of water for swimming and recreation."
      },
      {
        "name": "Playroom",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A room designed for children's play, often featuring toys, games, and a soft floor."
      },
      {
        "name": "Guest Room",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A room intended for overnight guests, typically featuring a bed, dresser, and closet."
      },
      {
        "name": "Walk-in Closet",
        "avatar": "https://static.vitra.com/media-resized/D7qcFS09ByPFIvM_SooiMtLZ95IH8Mu7z8oIlsYnelQ/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzgwMDAwMjgvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC83Nzc5ODA2Ny5qcGc.jpg",
        "images": ["https://static.vitra.com/media/asset/8637913/storage/v_parallax_1920x1080/81015315.jpg", "https://static.vitra.com/media/asset/8631768/storage/v_parallax_1920x1080/80936268.jpg", "", "https://static.vitra.com/media/asset/8637914/storage/v_parallax_1920x1080/81015327.jpg"],
        "description": "A large closet with enough space to walk around inside, providing ample storage for clothing and accessories."
      }
    ]
    await Room.insertMany(arr)
  }
}


module.exports = new Controller()

