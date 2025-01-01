import { Path } from 'ramda';
/**
 * Read an namespace in localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */
declare const read: <NamespaceType extends ParsedObjectOrArray>(namespace: string) => {
    (): NamespaceType | undefined;
    <ValueType>(pathToProp: Path): ValueType | undefined;
};
export default read;
