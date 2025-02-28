import { Path } from 'ramda';
/**
 * Set an namespace in localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */
declare const update: <NamespaceType extends ParsedObjectOrArray>(namespace: string) => {
    (value: NamespaceType): void;
    <ValueType>(value: ValueType, path: Path): void;
};
export default update;
