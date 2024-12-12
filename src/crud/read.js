import parse from 'unstring'
import isAbsent from './isAbsent'

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

export default read