import {useEffect as $hgUW1$useEffect} from "react";
import {path as $hgUW1$path, anyPass as $hgUW1$anyPass, isEmpty as $hgUW1$isEmpty, isNil as $hgUW1$isNil, dissocPath as $hgUW1$dissocPath, set as $hgUW1$set, lensPath as $hgUW1$lensPath} from "ramda";


// value !== value -> NaN check
/**
 * Excludes the following from parsing:
 *  string, number, boolean, null, undefined, symbol NaN, function, bigint.
 *
 * Approves objects and arrays for parsing
 *
 * @param value any
 * @returns boolean
 */ const $89a0fa61e249632e$var$isObjectOrArray = (value)=>typeof value === 'object' && value !== null;
var $89a0fa61e249632e$export$2e2bcd8739ae039 = $89a0fa61e249632e$var$isObjectOrArray;


/**
 * Safely parse jason without explicit try / catch
 *
 * Always returns an object or array
 * - primitives, null, etc return an empty object
 * - malformed objects return an empty object
 * - malfomred arrays return an empty array
 *
 * @param json
 * @returns object or array
 */ const $def2aa2b8a848888$var$parse = (json)=>{
    let parsed = {};
    try {
        parsed = JSON.parse(json);
        return (0, $89a0fa61e249632e$export$2e2bcd8739ae039)(parsed) ? parsed : {};
    } catch (e) {
        if (typeof json === 'string' && json.length > 0 && json.charAt(0) === '[') return [];
        return parsed;
    }
};
var $def2aa2b8a848888$export$2e2bcd8739ae039 = $def2aa2b8a848888$var$parse;


/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ const $61f57676a9396065$var$receiveStorageEvent = (namespace, onStorageCb, emptyValue)=>(e)=>{
        const isStorageEventForThisNamespace = e.key === namespace;
        if (!isStorageEventForThisNamespace) return;
        const newValue = !e.newValue ? emptyValue : (0, $def2aa2b8a848888$export$2e2bcd8739ae039)(e.newValue);
        onStorageCb(newValue);
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
        const parsedNamespace = (0, $def2aa2b8a848888$export$2e2bcd8739ae039)(stringifiedNamespace);
        return !pathToProp ? parsedNamespace : (0, $hgUW1$path)(pathToProp, parsedNamespace);
    };
};
var $218826c4266cf93d$export$2e2bcd8739ae039 = $218826c4266cf93d$var$read;


const $3d50c98fd8d027f6$var$emitStorageEvent = (key, stringifiedValue)=>{
    const newValue = !stringifiedValue ? null : stringifiedValue;
    const config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key,
        newValue: newValue
    };
    const storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $3d50c98fd8d027f6$export$2e2bcd8739ae039 = $3d50c98fd8d027f6$var$emitStorageEvent;






const $a0de713d683e5fb7$var$stringify = (value)=>{
    try {
        const stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
    } catch (e) {
        return undefined;
    }
};
var $a0de713d683e5fb7$export$2e2bcd8739ae039 = $a0de713d683e5fb7$var$stringify;


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
        const stringifiedNamespace = (0, $a0de713d683e5fb7$export$2e2bcd8739ae039)(updatedNamespaceValue);
        if (!stringifiedNamespace) return;
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
            (0, $3d50c98fd8d027f6$export$2e2bcd8739ae039)(namespace);
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
 */ const $2df9d79b6788b58e$var$useLocalStorage = (namespace, onStorageCb, emptyValue = {})=>{
    (0, $hgUW1$useEffect)(()=>{
        if (!onStorageCb) return;
        const onStorage = (0, $61f57676a9396065$export$2e2bcd8739ae039)(namespace, onStorageCb, emptyValue);
        window.addEventListener('storage', onStorage);
        return ()=>window.removeEventListener('storage', onStorage);
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
