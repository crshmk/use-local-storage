## `localStorage` React hook

- Every namespace with this localStorage hook is an object or array; not for primitives at the root.
- `update`, `read`, or `unset` a namespace (e.g. `'user'`) or a nested prop (e.g. `user.preferences.isDarkMode`) with a [path](https://ramdajs.com/docs/#path).
- Values are stringified (in) / parsed (out).
- When parsing fails when retrieving the root (e.g. `'user'`), or when this value is not an object or an array, an object is [returned](https://github.com/crshmk/use-local-storage/blob/6242662d944ba2e9bb5f3d5a96ceaeda4972870b/src/parse/__tests__/unstring.test.js#L38). Malformed [arrays](https://github.com/crshmk/use-local-storage/blob/6242662d944ba2e9bb5f3d5a96ceaeda4972870b/src/parse/__tests__/unstring.test.js#L27) return an empty array. I prefer [emptiness](https://github.com/crshmk/utils?tab=readme-ov-file#isabsent) to truthiness. 

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
// typed as User
userStorge.read()

// get the name of the first preference 
// nested props should pass a type
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
    const newOrders = [...orders, newOrder]
    setOrders(newOrders)
    ordersStorage.update(newOrders)
  }

   const clearOrders = () => {
    setOrders([])
    ordersStorage.unset()
  }

  const getStoredOrder = (orderIndex: number) => 
    ordersStorage.read<Order>([orderIndex])

  const getStoredOrderName = (orderIndex: number, itemIndex: number) => 
    ordersStorage.read<string>([orderIndex, 'orderItems', itemIndex, 'name'])

  useEffect(() => {
    const storedOrders = ordersStorage.read()
    if(Array.isArray(storedOrders)) {
      setOrders(storedOrders)
    }
  }, [])

  return {
    addOrder,
    clearOrders,
    getStoredOrder,
    getStoredOrderName,
    orders, 
    ordersStorage,
    setOrders
  }
 }
```