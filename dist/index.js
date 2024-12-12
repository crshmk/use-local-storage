var $8zHUo$react = require("react");
var $8zHUo$unstring = require("unstring");
var $8zHUo$ramda = require("ramda");


function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $fd046e7a82b9f872$export$2e2bcd8739ae039);


/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */ var $3950ad88a2689f3e$var$receiveStorageEvent = function(cb) {
    return function(e) {
        if (typeof cb !== 'function') return;
        if (!e.newValue) return;
        var newValue = (0, ($parcel$interopDefault($8zHUo$unstring)))(e.newValue);
        cb(newValue);
    };
};
var $3950ad88a2689f3e$export$2e2bcd8739ae039 = $3950ad88a2689f3e$var$receiveStorageEvent;




var $f5c61003bc103344$export$2e2bcd8739ae039 = (0, $8zHUo$ramda.anyPass)([
    (0, $8zHUo$ramda.isEmpty),
    (0, $8zHUo$ramda.isNil)
]);



/**
 * Read an namespace in localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {unknown} value parsed item value
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ var $64365f19cb59eeb0$var$read = function(namespace) {
    return function(pathToProp) {
        var stringifiedNamespace = localStorage.getItem(namespace) || '';
        if ((0, $f5c61003bc103344$export$2e2bcd8739ae039)(stringifiedNamespace)) return undefined;
        var parsedNamespace = (0, ($parcel$interopDefault($8zHUo$unstring)))(stringifiedNamespace);
        return (0, $f5c61003bc103344$export$2e2bcd8739ae039)(pathToProp) ? parsedNamespace : (0, $8zHUo$ramda.path)(pathToProp, parsedNamespace);
    };
};
var $64365f19cb59eeb0$export$2e2bcd8739ae039 = $64365f19cb59eeb0$var$read;


var $a2c4db6c02f8cb51$var$emitStorageEvent = function(key, stringifiedValue) {
    var config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key,
        newValue: stringifiedValue
    };
    var storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $a2c4db6c02f8cb51$export$2e2bcd8739ae039 = $a2c4db6c02f8cb51$var$emitStorageEvent;







var $bead50853ca58791$var$stringify = function(value) {
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
 */ var $bead50853ca58791$var$update = function(namespace) {
    return function(value, path) {
        var currentNamespace = (0, $64365f19cb59eeb0$export$2e2bcd8739ae039)(namespace)();
        var updatedNamespaceValue = (0, $8zHUo$ramda.isNil)(path) ? value : (0, $8zHUo$ramda.set)((0, $8zHUo$ramda.lensPath)(path), value, currentNamespace);
        var stringifiedNamespace = $bead50853ca58791$var$stringify(updatedNamespaceValue);
        if ((0, $f5c61003bc103344$export$2e2bcd8739ae039)(stringifiedNamespace)) return;
        localStorage.setItem(namespace, stringifiedNamespace);
        (0, $a2c4db6c02f8cb51$export$2e2bcd8739ae039)(namespace, stringifiedNamespace);
    };
};
var $bead50853ca58791$export$2e2bcd8739ae039 = $bead50853ca58791$var$update;




/**
 * Remove a namespace from localStorage or a nested value at that namespace
 *
 * @param {string} namespace root key of localStorage
 * @param {(string | number)[] | undefined} path Ramda Path to nested prop
 */ var $79a9f3d6fb5469bc$var$unset = function(namespace) {
    return function(pathToProp) {
        if ((0, $f5c61003bc103344$export$2e2bcd8739ae039)(pathToProp)) {
            localStorage.removeItem(namespace);
            (0, $a2c4db6c02f8cb51$export$2e2bcd8739ae039)(namespace, null);
            return;
        }
        var namespaceValue = (0, $64365f19cb59eeb0$export$2e2bcd8739ae039)(namespace)();
        var newNamespaceValue = (0, $8zHUo$ramda.dissocPath)(pathToProp, namespaceValue);
        (0, $bead50853ca58791$export$2e2bcd8739ae039)(namespace)(newNamespaceValue);
    };
};
var $79a9f3d6fb5469bc$export$2e2bcd8739ae039 = $79a9f3d6fb5469bc$var$unset;



/**
 * Interact with namespaced localStorage
 *
 * Emit storage events to other tabs
 */ var $fd046e7a82b9f872$var$useLocalStorage = function(namespace, eventCb) {
    (0, $8zHUo$react.useEffect)(function() {
        var onStore = (0, $3950ad88a2689f3e$export$2e2bcd8739ae039)(eventCb);
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
        */ read: (0, $64365f19cb59eeb0$export$2e2bcd8739ae039)(namespace),
        /**
         * Set a namespace in localStorage or a nested value at that namespace
         *
         * Emit the update to other tabs
         *
         * @param {unknown} value parsed item value
         * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
         */ update: (0, $bead50853ca58791$export$2e2bcd8739ae039)(namespace),
        /**
         * Remove a namespace from localStorage or a nested value at that namespace
         *
         * @param {(string | number)[] | undefined} path Ramda Path to nested prop
         */ unset: (0, $79a9f3d6fb5469bc$export$2e2bcd8739ae039)(namespace)
    };
};
var $fd046e7a82b9f872$export$2e2bcd8739ae039 = $fd046e7a82b9f872$var$useLocalStorage;


//# sourceMappingURL=index.js.map
