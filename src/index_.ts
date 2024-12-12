import { useEffect, useRef, useState } from 'react'

import initializeFromStorage from './initializeFromStorage'
import onReceiveStorageEvent from './onReceiveStorageEvent'
import setAndEmitValue from './setAndEmitValue'

import stringify from 'pretty-format'
import parse from 'unstring'

/**
 * React hook to interact with localStorage 
 * - Emits / receives storage events to / from other tabs 
 * 
 * @param key string 
 * @param defaultValue T
 * @return [value ,setValue]
 */
const useLocalStorage = <T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {

  const [value, setValue] = useState<T>(defaultValue)
  const prev = useRef<string>(null)

  useEffect(() => {
    const storedValue: string = window.localStorage.getItem(key) as string 
    const parsedValue = parse(storedValue)
    const newValue = parsedValue || defaultValue 
    const stringifiedValue = JSON.stringify(newValue)
    localStorage.setItem(key, stringifiedValue)
    setAndEmitValue<T>(key, stringifiedValue)
    prev.current = stringifiedValue
  }, [])

  useEffect(() => {
    const stringifiedValue = JSON.stringify(value) 
    if(stringifiedValue === prev.current) return    
    setAndEmitValue<T>(key, stringifiedValue)
    prev.current = stringifiedValue
  }, [value])
  
  useEffect(() => {
    const onSetStorage = onReceiveStorageEvent(setValue, defaultValue)
    window.addEventListener("storage", onSetStorage)
    return () => window.removeEventListener("storage", onSetStorage)
  }, [key])

  return [value, setValue]
}

export default useLocalStorage