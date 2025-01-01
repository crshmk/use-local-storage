/**
 * TypeScript requires such a mess 
 */
import isAbsent from './isAbsent'
import parse from '../parse'
import { path, Path } from 'ramda'

/**
 * Read an namespace in localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */
const read = <NamespaceType extends ParsedObjectOrArray>(namespace: string): {
  (): NamespaceType | undefined
  <ValueType>(pathToProp: Path): ValueType | undefined
} => {
  return <ValueType>(pathToProp?: Path) => {
    const stringifiedNamespace = localStorage.getItem(namespace) || ''
    if (isAbsent(stringifiedNamespace)) return undefined
    const parsedNamespace = parse(stringifiedNamespace) as NamespaceType
    return !pathToProp ? parsedNamespace : path<ValueType>(pathToProp as Path, parsedNamespace)
}}

export default read 


