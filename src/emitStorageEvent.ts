type StorageEventConfig = {
  storageArea: Storage 
  url: string 
  key: string 
  newValue?: string 
}

const emitStorageEvent = (key: string, stringifiedValue?: string) => {
  const config: StorageEventConfig = {
    storageArea: window.localStorage,
    url: window.location.href,
    key
  }
  
  if(stringifiedValue !== undefined) {
    config.newValue = stringifiedValue
  }

  const storageEvent = new StorageEvent("storage", config)
  window.dispatchEvent(storageEvent)
}

export default emitStorageEvent