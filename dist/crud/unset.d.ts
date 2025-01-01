import { Path } from 'ramda';
/**
 * Remove a namespace from localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */
declare const unset: (namespace: string) => {
    (): void;
    (pathToProp?: Path): void;
};
export default unset;
