import { Path } from "types-ramda";
/**
 * Interact with namespaced localStorage
 *
 * Emit storage events to other tabs
 */
declare const useLocalStorage: <NamespaceType extends ParsedObjectOrArray>(namespace: string, eventCb?: Function) => {
    /**
    * Read a namespace in localStorage or a nested value at that namespace
    *
    * @param {unknown} value parsed item value
    * @param {(string | number)[]} path Ramda Path to nested prop
    */
    read: <ValueType>(pathToProp?: Path) => NamespaceType | ValueType;
    /**
     * Set a namespace in localStorage or a nested value at that namespace
     *
     * Emit the update to other tabs
     *
     * @param {unknown} value parsed item value
     * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
     */
    update: <ValueType>(value: ValueType, path?: Path) => void;
    /**
     * Remove a namespace from localStorage or a nested value at that namespace
     *
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop
     */
    unset: (pathToProp?: Path) => void;
};
export default useLocalStorage;

//# sourceMappingURL=index.d.ts.map
