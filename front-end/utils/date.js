const parseDate = str => {
  return new Date(str).toLocaleString({}, { hourCycle: 'h24', })
}

const getDateArr = (startedAt, endedAt) => {
  const startDate = new Date(startedAt)
  const endDate = new Date(endedAt)
  const arr = []
  while (startDate <= endDate) {
    arr.push(startDate.toLocaleDateString())
    startDate.setDate(startDate.getDate() + 1)
  }
  return arr
}

export { parseDate, getDateArr }