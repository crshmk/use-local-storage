/**
 * Interact with localStorage
 *
 * Emit storage events to other tabs
 */
declare const useLocalStorage: <T, Cb extends Function>(cb: Cb) => {
    read: (k: string) => T;
    update: (k: string, value: T) => void;
    remove: (k: string) => void;
};
export default useLocalStorage;

//# sourceMappingURL=index.d.ts.map
