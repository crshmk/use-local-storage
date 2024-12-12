import emitStorageEvent from '../emitStorageEvent'
import read from './read'

import { isNil, lensPath, set } from 'ramda'

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

export default update