import parse from 'unstring'

/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */
const receiveStorageEvent = cb => e => {
  if(typeof cb !== 'function') return 
   
  if(!e.newValue) {
    return 
  }  

  const newValue = parse(e.newValue)
  if (newValue !== undefined) {
    cb(newValue)
  }
}

export default receiveStorageEvent