var $8zHUo$react = require("react");
var $8zHUo$unstring = require("unstring");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $fd046e7a82b9f872$export$2e2bcd8739ae039);


const $a2c4db6c02f8cb51$var$emitStorageEvent = (key, stringifiedValue)=>{
    const config = {
        storageArea: window.localStorage,
        url: window.location.href,
        key: key
    };
    if (stringifiedValue !== undefined) config.newValue = stringifiedValue;
    const storageEvent = new StorageEvent("storage", config);
    window.dispatchEvent(storageEvent);
};
var $a2c4db6c02f8cb51$export$2e2bcd8739ae039 = $a2c4db6c02f8cb51$var$emitStorageEvent;



/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param setValue state setter
 * @param defaultValue T
 * @returns void
 */ const $25147cf1717df6fe$var$onReceiveStorageEvent = (e)=>{
    if (!e.newValue) return;
    const newValue = (0, ($parcel$interopDefault($8zHUo$unstring)))(e.newValue);
    console.log(e, newValue);
    //console.log('received event', newValue)
    return;
};
var $25147cf1717df6fe$export$2e2bcd8739ae039 = $25147cf1717df6fe$var$onReceiveStorageEvent;


const $fd046e7a82b9f872$var$stringify = (value)=>{
    try {
        const stringifiedValue = JSON.stringify(value);
        return stringifiedValue;
    } catch (e) {
        return JSON.stringify({});
    }
};
/**
 * Set an item in localStorage
 *
 * Emit teh update to other tabs
 *
 * @param k string item key
 * @param v parsed item value
 */ const $fd046e7a82b9f872$var$update = (k, v)=>{
    const stringifiedValue = $fd046e7a82b9f872$var$stringify(v);
    localStorage.setItem(k, stringifiedValue);
    (0, $a2c4db6c02f8cb51$export$2e2bcd8739ae039)(k, stringifiedValue);
};
/**
 * Read an item from localStorage
 *
 * @param k localStorage key
 * @returns parsed item value
 */ const $fd046e7a82b9f872$var$read = (k)=>{
    const stringifiedValue = localStorage.getItem(k) || '';
    return (0, ($parcel$interopDefault($8zHUo$unstring)))(stringifiedValue);
};
/**
 * Remove an item from localStorage
 *
 * @param k localStorage key
 */ const $fd046e7a82b9f872$var$remove = (k)=>{
    localStorage.removeItem(k);
    (0, $a2c4db6c02f8cb51$export$2e2bcd8739ae039)(k, '');
};
/**
 * Interact with localStorage
 *
 * Emit storage events to other tabs
 */ const $fd046e7a82b9f872$var$useLocalStorage = (cb)=>{
    (0, $8zHUo$react.useEffect)(()=>{
        const receieveEvent = (0, $25147cf1717df6fe$export$2e2bcd8739ae039)(cb);
        window.addEventListener("storage", receieveEvent);
        return ()=>window.removeEventListener("storage", receieveEvent);
    }, []);
    return {
        read: (k)=>$fd046e7a82b9f872$var$read(k),
        update: (k, value)=>$fd046e7a82b9f872$var$update(k, value),
        remove: $fd046e7a82b9f872$var$remove
    };
};
var $fd046e7a82b9f872$export$2e2bcd8739ae039 = $fd046e7a82b9f872$var$useLocalStorage;


//# sourceMappingURL=index.js.map
