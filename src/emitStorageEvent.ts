type StorageEventConfig = {
  storageArea: Storage 
  url: string 
  key: string 
  newValue?: string | null
}

const emitStorageEvent = (key: string, stringifiedValue?: string | null) => {
  const config: StorageEventConfig = {
    storageArea: window.localStorage,
    url: window.location.href,
    key,
    newValue: stringifiedValue
  }
  
  const storageEvent = new StorageEvent("storage", config)
  window.dispatchEvent(storageEvent)
}

export default emitStorageEvent