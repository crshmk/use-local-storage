type StorageEventConfig = {
  storageArea: Storage 
  url: string 
  key: string 
  newValue?: string | null
}

const emitStorageEvent = (key: string, stringifiedValue?: string) => {
  const newValue = !stringifiedValue ? null : stringifiedValue
  const config: StorageEventConfig = {
    storageArea: window.localStorage,
    url: window.location.href,
    key,
    newValue 
  }
  
  const storageEvent = new StorageEvent("storage", config)
  window.dispatchEvent(storageEvent)
}

export default emitStorageEvent