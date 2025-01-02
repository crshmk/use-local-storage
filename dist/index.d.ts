/**
 * Interact with namespaced localStorage
 *
 * Emit storage events to other tabs
 */
declare const useLocalStorage: <NamespaceType extends ParsedObjectOrArray>(namespace: string, onStorageCb?: (newValue: NamespaceType) => any, emptyValue?: ParsedObjectOrArray | undefined) => {
    /**
    * Read a namespace in localStorage or a nested value at that namespace
    *
    * @param {unknown} value parsed item value
    * @param {(string | number)[]} path Ramda Path to nested prop
    * @returns value in localStorage at path
    *
    * @example
    *   get the value at localStorage.user.preferences.isDarkMode
    *  ```
    *   const userStorage = useLocalStorage('user')
    *
    *   userStorage.read<boolean>(['preferences', 'isDarkMode'])
    * ```
    *
    * get the entire user
    * ```
    *   userStorage.read()
    * ```
    *
    */
    read: {
        (): NamespaceType;
        <ValueType>(pathToProp: import("types-ramda").Path): ValueType;
    };
    /**
     * Set a namespace in localStorage or a nested value at that namespace
     *
     * Emit the update to other tabs
     *
     * @param {unknown} value parsed item value
     * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
     * @return void
     * @example
     *   set `user.preferences.isDarkMode`
     * ```
     *   const userStorage = useLocalStorage<User>('user')
     *
     *   userStorage.update<boolean>(['preferences', 'isDarkMode'], true)
     * ```
     * update entire user
     * ```
     *   userStorage.update<User>(newUser)
     * ```
     *
     */
    update: {
        (value: NamespaceType): void;
        <ValueType>(value: ValueType, path: import("types-ramda").Path): void;
    };
    /**
     * Remove a namespace from localStorage or a nested value at that namespace
     *
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop
     * @example
     * remove preferences from storage
     * ```
     *   const userStorage = useLocalStorage<User>('user')
     *
     *   userStorage.unset(['preferences', 'isDarkMode'])
     * ```
     * remove the entire user from storage
     * ```
     *   userStorage.unset()
     * ```
     *
     */
    unset: {
        (): void;
        (pathToProp?: import("types-ramda").Path): void;
    };
};
export default useLocalStorage;
