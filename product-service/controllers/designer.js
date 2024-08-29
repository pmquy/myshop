const { Designer } = require('../models')
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
      const designers = await Designer.find(query).select(["_id", "name"])
      res.status(200).json({ status: 200, data: designers })
    } catch (error) {
      next(error)
    }
  }

  findById = async (req, res, next) => {
    try {
      const designer = await Designer.findById(req.params.id)
      res.status(200).json({ status: 200, data: designer })
    } catch (error) {
      next(error)
    }
  }

  deleteById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      await Designer.findByIdAndUpdate(req.params.id, { isDeleted: true })
      res.status(200).json({ status: 200, data: "Deleted" })
    } catch (error) {
      next(error)
    }
  }

  updateById = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = await VALIDATORS.update.validateAsync(req.body)
      await Designer.findByIdAndUpdate(req.params.id, payload)
      res.status(200).json({ status: 200, data: "Updated" })
    } catch (error) {
      next(error)
    }
  }

  create = async (req, res, next) => {
    try {
      if (req.user?.role != 'Admin') throw new E('Invalid account', 403)
      const payload = { ...await VALIDATORS.create.validateAsync(req.body), isDeleted: false }
      await Designer.create(payload)
      res.status(200).json({ status: 200, data: "Created" })
    } catch (error) {
      next(error)
    }
  }

  init = async () => {
    const arr = [
      {
        "name": "Coco Chanel",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A French fashion designer and businesswoman, known for her iconic designs that revolutionized women's fashion in the 20th century. Her signature style emphasized simplicity, elegance, and timeless pieces."
      },
      {
        "name": "Yves Saint Laurent",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A French fashion designer known for his innovative and groundbreaking designs. He introduced the tuxedo suit for women and popularized the safari jacket, making a significant impact on modern fashion."
      },
      {
        "name": "Christian Dior",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A French fashion designer who founded the House of Dior, known for its luxurious and feminine designs. He is credited with creating the 'New Look' silhouette, which emphasized a cinched waist and full skirt."
      },
      {
        "name": "Giorgio Armani",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An Italian fashion designer known for his minimalist and sophisticated designs. He is renowned for his tailored suits, power dressing, and use of luxurious fabrics."
      },
      {
        "name": "Karl Lagerfeld",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A German fashion designer who served as the creative director of Chanel and Fendi for decades. He was known for his innovative designs, his signature ponytail, and his sharp wit."
      },
      {
        "name": "Alexander McQueen",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A British fashion designer known for his dramatic and avant-garde designs. He pushed the boundaries of fashion with his theatrical runway shows and his innovative use of materials."
      },
      {
        "name": "Vivienne Westwood",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A British fashion designer known for her punk-inspired designs and her activism. She is considered a pioneer of the punk and new wave movements in fashion."
      },
      {
        "name": "Rei Kawakubo",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A Japanese fashion designer known for her avant-garde and deconstructive designs. She founded the Comme des Garçons label, which is known for its experimental and often unconventional pieces."
      },
      {
        "name": "Dries Van Noten",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A Belgian fashion designer known for his eclectic and sophisticated designs. He is known for his use of rich colors, textures, and patterns, and his ability to blend different styles."
      },
      {
        "name": "Stella McCartney",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A British fashion designer known for her sustainable and ethical designs. She is a vegetarian and uses only cruelty-free materials in her collections."
      },
      {
        "name": "Marc Jacobs",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An American fashion designer known for his playful and eclectic designs. He is known for his work at Louis Vuitton and his own eponymous label."
      },
      {
        "name": "Tom Ford",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An American fashion designer known for his sleek and glamorous designs. He is known for his work at Gucci and his own eponymous label."
      },
      {
        "name": "Alexander Wang",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An American fashion designer known for his edgy and street-inspired designs. He is known for his use of bold colors, graphic prints, and innovative silhouettes."
      },
      {
        "name": "Phoebe Philo",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A British fashion designer known for her minimalist and sophisticated designs. She is known for her work at Chloé and Céline."
      },
      {
        "name": "Miuccia Prada",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An Italian fashion designer known for her innovative and often avant-garde designs. She is known for her work at Prada and Miu Miu."
      },
      {
        "name": "Donatella Versace",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An Italian fashion designer known for her glamorous and bold designs. She is known for her work at Versace."
      },
      {
        "name": "Ralph Lauren",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An American fashion designer known for his preppy and classic designs. He is known for his work at Polo Ralph Lauren."
      },
      {
        "name": "Diane von Furstenberg",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A Belgian-American fashion designer known for her iconic wrap dress. She is known for her work at her eponymous label."
      },
      {
        "name": "Vera Wang",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "An American fashion designer known for her elegant and romantic bridal gowns. She is known for her work at her eponymous label."
      },
      {
        "name": "Oscar de la Renta",
        "images": ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg'],
        "avatar": "https://static.vitra.com/media-resized/ysErZiabIM-Fd4MAuieCGs5gcj2PUTBXm6zbJROPJNo/fill/0/1020/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0Lzg2ODIyNzQvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC84MTM4NTU3MC5qcGc.jpg",
        "description": "A Dominican-American fashion designer known for his luxurious and feminine designs. He is known for his work at his eponymous label."
      }
    ]
    await Designer.insertMany(arr)
  }
}


module.exports = new Controller()

