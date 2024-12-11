import emitStorageEvent from './emitStorageEvent'
import stringify from 'pretty-format'

let cachedValue: unknown = undefined

/**
 * Set the value in the localStorage of this tab
 * 
 * Emit the value to be set in other tabs
 * 
 * @param key string
 * @param value T
 */
const setAndEmitValue = <T>(key: string, value: string) => {
  if(cachedValue !== value) {
    localStorage.setItem(key, value)
    cachedValue = value
    //emitStorageEvent(key, stringifiedValue)
  }

}

export default setAndEmitValue