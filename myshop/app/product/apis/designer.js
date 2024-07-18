const designers = [
  {
    name: 'Alberto Meda',
    _id: 0,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Alexander Girard',
    _id: 1,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Antonio Citterio',
    _id: 2,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Arik Levy',
    _id: 3,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Charles & Ray Eames',
    _id: 4,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Charles Eames & Eero Saarinen',
    _id: 5,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Design: Verner Panton',
    _id: 6,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Dorothee Becker',
    _id: 7,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Edward Barber & Jay Osgerby',
    _id: 8,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Frank Gehry',
    _id: 9,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Front',
    _id: 10,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'George Nelson',
    _id: 11,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Hans Coray',
    _id: 12,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Hella Jongerius',
    _id: 13,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Isamu Noguchi',
    _id: 14,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Jasper Morrison',
    _id: 15,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Jean Prouvé',
    _id: 16,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Julie Richoz',
    _id: 17,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Konstantin Grcic',
    _id: 18,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Maarten Van Severen',
    _id: 19,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Michel Charlot',
    _id: 20,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Norman Foster',
    _id: 21,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Raw-Edges',
    _id: 22,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Ronan & Erwan Bouroullec',
    _id: 23,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Sori Yanagi',
    _id: 24,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Stephan Hürlemann',
    _id: 25,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Thélonious Goupil',
    _id: 26,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Verner Panton',
    _id: 27,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Vitra',
    _id: 28,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
  {
    name: 'Vitra Design Museum  ',
    _id: 29,
    description: 'The architect and designer Antonio Citterio, who lives and works in Milan, has collaborated with Vitra since 1988. Together they have produced a series of office chairs and various office systems, as well as products for the Vitra Home Collection. The Citterio Collection is constantly being expanded.',
    avatar: 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg',
    images: ['https://static.vitra.com/media-resized/QJBDCxdoHt0RDgdY7F4hyJEkJ0A-2onSIwXVk4hfhfc/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NDk5NjIvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNjg2ODYyNy5qcGc.jpg', 'https://static.vitra.com/media-resized/tF_jfrceHTgUMzp0AMkUYudFPLGVIy0U0qaAh0lpco4/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE4NDYxNTUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8yMzUxOTY1My5qcGc.jpg', 'https://static.vitra.com/media-resized/H2dlVYMC4enZRk80iCnQcCaigV4Tp18ObIBUZ43qRc8/fill/700/0/ce/0/aHR0cHM6Ly9zdGF0aWMudml0cmEuY29tL21lZGlhL2Fzc2V0LzE1NjM0NjUvc3RvcmFnZS92X2Z1bGxibGVlZF8xNDQweC8xNzA2ODA2OS5qcGc.jpg']
  },
]

class Api {
  get = async query => {
    return designers
  }

  getById = async id => {
    return designers.filter(e => e._id == id)
  }

  findOne = async query => {
    return designers.filter(e => Object.keys(query).every(key => query[key] == e[key]))[0]
  }
}

export default new Api()