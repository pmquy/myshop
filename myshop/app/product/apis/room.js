const rooms = [
  { name: 'Bar', _id: 0 },
  { name: 'Cafeteria', _id: 1 },
  { name: 'Children', _id: 2 },
  { name: 'Dining Room', _id: 3 },
  { name: 'Focus', _id: 4 },
  { name: 'Home Office', _id: 5 },
  { name: 'Library', _id: 6 },
  { name: 'Living Room', _id: 7 },
  { name: 'Lounge', _id: 8 },
  { name: 'Meeting', _id: 9 },
  { name: 'Outdoor', _id: 10 },
  { name: 'Welcome Area', _id: 11 },
  { name: 'Workshop', _id: 12 },
  { name: 'Workspace', _id: 13 },
]
class Api {
  get = async query => {
    return rooms
  }

  getById = async id => {
    return rooms.filter(e => e._id == id)
  }

  findOne = async query => {
    return rooms.filter(e => Object.keys(query).every(key => query[key] == e[key]))[0]
  }
  
}

export default new Api()