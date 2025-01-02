import parse from './parse'

/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */
const receiveStorageEvent = (onStorageCb: Function, emptyValue:ParsedObjectOrArray ) => (e: StorageEvent) => {
  const newValue = !e.newValue ? emptyValue : parse(e.newValue)
  debugger
  onStorageCb(newValue)
}

export default receiveStorageEvent