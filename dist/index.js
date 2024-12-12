import {useEffect as $5OpyM$useEffect} from "react";
import $5OpyM$unstring from "unstring";
import {path as $5OpyM$path, anyPass as $5OpyM$anyPass, isEmpty as $5OpyM$isEmpty, isNil as $5OpyM$isNil, dissocPath as $5OpyM$dissocPath, set as $5OpyM$set, lensPath as $5OpyM$lensPath} from "ramda";



/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ const $9b7f76fccb49fc21$var$receiveStorageEvent = (cb)=>(e)=>{
        if (typeof cb !== 'function') return;
        if (!e.newValue) return;
        const newValue = (0, $5OpyM$unstring)(e.newValue);
        if (newValue !== undefined) cb(newValue);
    };
var $9b7f76fccb49fc21$export$2e2bcd8739ae039 = $9b7f76fccb49fc21$var$receiveStorageEvent;




var $549131179abf8a03$export$2e2bcd8739ae039 = (0, $5OpyM$anyPass)([
    (0, $5OpyM$isEmpty),
    (0, $5OpyM$isNil)
]);



/**
 * Read an namespace in localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */ const $c4b13e930bba782b$var$read = (namespace)=>(pathToProp)=>{
        const stringifiedNamespace = localStorage.getItem(namespace) || '';
        if ((0, $549131179abf8a03$export$2e2bcd8739ae039)(stringifiedNamespace)) return undefined;
        const parsedNamespace = (0, $5OpyM$unstring)(stringifiedNamespace);
        return (0, $549131179abf8a03$export$2e2bcd8739ae039)(pathToProp) ? parsedNamespace : (0, $5OpyM$path)(pathToProp, parsedNamespace);
    };
var $c4b13e930bba782b$export$2e2bcd8739ae039 = $c4b13e930bba782b$var$read;


const $6b2a688232110846$var$emitStorageEvent = (key, stringifiedValue)=>{
    const config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key,
        newValue: stringifiedValue
    };
    const storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $6b2a688232110846$export$2e2bcd8739ae039 = $6b2a688232110846$var$emitStorageEvent;






const $c2bba2b3d93255a5$var$stringify = (value)=>{
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
 */ const $c2bba2b3d93255a5$var$update = (namespace)=>(value, path)=>{
        const currentNamespace = (0, $c4b13e930bba782b$export$2e2bcd8739ae039)(namespace)();
        const updatedNamespaceValue = (0, $5OpyM$isNil)(path) ? value : (0, $5OpyM$set)((0, $5OpyM$lensPath)(path), value, currentNamespace);
        if (!updatedNamespaceValue) return;
        const stringifiedNamespace = $c2bba2b3d93255a5$var$stringify(updatedNamespaceValue);
        localStorage.setItem(namespace, stringifiedNamespace);
        (0, $6b2a688232110846$export$2e2bcd8739ae039)(namespace, stringifiedNamespace);
    };
var $c2bba2b3d93255a5$export$2e2bcd8739ae039 = $c2bba2b3d93255a5$var$update;




/**
 * Remove a namespace from localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
 */ const $c6822cb7ad739229$var$unset = (namespace)=>(pathToProp)=>{
        if ((0, $549131179abf8a03$export$2e2bcd8739ae039)(pathToProp)) {
            localStorage.removeItem(namespace);
            (0, $6b2a688232110846$export$2e2bcd8739ae039)(namespace, null);
            return;
        }
        const namespaceValue = (0, $c4b13e930bba782b$export$2e2bcd8739ae039)(namespace)();
        const newNamespaceValue = (0, $5OpyM$dissocPath)(pathToProp, namespaceValue);
        (0, $c2bba2b3d93255a5$export$2e2bcd8739ae039)(namespace)(newNamespaceValue);
    };
var $c6822cb7ad739229$export$2e2bcd8739ae039 = $c6822cb7ad739229$var$unset;



/**
 * Interact with namespaced localStorage 
 * 
 * Emit storage events to other tabs
 */ const $cf838c15c8b009ba$var$useLocalStorage = (namespace, eventCb)=>{
    (0, $5OpyM$useEffect)(()=>{
        const onStore = (0, $9b7f76fccb49fc21$export$2e2bcd8739ae039)(eventCb);
        window.addEventListener("storage", onStore);
        return ()=>window.removeEventListener("storage", onStore);
    }, []);
    return {
        /**
    * Read a namespace in localStorage or a nested value at that namespace
    * 
    * @param {unknown} value parsed item value 
    * @param {(string | number)[]} path Ramda Path to nested prop 
    */ read: (0, $c4b13e930bba782b$export$2e2bcd8739ae039)(namespace),
        /**
    * Set a namespace in localStorage or a nested value at that namespace
    * 
    * Emit the update to other tabs 
    * 
    * @param {unknown} value parsed item value 
    * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
    */ update: (0, $c2bba2b3d93255a5$export$2e2bcd8739ae039)(namespace),
        /**
     * Remove a namespace from localStorage or a nested value at that namespace
     * 
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
     */ unset: (0, $c6822cb7ad739229$export$2e2bcd8739ae039)(namespace)
    };
};
var $cf838c15c8b009ba$export$2e2bcd8739ae039 = $cf838c15c8b009ba$var$useLocalStorage;


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.js.map
