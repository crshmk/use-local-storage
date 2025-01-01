import {useEffect as $hgUW1$useEffect} from "react";
import $hgUW1$unstring from "unstring";
import {path as $hgUW1$path, anyPass as $hgUW1$anyPass, isEmpty as $hgUW1$isEmpty, isNil as $hgUW1$isNil, dissocPath as $hgUW1$dissocPath, set as $hgUW1$set, lensPath as $hgUW1$lensPath} from "ramda";



/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ const $61f57676a9396065$var$receiveStorageEvent = (cb)=>(e)=>{
        if (typeof cb !== 'function') return;
        if (!e.newValue) return;
        const newValue = (0, $hgUW1$unstring)(e.newValue);
        if (newValue !== undefined) cb(newValue);
    };
var $61f57676a9396065$export$2e2bcd8739ae039 = $61f57676a9396065$var$receiveStorageEvent;


/**
 * TypeScript requires such a mess
 */ 

const $adb58637f2755f63$var$isAbsent = (0, $hgUW1$anyPass)([
    (0, $hgUW1$isEmpty),
    (0, $hgUW1$isNil)
]);
var $adb58637f2755f63$export$2e2bcd8739ae039 = $adb58637f2755f63$var$isAbsent;



/**
 * Read an namespace in localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ const $218826c4266cf93d$var$read = (namespace)=>{
    return (pathToProp)=>{
        const stringifiedNamespace = localStorage.getItem(namespace) || '';
        if ((0, $adb58637f2755f63$export$2e2bcd8739ae039)(stringifiedNamespace)) return undefined;
        const parsedNamespace = (0, $hgUW1$unstring)(stringifiedNamespace);
        return !pathToProp ? parsedNamespace : (0, $hgUW1$path)(pathToProp, parsedNamespace);
    };
};
var $218826c4266cf93d$export$2e2bcd8739ae039 = $218826c4266cf93d$var$read;


const $3d50c98fd8d027f6$var$emitStorageEvent = (key, stringifiedValue)=>{
    const config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key,
        newValue: stringifiedValue
    };
    const storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $3d50c98fd8d027f6$export$2e2bcd8739ae039 = $3d50c98fd8d027f6$var$emitStorageEvent;







const $0544f1dd1025833f$var$stringify = (value)=>{
    try {
        const stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
    } catch (e) {
        return undefined;
    }
};
/**
 * Set an namespace in localStorage or a nested value at that namespace
 *
 * Emit the update to other tabs
 *
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ const $0544f1dd1025833f$var$update = (namespace)=>{
    return (value, path)=>{
        const currentNamespace = (0, $218826c4266cf93d$export$2e2bcd8739ae039)(namespace)();
        const updatedNamespaceValue = (0, $hgUW1$isNil)(path) ? value : (0, $hgUW1$set)((0, $hgUW1$lensPath)(path), value, currentNamespace);
        const stringifiedNamespace = $0544f1dd1025833f$var$stringify(updatedNamespaceValue);
        if ((0, $adb58637f2755f63$export$2e2bcd8739ae039)(stringifiedNamespace)) return;
        localStorage.setItem(namespace, stringifiedNamespace);
        (0, $3d50c98fd8d027f6$export$2e2bcd8739ae039)(namespace, stringifiedNamespace);
    };
};
var $0544f1dd1025833f$export$2e2bcd8739ae039 = $0544f1dd1025833f$var$update;




/**
 * Remove a namespace from localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ const $54bf75e0ecf09f50$var$unset = (namespace)=>{
    return (pathToProp)=>{
        if ((0, $adb58637f2755f63$export$2e2bcd8739ae039)(pathToProp)) {
            localStorage.removeItem(namespace);
            (0, $3d50c98fd8d027f6$export$2e2bcd8739ae039)(namespace, null);
            return;
        }
        const namespaceValue = (0, $218826c4266cf93d$export$2e2bcd8739ae039)(namespace)();
        const newNamespaceValue = (0, $hgUW1$dissocPath)(pathToProp, namespaceValue);
        (0, $0544f1dd1025833f$export$2e2bcd8739ae039)(namespace)(newNamespaceValue);
    };
};
var $54bf75e0ecf09f50$export$2e2bcd8739ae039 = $54bf75e0ecf09f50$var$unset;



/**
 * Interact with namespaced localStorage
 *
 * Emit storage events to other tabs
 */ const $2df9d79b6788b58e$var$useLocalStorage = (namespace, eventCb)=>{
    (0, $hgUW1$useEffect)(()=>{
        const onStore = (0, $61f57676a9396065$export$2e2bcd8739ae039)(eventCb);
        window.addEventListener('storage', onStore);
        return ()=>window.removeEventListener('storage', onStore);
    }, []);
    return {
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
        */ read: (0, $218826c4266cf93d$export$2e2bcd8739ae039)(namespace),
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
         */ update: (0, $0544f1dd1025833f$export$2e2bcd8739ae039)(namespace),
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
         */ unset: (0, $54bf75e0ecf09f50$export$2e2bcd8739ae039)(namespace)
    };
};
var $2df9d79b6788b58e$export$2e2bcd8739ae039 = $2df9d79b6788b58e$var$useLocalStorage;


export {$2df9d79b6788b58e$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
