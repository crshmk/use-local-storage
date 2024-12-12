import emitStorageEvent from '../emitStorageEvent'
import read from './read'
import update from './update'

import isAbsent from './isAbsent'
import { dissocPath } from 'ramda'

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

export default unset