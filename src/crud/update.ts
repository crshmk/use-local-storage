import read from './read'

import { isNil, lensPath, set, Path } from 'ramda'
import stringify from '../stringify'

/**
 * Set an namespace in localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */
const update = <NamespaceType extends ParsedObjectOrArray>(namespace: string): {
  (value: NamespaceType): void
  <ValueType>(value: ValueType, path: Path): void
} => {
  return <ValueType>(value: ValueType, path?: Path): void => {
    const currentNamespace = read<NamespaceType>(namespace)()
    const updatedNamespaceValue = isNil(path) ? value : set(lensPath(path), value, currentNamespace)
    const stringifiedNamespace = stringify(updatedNamespaceValue)
    if(!stringifiedNamespace) return 
    localStorage.setItem(namespace, stringifiedNamespace)
  }
}

export default update