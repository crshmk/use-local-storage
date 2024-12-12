import { useEffect } from 'react'

import parse from 'unstring'
import { 
  anyPass, 
  dissocPath, 
  isEmpty, 
  isNil, 
  lensPath, 
  path, 
  set 
} from 'ramda'
import emitStorageEvent from './emitStorageEvent'
import receiveStorageEvent from './receiveStorageEvent'

const isAbsent = anyPass([isEmpty, isNil])
const stringify = value => {
  try {
    const stringifiedValue = JSON.stringify(value)
    return stringifiedValue
  } catch(e) {
    return undefined
  }
}

/**
 * Set an namespace in localStorage or a nested value at that namespace
 * 
 * Emit the update to other tabs 
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */
const update = namespace => (value, path) => {
  const currentNamespace = read(namespace)()
  const updatedNamespaceValue = isNil(path) ? value : set(lensPath(path), value, currentNamespace)
  const stringifiedNamespace = stringify(updatedNamespaceValue)
  localStorage.setItem(namespace, stringifiedNamespace)
  emitStorageEvent(namespace, stringifiedNamespace)
}

/**
 * Read a namespace from localStorage or a nested value at that namespace
 * 
 * @param k localStorage key
 * @returns parsed item value 
 */


/**
 * Read an namespace in localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */
const read = namespace => pathToProp => {
  const stringifiedNamespace = localStorage.getItem(namespace) || ''
  if(isAbsent(stringifiedNamespace)) return undefined
  const parsedNamespace = parse(stringifiedNamespace)
  return isAbsent(pathToProp) ? parsedNamespace : path(pathToProp, parsedNamespace)
}
/**
 * Remove a namespace from localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
 */
const unset = namespace => pathToProp => {
  if(isAbsent(pathToProp)) {
    localStorage.removeItem(namespace)
    emitStorageEvent(namespace, null)
    return 
  }
  const namespaceValue = read(namespace)()
  const newNamespaceValue = dissocPath(pathToProp, namespaceValue)
  update(namespace)(newNamespaceValue)
}

/**
 * Interact with localStorage 
 * 
 * Emit storage events to other tabs
 */
const useLocalStorage = (namespace, eventCb) => {
  useEffect(() => {
   const onStore = receiveStorageEvent(eventCb)
   window.addEventListener("storage", onStore)
  return () => window.removeEventListener("storage", onStore)
  }, [])

  return {
     /**
     * Read a namespace in localStorage or a nested value at that namespace
     * 
     * @param {unknown} value parsed item value 
     * @param {(string | number)[]} path Ramda Path to nested prop 
     */
    read: read(namespace),
     /**
     * Set a namespace in localStorage or a nested value at that namespace
     * 
     * Emit the update to other tabs 
     * 
     * @param {unknown} value parsed item value 
     * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
     */
    update: update(namespace),
    /**
     * Remove a namespace from localStorage or a nested value at that namespace
     * 
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
     */
    unset: unset(namespace)
  }
}

module.exports = useLocalStorage