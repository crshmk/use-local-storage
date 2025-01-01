import * as $hgUW1$unstring from "unstring";
import {path as $hgUW1$path, anyPass as $hgUW1$anyPass, isEmpty as $hgUW1$isEmpty, isNil as $hgUW1$isNil, dissocPath as $hgUW1$dissocPath, set as $hgUW1$set, lensPath as $hgUW1$lensPath} from "ramda";
import {useEffect as $hgUW1$useEffect} from "react";


      var $parcel$global = globalThis;
    
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire94c2"];

if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}

var parcelRegister = parcelRequire.register;
parcelRegister("8pqOU", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;

var $61f57676a9396065$var$_unstring = $61f57676a9396065$var$_interopRequireDefault($hgUW1$unstring);
function $61f57676a9396065$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ const $61f57676a9396065$var$receiveStorageEvent = (cb)=>(e)=>{
        if (typeof cb !== 'function') return;
        if (!e.newValue) return;
        const newValue = (0, $61f57676a9396065$var$_unstring.default)(e.newValue);
        if (newValue !== undefined) cb(newValue);
    };
var $61f57676a9396065$var$_default = module.exports.default = $61f57676a9396065$var$receiveStorageEvent;

});

parcelRegister("2Sukv", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;

var $218826c4266cf93d$var$_unstring = $218826c4266cf93d$var$_interopRequireDefault($hgUW1$unstring);

var $218826c4266cf93d$var$_isAbsent = $218826c4266cf93d$var$_interopRequireDefault((parcelRequire("eUEg6")));

function $218826c4266cf93d$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
/**
 * TypeScript requires such a mess
 */ /**
 * Read an namespace in localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ const $218826c4266cf93d$var$read = (namespace)=>{
    return (pathToProp)=>{
        const stringifiedNamespace = localStorage.getItem(namespace) || '';
        if ((0, $218826c4266cf93d$var$_isAbsent.default)(stringifiedNamespace)) return undefined;
        const parsedNamespace = (0, $218826c4266cf93d$var$_unstring.default)(stringifiedNamespace);
        return !pathToProp ? parsedNamespace : (0, $hgUW1$path)(pathToProp, parsedNamespace);
    };
};
var $218826c4266cf93d$var$_default = module.exports.default = $218826c4266cf93d$var$read;

});
parcelRegister("eUEg6", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;

const $adb58637f2755f63$var$isAbsent = (0, $hgUW1$anyPass)([
    $hgUW1$isEmpty,
    $hgUW1$isNil
]);
var $adb58637f2755f63$var$_default = module.exports.default = $adb58637f2755f63$var$isAbsent;

});


parcelRegister("7h6SQ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;

var $54bf75e0ecf09f50$var$_emitStorageEvent = $54bf75e0ecf09f50$var$_interopRequireDefault((parcelRequire("5gnDZ")));

var $54bf75e0ecf09f50$var$_read = $54bf75e0ecf09f50$var$_interopRequireDefault((parcelRequire("2Sukv")));

var $54bf75e0ecf09f50$var$_update = $54bf75e0ecf09f50$var$_interopRequireDefault((parcelRequire("s30dk")));

var $54bf75e0ecf09f50$var$_isAbsent = $54bf75e0ecf09f50$var$_interopRequireDefault((parcelRequire("eUEg6")));

function $54bf75e0ecf09f50$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
/**
 * Remove a namespace from localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ const $54bf75e0ecf09f50$var$unset = (namespace)=>{
    return (pathToProp)=>{
        if ((0, $54bf75e0ecf09f50$var$_isAbsent.default)(pathToProp)) {
            localStorage.removeItem(namespace);
            (0, $54bf75e0ecf09f50$var$_emitStorageEvent.default)(namespace, null);
            return;
        }
        const namespaceValue = (0, $54bf75e0ecf09f50$var$_read.default)(namespace)();
        const newNamespaceValue = (0, $hgUW1$dissocPath)(pathToProp, namespaceValue);
        (0, $54bf75e0ecf09f50$var$_update.default)(namespace)(newNamespaceValue);
    };
};
var $54bf75e0ecf09f50$var$_default = module.exports.default = $54bf75e0ecf09f50$var$unset;

});
parcelRegister("5gnDZ", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;
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
var $3d50c98fd8d027f6$var$_default = module.exports.default = $3d50c98fd8d027f6$var$emitStorageEvent;

});

parcelRegister("s30dk", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.default = void 0;

var $0544f1dd1025833f$var$_emitStorageEvent = $0544f1dd1025833f$var$_interopRequireDefault((parcelRequire("5gnDZ")));

var $0544f1dd1025833f$var$_read = $0544f1dd1025833f$var$_interopRequireDefault((parcelRequire("2Sukv")));


var $0544f1dd1025833f$var$_isAbsent = $0544f1dd1025833f$var$_interopRequireDefault((parcelRequire("eUEg6")));
function $0544f1dd1025833f$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
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
        const currentNamespace = (0, $0544f1dd1025833f$var$_read.default)(namespace)();
        const updatedNamespaceValue = (0, $hgUW1$isNil)(path) ? value : (0, $hgUW1$set)((0, $hgUW1$lensPath)(path), value, currentNamespace);
        const stringifiedNamespace = $0544f1dd1025833f$var$stringify(updatedNamespaceValue);
        if ((0, $0544f1dd1025833f$var$_isAbsent.default)(stringifiedNamespace)) return;
        localStorage.setItem(namespace, stringifiedNamespace);
        (0, $0544f1dd1025833f$var$_emitStorageEvent.default)(namespace, stringifiedNamespace);
    };
};
var $0544f1dd1025833f$var$_default = module.exports.default = $0544f1dd1025833f$var$update;

});


var $2df9d79b6788b58e$exports = {};
"use strict";
Object.defineProperty($2df9d79b6788b58e$exports, "__esModule", {
    value: true
});
$2df9d79b6788b58e$exports.default = void 0;


var $2df9d79b6788b58e$var$_receiveStorageEvent = $2df9d79b6788b58e$var$_interopRequireDefault((parcelRequire("8pqOU")));

var $2df9d79b6788b58e$var$_read = $2df9d79b6788b58e$var$_interopRequireDefault((parcelRequire("2Sukv")));

var $2df9d79b6788b58e$var$_unset = $2df9d79b6788b58e$var$_interopRequireDefault((parcelRequire("7h6SQ")));

var $2df9d79b6788b58e$var$_update = $2df9d79b6788b58e$var$_interopRequireDefault((parcelRequire("s30dk")));
function $2df9d79b6788b58e$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}
/**
 * Interact with namespaced localStorage
 *
 * Emit storage events to other tabs
 */ const $2df9d79b6788b58e$var$useLocalStorage = (namespace, eventCb)=>{
    (0, $hgUW1$useEffect)(()=>{
        const onStore = (0, $2df9d79b6788b58e$var$_receiveStorageEvent.default)(eventCb);
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
    */ read: (0, $2df9d79b6788b58e$var$_read.default)(namespace),
        //as <NamespaceType>(namespace: any) => <ValueType>(pathToProp?: (string | number)[]) => NamespaceType | ValueType | undefined,
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
     */ update: (0, $2df9d79b6788b58e$var$_update.default)(namespace),
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
     */ unset: (0, $2df9d79b6788b58e$var$_unset.default)(namespace)
    };
};
var $2df9d79b6788b58e$var$_default = $2df9d79b6788b58e$exports.default = $2df9d79b6788b58e$var$useLocalStorage;


export {$2df9d79b6788b58e$exports as default};
//# sourceMappingURL=index.js.map
