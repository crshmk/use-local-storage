import parse from 'unstring'

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>

/**
 * Update the state of this tab when another tab emits a storage event
 * 
 * @param setValue state setter
 * @param defaultValue T
 * @returns void
 */
const onReceiveStorageEvent = <T>(setValue: StateSetter<T>, defaultValue: T) => (e: StorageEvent) => {

  if(!e.newValue) {
    setValue(defaultValue)
    return 
  }

  const newValue: T = parse(e.newValue)

  console.log('received event', newValue)
  return 
  
  setValue(newValue)
}

export default onReceiveStorageEvent