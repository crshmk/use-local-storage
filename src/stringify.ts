const stringify = (value: unknown) => {
  try {
    const stringifiedValue = JSON.stringify(value)
    return stringifiedValue
  } catch(e) {
    return undefined
  }
}

export default stringify