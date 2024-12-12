## Hook to interact with namespaced localStorage 


1. Create a namespace in localStorage 

```javascript 
const useUserStorage = useLocalStorage('user')
```
> localStorage.getItem('user'), etc.


---


2. CRUD the storage with hook methods 

```javascript 
const { read, update, unset } = useLocalStorage('user')
```

Use [Ramda paths](https://ramdajs.com/docs/#path) to interact with the nested data

```javascript 
// interact with a nested object at localStorage.user 
const userStorage = useLocalStorage('user', console.log)

userStorage.update({ userId: 42, name: 'Jo', items: [{ itemId: 1 }]})
// set localStorage.user 

userStorage.read()
// get entire parsed user 

userStorage.read(['items', 0, 'itemId'])
// 1 

userStorage.update(2, ['items', 0, 'itemId'])
// set the first itemId to 2 

userStorage.unset()
// remove the user

```


---


3. Scope the object in another hook to align state with localStorage

```javascript 
import useLocalStorage from 'use-local-storage'

import { append } from 'ramda' 

const mockOrders = [ 
  { orderId: '', orderItems: [{name: 'order1'}] } 
]

const useOrders = () => {
  const [orders, setOrders] = useState(mockOrders)
  const ordersStorage = useLocalStorage('orders')

  const addOrder = newOrder => {
    setOrders(append(newOrder))
    ordersStorage.update(append(newOrder, orders))
  }

  const getStoredItem = itemIndex => 
    ordersStorage.read([itemIndex])

  useEffect(() => {
    const storedOrders = ordersStorage.read()
    if(Array.isArray(storedOrders)) {
      setOrders(storedOrders)
    }
  }, [])

  return {
    addOrder,
    getStoredItem,
    orders, 
    ordersStorage,
    setOrders
  }
 }
```