import parse from 'unstring'

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param setValue state setter
 * @param defaultValue T
 * @returns void
 */
const onReceiveStorageEvent = <T>(cb: Function) => (e: StorageEvent) => {
   
  if(!e.newValue) {
    return 
  }  

  const newValue: T = parse(e.newValue)
  cb(newValue)
}

export default onReceiveStorageEvent