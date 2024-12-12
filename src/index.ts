import { useEffect } from 'react'
import parse from 'unstring'
import emitStorageEvent from './emitStorageEvent'
import onReceiveStorageEvent from './onReceiveStorageEvent'

const stringify = <T>(value: T) => {
  try {
    const stringifiedValue = JSON.stringify(value)
    return stringifiedValue
  } catch(e) {
    return JSON.stringify({})
  }
}

/**
 * Set an item in localStorage
 * 
 * Emit teh update to other tabs 
 * 
 * @param k string item key 
 * @param v parsed item value 
 */
const update = <T>(k: string, v: T) => {
  const stringifiedValue = stringify<T>(v)
  localStorage.setItem(k, stringifiedValue)
  emitStorageEvent(k, stringifiedValue)
}

/**
 * Read an item from localStorage
 * 
 * @param k localStorage key
 * @returns parsed item value 
 */
const read = <T>(k: string): T => {
  const stringifiedValue = localStorage.getItem(k) || ''
  return parse(stringifiedValue)
}

/**
 * Remove an item from localStorage
 * 
 * @param k localStorage key 
 */
const remove = (k: string) => {
  localStorage.removeItem(k)
  emitStorageEvent(k, '')
}

/**
 * Interact with localStorage 
 * 
 * Emit storage events to other tabs
 */
const useLocalStorage = <T, Cb extends Function>(cb: Cb) => () => {
  useEffect(() => {
    const receieveEvent = onReceiveStorageEvent<T>(cb)
    window.addEventListener("storage", receieveEvent)
    return () => window.removeEventListener("storage", receieveEvent)
  }, [])

  return {
    read: (k: string) => read<T>(k),
    update: (k: string, value: T) => update<T>(k, value),
    remove
  }
}

export default useLocalStorage