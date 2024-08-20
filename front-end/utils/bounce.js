const bounce = (time, fn) => {
  let id
  return (...args) => {
    if(id) clearTimeout(id)
    id = setTimeout(() => fn.apply(null, args), time)
  }
}

export default bounce