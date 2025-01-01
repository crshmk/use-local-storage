import { 
  anyPass, 
  isEmpty, 
  isNil
} from 'ramda'

type T = (x: unknown) => boolean

const isAbsent: T = anyPass([isEmpty, isNil])

export default isAbsent
