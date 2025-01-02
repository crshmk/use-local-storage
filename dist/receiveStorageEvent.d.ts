/**
 * Update the state of this tab when another tab emits a storage event
 *
 * @param cb callback handed the parsed value of the namespace
 * @param defaultValue T
 * @returns void
 */
declare const receiveStorageEvent: (onStorageCb: Function, emptyValue: ParsedObjectOrArray) => (e: StorageEvent) => void;
export default receiveStorageEvent;
