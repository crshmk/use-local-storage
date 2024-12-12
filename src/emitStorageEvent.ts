const emitStorageEvent = (key, stringifiedValue) => {
  const config = {
    storageArea: window.localStorage,
    url: window.location.href,
    key,
    newValue: stringifiedValue
  }
  
  const storageEvent = new StorageEvent("storage", config)
  window.dispatchEvent(storageEvent)
}

export default emitStorageEvent