import * as $5OpyM$unstring from "unstring";
import {path as $5OpyM$path, anyPass as $5OpyM$anyPass, isEmpty as $5OpyM$isEmpty, isNil as $5OpyM$isNil, dissocPath as $5OpyM$dissocPath, set as $5OpyM$set, lensPath as $5OpyM$lensPath} from "ramda";
import {useEffect as $5OpyM$useEffect} from "react";


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
parcelRegister("99f5x", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $9b7f76fccb49fc21$var$_unstring = $9b7f76fccb49fc21$var$_interopRequireDefault($5OpyM$unstring);
function $9b7f76fccb49fc21$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ var $9b7f76fccb49fc21$var$receiveStorageEvent = function receiveStorageEvent(cb) {
    return function(e) {
        if (typeof cb !== 'function') return;
        if (!e.newValue) return;
        var newValue = (0, $9b7f76fccb49fc21$var$_unstring["default"])(e.newValue);
        if (newValue !== undefined) cb(newValue);
    };
};
var $9b7f76fccb49fc21$var$_default = module.exports["default"] = $9b7f76fccb49fc21$var$receiveStorageEvent;

});

parcelRegister("gSZj2", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $c4b13e930bba782b$var$_unstring = $c4b13e930bba782b$var$_interopRequireDefault($5OpyM$unstring);

var $c4b13e930bba782b$var$_isAbsent = $c4b13e930bba782b$var$_interopRequireDefault((parcelRequire("7g9eG")));

function $c4b13e930bba782b$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
/**
 * Read an namespace in localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value 
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop 
 */ var $c4b13e930bba782b$var$read = function read(namespace) {
    return function(pathToProp) {
        var stringifiedNamespace = localStorage.getItem(namespace) || '';
        if ((0, $c4b13e930bba782b$var$_isAbsent["default"])(stringifiedNamespace)) return undefined;
        var parsedNamespace = (0, $c4b13e930bba782b$var$_unstring["default"])(stringifiedNamespace);
        return (0, $c4b13e930bba782b$var$_isAbsent["default"])(pathToProp) ? parsedNamespace : (0, $5OpyM$path)(pathToProp, parsedNamespace);
    };
};
var $c4b13e930bba782b$var$_default = module.exports["default"] = $c4b13e930bba782b$var$read;

});
parcelRegister("7g9eG", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $549131179abf8a03$var$_default = module.exports["default"] = (0, $5OpyM$anyPass)([
    $5OpyM$isEmpty,
    $5OpyM$isNil
]);

});


parcelRegister("h2EFT", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $c6822cb7ad739229$var$_emitStorageEvent = $c6822cb7ad739229$var$_interopRequireDefault((parcelRequire("8x9Oo")));

var $c6822cb7ad739229$var$_read = $c6822cb7ad739229$var$_interopRequireDefault((parcelRequire("gSZj2")));

var $c6822cb7ad739229$var$_update = $c6822cb7ad739229$var$_interopRequireDefault((parcelRequire("gIyEw")));

var $c6822cb7ad739229$var$_isAbsent = $c6822cb7ad739229$var$_interopRequireDefault((parcelRequire("7g9eG")));

function $c6822cb7ad739229$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
/**
 * Remove a namespace from localStorage or a nested value at that namespace
 * 
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
 */ var $c6822cb7ad739229$var$unset = function unset(namespace) {
    return function(pathToProp) {
        if ((0, $c6822cb7ad739229$var$_isAbsent["default"])(pathToProp)) {
            localStorage.removeItem(namespace);
            (0, $c6822cb7ad739229$var$_emitStorageEvent["default"])(namespace, null);
            return;
        }
        var namespaceValue = (0, $c6822cb7ad739229$var$_read["default"])(namespace)();
        var newNamespaceValue = (0, $5OpyM$dissocPath)(pathToProp, namespaceValue);
        (0, $c6822cb7ad739229$var$_update["default"])(namespace)(newNamespaceValue);
    };
};
var $c6822cb7ad739229$var$_default = module.exports["default"] = $c6822cb7ad739229$var$unset;

});
parcelRegister("8x9Oo", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;
var $6b2a688232110846$var$emitStorageEvent = function emitStorageEvent(key, stringifiedValue) {
    var config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key,
        newValue: stringifiedValue
    };
    var storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $6b2a688232110846$var$_default = module.exports["default"] = $6b2a688232110846$var$emitStorageEvent;

});

parcelRegister("gIyEw", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports["default"] = void 0;

var $c2bba2b3d93255a5$var$_emitStorageEvent = $c2bba2b3d93255a5$var$_interopRequireDefault((parcelRequire("8x9Oo")));

var $c2bba2b3d93255a5$var$_read = $c2bba2b3d93255a5$var$_interopRequireDefault((parcelRequire("gSZj2")));

function $c2bba2b3d93255a5$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
var $c2bba2b3d93255a5$var$stringify = function stringify(value) {
    try {
        var stringifiedValue = JSON.stringify(value);
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
 */ var $c2bba2b3d93255a5$var$update = function update(namespace) {
    return function(value, path) {
        var currentNamespace = (0, $c2bba2b3d93255a5$var$_read["default"])(namespace)();
        var updatedNamespaceValue = (0, $5OpyM$isNil)(path) ? value : (0, $5OpyM$set)((0, $5OpyM$lensPath)(path), value, currentNamespace);
        if (!updatedNamespaceValue) return;
        var stringifiedNamespace = $c2bba2b3d93255a5$var$stringify(updatedNamespaceValue);
        localStorage.setItem(namespace, stringifiedNamespace);
        (0, $c2bba2b3d93255a5$var$_emitStorageEvent["default"])(namespace, stringifiedNamespace);
    };
};
var $c2bba2b3d93255a5$var$_default = module.exports["default"] = $c2bba2b3d93255a5$var$update;

});


var $cf838c15c8b009ba$exports = {};
"use strict";


var $cf838c15c8b009ba$var$_receiveStorageEvent = $cf838c15c8b009ba$var$_interopRequireDefault((parcelRequire("99f5x")));

var $cf838c15c8b009ba$var$_read = $cf838c15c8b009ba$var$_interopRequireDefault((parcelRequire("gSZj2")));

var $cf838c15c8b009ba$var$_unset = $cf838c15c8b009ba$var$_interopRequireDefault((parcelRequire("h2EFT")));

var $cf838c15c8b009ba$var$_update = $cf838c15c8b009ba$var$_interopRequireDefault((parcelRequire("gIyEw")));
function $cf838c15c8b009ba$var$_interopRequireDefault(e) {
    return e && e.__esModule ? e : {
        "default": e
    };
}
/**
 * Interact with namespaced localStorage 
 * 
 * Emit storage events to other tabs
 */ var $cf838c15c8b009ba$var$useLocalStorage = function useLocalStorage(namespace, eventCb) {
    (0, $5OpyM$useEffect)(function() {
        var onStore = (0, $cf838c15c8b009ba$var$_receiveStorageEvent["default"])(eventCb);
        window.addEventListener("storage", onStore);
        return function() {
            return window.removeEventListener("storage", onStore);
        };
    }, []);
    return {
        /**
    * Read a namespace in localStorage or a nested value at that namespace
    * 
    * @param {unknown} value parsed item value 
    * @param {(string | number)[]} path Ramda Path to nested prop 
    */ read: (0, $cf838c15c8b009ba$var$_read["default"])(namespace),
        /**
    * Set a namespace in localStorage or a nested value at that namespace
    * 
    * Emit the update to other tabs 
    * 
    * @param {unknown} value parsed item value 
    * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
    */ update: (0, $cf838c15c8b009ba$var$_update["default"])(namespace),
        /**
     * Remove a namespace from localStorage or a nested value at that namespace
     * 
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
     */ unset: (0, $cf838c15c8b009ba$var$_unset["default"])(namespace)
    };
};
$cf838c15c8b009ba$exports = $cf838c15c8b009ba$var$useLocalStorage;


export {$cf838c15c8b009ba$exports as default};
//# sourceMappingURL=index.js.map
