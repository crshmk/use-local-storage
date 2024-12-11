import parse from 'unstring'

/**
 * Initialize the hook state with the current value in localStorage
 * 
 * @param key 
 * @param defaultValue 
 * @returns void
 */
const initializeFromStorage = <T>(key: string, defaultValue: T) => () => {
  debugger
  if (typeof window === "undefined") return defaultValue;

  try {
    const val = window.localStorage.getItem(key)
    if(!val) return defaultValue 
    return parse(val)
  } catch (e) {
    return defaultValue
  }
}

export default initializeFromStorage