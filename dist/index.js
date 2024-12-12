var $gXNCa$react = require("react");
var $gXNCa$unstring = require("unstring");
var $gXNCa$ramda = require("ramda");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}


/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ const $ace534a17336fe4d$var$receiveStorageEvent = (cb)=>(e)=>{
        if (typeof cb !== 'function') return;
        if (!e.newValue) return;
        const newValue = (0, ($parcel$interopDefault($gXNCa$unstring)))(e.newValue);
        cb(newValue);
    };
var $ace534a17336fe4d$export$2e2bcd8739ae039 = $ace534a17336fe4d$var$receiveStorageEvent;




var $f5c61003bc103344$export$2e2bcd8739ae039 = (0, $gXNCa$ramda.anyPass)([
    (0, $gXNCa$ramda.isEmpty),
    (0, $gXNCa$ramda.isNil)
]);


/**
 * Read an namespace in localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */ const $61e6f04d30479333$var$read = (namespace)=>(pathToProp)=>{
        const stringifiedNamespace = localStorage.getItem(namespace) || '';
        if ((0, $f5c61003bc103344$export$2e2bcd8739ae039)(stringifiedNamespace)) return undefined;
        const parsedNamespace = (0, ($parcel$interopDefault($gXNCa$unstring)))(stringifiedNamespace);
        return (0, $f5c61003bc103344$export$2e2bcd8739ae039)(pathToProp) ? parsedNamespace : path(pathToProp, parsedNamespace);
    };
var $61e6f04d30479333$export$2e2bcd8739ae039 = $61e6f04d30479333$var$read;


/*
type StorageEventConfig = {
  storageArea: Storage 
  url: string 
  key: string 
  newValue?: string 
}
*/ const $d21870e548692df7$var$emitStorageEvent = (key, stringifiedValue)=>{
    const config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key,
        newValue: stringifiedValue
    };
    const storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $d21870e548692df7$export$2e2bcd8739ae039 = $d21870e548692df7$var$emitStorageEvent;






const $b00c2e3bf3c1d813$var$stringify = (value)=>{
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
 */ const $b00c2e3bf3c1d813$var$update = (namespace)=>(value, path)=>{
        const currentNamespace = (0, $61e6f04d30479333$export$2e2bcd8739ae039)(namespace)();
        const updatedNamespaceValue = (0, $gXNCa$ramda.isNil)(path) ? value : (0, $gXNCa$ramda.set)((0, $gXNCa$ramda.lensPath)(path), value, currentNamespace);
        const stringifiedNamespace = $b00c2e3bf3c1d813$var$stringify(updatedNamespaceValue);
        localStorage.setItem(namespace, stringifiedNamespace);
        (0, $d21870e548692df7$export$2e2bcd8739ae039)(namespace, stringifiedNamespace);
    };
var $b00c2e3bf3c1d813$export$2e2bcd8739ae039 = $b00c2e3bf3c1d813$var$update;




/**
 * Remove a namespace from localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
 */ const $3b44343b1bf75e9f$var$unset = (namespace)=>(pathToProp)=>{
        if ((0, $f5c61003bc103344$export$2e2bcd8739ae039)(pathToProp)) {
            localStorage.removeItem(namespace);
            (0, $d21870e548692df7$export$2e2bcd8739ae039)(namespace, null);
            return;
        }
        const namespaceValue = (0, $61e6f04d30479333$export$2e2bcd8739ae039)(namespace)();
        const newNamespaceValue = (0, $gXNCa$ramda.dissocPath)(pathToProp, namespaceValue);
        (0, $b00c2e3bf3c1d813$export$2e2bcd8739ae039)(namespace)(newNamespaceValue);
    };
var $3b44343b1bf75e9f$export$2e2bcd8739ae039 = $3b44343b1bf75e9f$var$unset;



/**
 * Interact with namespaced localStorage 
 * 
 * Emit storage events to other tabs
 */ const $4fa36e821943b400$var$useLocalStorage = (namespace, eventCb)=>{
    (0, $gXNCa$react.useEffect)(()=>{
        const onStore = (0, $ace534a17336fe4d$export$2e2bcd8739ae039)(eventCb);
        window.addEventListener("storage", onStore);
        return ()=>window.removeEventListener("storage", onStore);
    }, []);
    return {
        /**
     * Read a namespace in localStorage or a nested value at that namespace
     * 
     * @param {unknown} value parsed item value 
     * @param {(string | number)[]} path Ramda Path to nested prop 
     */ read: (0, $61e6f04d30479333$export$2e2bcd8739ae039)(namespace),
        /**
     * Set a namespace in localStorage or a nested value at that namespace
     * 
     * Emit the update to other tabs 
     * 
     * @param {unknown} value parsed item value 
     * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
     */ update: (0, $b00c2e3bf3c1d813$export$2e2bcd8739ae039)(namespace),
        /**
     * Remove a namespace from localStorage or a nested value at that namespace
     * 
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
     */ unset: (0, $3b44343b1bf75e9f$export$2e2bcd8739ae039)(namespace)
    };
};
module.exports = $4fa36e821943b400$var$useLocalStorage;


//# sourceMappingURL=index.js.map
