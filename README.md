## `useLocalStorage` React hook

- Namespaced approach where the hook defines a root prop (e.g. `user`) that holds an object or an array. 
- `update`, `read`, or `unset` a namespace (e.g. `'user'`), or a nested prop (e.g. `user.preferences.isDarkMode`) with a [path](https://ramdajs.com/docs/#path).
- Values are stringified (in) / parsed (out).
- An optional callback receives updates from other tabs on `update` or `unset`.
- When parsing fails when reading the root (e.g. `'user'`), or when this value is not an object or an array, an object is [returned](https://github.com/crshmk/use-local-storage/blob/6242662d944ba2e9bb5f3d5a96ceaeda4972870b/src/parse/__tests__/unstring.test.js#L38). Malformed [arrays](https://github.com/crshmk/use-local-storage/blob/6242662d944ba2e9bb5f3d5a96ceaeda4972870b/src/parse/__tests__/unstring.test.js#L27) return an empty array. Unset or malformed nested values return as `undefined`.

---


#### 1. Create a namespace in localStorage 

```javascript 
import useLocalStorage from 'use-ls'

const { read, update, unset } = useLocalStorage<User>('user')
```

---


#### 2. CRUD the storage with hook methods 

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

const userStorage = useLocalStorage<User>('user')

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


#### 3. Listen for storage events across tabs 
A callback passed to the hook receives the parsed updated namespace value on `update` and `unset` 

```javascript 
const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const ordersStorage = useLocalStorage<Order[]>('orders', setOrders) <----
```

When aligning with state, pass an empty value for the state when the namespace is unset 
```javascript 
  const [orders, setOrders] = useState<Order[]>([])
  // sets orders in state as [] when localStorage.orders is unset 
  const ordersStorage = useLocalStorage<Order[]>('orders', setOrders, []) <----
```


---


```javascript 
import useLocalStorage from 'use-ls'

type Order = {
  orderId: string 
  orderItems: {name: string}[]
}

const mockOrders: Order[] = [ 
  { orderId: '', orderItems: [{name: 'order1'}] } 
]

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const ordersStorage = useLocalStorage<Order[]>('orders', setOrders)

    useEffect(() => {
    const storedOrders = ordersStorage.read()
    if(Array.isArray(storedOrders)) {
      setOrders(storedOrders)
    }
  }, [])

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


---

