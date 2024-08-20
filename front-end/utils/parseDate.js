const parseDate = str => {
  return new Date(str).toLocaleString({ language: 'vi'}, { hourCycle: 'h24',})
}

export default parseDate