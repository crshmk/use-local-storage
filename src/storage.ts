import { useEffect } from 'react'
import parse from 'unstring'
import emitStorageEvent from './emitStorageEvent'
import onReceiveStorageEvent from './onReceiveStorageEvent'

const stringify = <T>(value: T, defaultValue: T) => {
  try {
    const stringifiedValue = JSON.stringify(value)
    return stringifiedValue
  } catch(e) {
    const stringifiedDefaultValue = JSON.stringify(defaultValue)
    return stringifiedDefaultValue
  }
}

const update = <T>(k: string, v: T, defaultValue: T) => {
  const stringifiedValue = stringify(v, defaultValue)
  localStorage.setItem(k, stringifiedValue)
  emitStorageEvent(k, stringifiedValue)
}

const read = <T>(k: string): T => {
  const stringifiedValue = localStorage.getItem(k) as string
  return parse(stringifiedValue)
}

const remove = (k: string) => {
  localStorage.removeItem(k)
  emitStorageEvent(k, '')
}

const useLocalStorage = () => {
  useEffect(() => {
    //const onSetStorage = onReceiveStorageEvent(setValue, defaultValue)
   // window.addEventListener("storage", onSetStorage)
   // return () => window.removeEventListener("storage", onSetStorage)
  }, [])

  return {
    read,
    update,
    remove
  }
}

export default useLocalStorage

