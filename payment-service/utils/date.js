class DateUtils {
  getDateArr = (startAt, endAt) => {
    const startDate = new Date(startAt)
    const endDate = new Date(endAt)
    if (startDate > endDate) return []
    const arr = []
    while (startDate <= endDate) {
      arr.push(startDate.toLocaleDateString())
      startDate.setDate(startDate.getDate() + 1)
    }
    return arr
  }
}


module.exports = new DateUtils()