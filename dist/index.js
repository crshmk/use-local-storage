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


/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param setValue state setter
 * @param defaultValue T
 * @returns void
 */ const $25147cf1717df6fe$var$onReceiveStorageEvent = (setValue, defaultValue)=>(e)=>{
        if (!e.newValue) {
            setValue(defaultValue);
            return;
        }
        const newValue = (0, ($parcel$interopDefault($8zHUo$unstring)))(e.newValue);
        setValue(newValue);
    };
var $25147cf1717df6fe$export$2e2bcd8739ae039 = $25147cf1717df6fe$var$onReceiveStorageEvent;


let $0380abe8a3c44ab5$var$cachedValue = undefined;
/**
 * Set the value in the localStorage of this tab
 *
 * Emit the value to be set in other tabs
 *
 * @param key string
 * @param value T
 */ const $0380abe8a3c44ab5$var$setAndEmitValue = (key, value)=>{
    if ($0380abe8a3c44ab5$var$cachedValue !== value) {
        localStorage.setItem(key, value);
        $0380abe8a3c44ab5$var$cachedValue = value;
    //emitStorageEvent(key, stringifiedValue)
    }
};
var $0380abe8a3c44ab5$export$2e2bcd8739ae039 = $0380abe8a3c44ab5$var$setAndEmitValue;



/**
 * React hook to interact with localStorage
 * - Emits / receives storage events to / from other tabs
 *
 * @param key string
 * @param defaultValue T
 * @return [value ,setValue]
 */ const $fd046e7a82b9f872$var$useLocalStorage = (key, defaultValue)=>{
    const [value, setValue] = (0, $8zHUo$react.useState)(defaultValue);
    const prev = (0, $8zHUo$react.useRef)(null);
    (0, $8zHUo$react.useEffect)(()=>{
        const storedValue = window.localStorage.getItem(key);
        const parsedValue = (0, ($parcel$interopDefault($8zHUo$unstring)))(storedValue);
        const newValue = parsedValue || defaultValue;
        const stringifiedValue = JSON.stringify(newValue);
        localStorage.setItem(key, stringifiedValue);
        (0, $0380abe8a3c44ab5$export$2e2bcd8739ae039)(key, stringifiedValue);
        prev.current = stringifiedValue;
    }, []);
    (0, $8zHUo$react.useEffect)(()=>{
        const stringifiedValue = JSON.stringify(value);
        if (stringifiedValue === prev.current) return;
        (0, $0380abe8a3c44ab5$export$2e2bcd8739ae039)(key, stringifiedValue);
        prev.current = stringifiedValue;
    }, [
        value
    ]);
    (0, $8zHUo$react.useEffect)(()=>{
        const onSetStorage = (0, $25147cf1717df6fe$export$2e2bcd8739ae039)(setValue, defaultValue);
        window.addEventListener("storage", onSetStorage);
        return ()=>window.removeEventListener("storage", onSetStorage);
    }, [
        key
    ]);
    return [
        value,
        setValue
    ];
};
var $fd046e7a82b9f872$export$2e2bcd8739ae039 = $fd046e7a82b9f872$var$useLocalStorage;


//# sourceMappingURL=index.js.map
