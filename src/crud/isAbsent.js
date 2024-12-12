import { 
  anyPass, 
  isEmpty, 
  isNil
} from 'ramda'

export default anyPass([isEmpty, isNil])
