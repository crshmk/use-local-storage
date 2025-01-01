## React hook for localStorage

- every namespace with this localStorage hook is an object or array; not for primitives at the root 
- update, read, or unset a namespace (e.g. `'user'`) or a nested prop (e.g. `user.preferences.isDarkMode`) with a [path](https://ramdajs.com/docs/#path)
- values are stringified (in) / parsed (out)
- undefined values for the root (e.g. `'user'`) return as an empty object or array

---


### 1. Create a namespace in localStorage 

```javascript 
const { read, update, unset } = useLs<User>('user')
```

---


### 2. CRUD the storage with hook methods 
values are parsed 

```javascript 
type User = {
  name: string 
  preferences: [
    {
      name: 'darkMode',
      value: false
    }
  ]
}

const userStorage = useLs<User>('user')

// get the entire user 
// return value typed as User 
userStorge.read()

// get the name of the first preference 
userStorage.read<string>(['preferences', 0, 'name'])

// update that preference 
userStorage.update<boolean>(['preferences', 0, 'value'], true)

// remove preferences prop 
userStorage.unset(['preferences'])

// remove the user from localStorage 
userStorage.unset()

```


---


```javascript 
import useLs from 'use-ls'

import { append } from 'ramda' 

type Order = {
  orderId: string 
  orderItems: {name: string}[]
}

const mockOrders: Order[] = [ 
  { orderId: '', orderItems: [{name: 'order1'}] } 
]

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const ordersStorage = useLs<Order[]>('orders')

  const addOrder = (newOrder: Order) => {
    setOrders(append(newOrder))
    ordersStorage.update(append(newOrder, orders))
  }

  const getStoredOrder = (orderIndex: number) => 
    ordersStorage.read<Order>([orderIndex])

  const getStoredOrderName = (orderIndex: number, itemIndex: number) => 
    ordersStorage.read<string>([orderIndex, 'orderItems', itemIndex, 'name'])

  useEffect(() => {
    // storedOrders is typed as Order[]
    const storedOrders = ordersStorage.read()
    if(Array.isArray(storedOrders)) {
      setOrders(storedOrders)
    }
  }, [])

  return {
    addOrder,
    getStoredOrder,
    getStoredOrderName,
    orders, 
    ordersStorage,
    setOrders
  }
 }
```