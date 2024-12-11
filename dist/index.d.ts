/**
 * React hook to interact with localStorage
 * - Emits / receives storage events to / from other tabs
 *
 * @param key string
 * @param defaultValue T
 * @return [value ,setValue]
 */
declare const useLocalStorage: <T>(key: string, defaultValue: T) => [T, React.Dispatch<React.SetStateAction<T>>];
export default useLocalStorage;

//# sourceMappingURL=index.d.ts.map
