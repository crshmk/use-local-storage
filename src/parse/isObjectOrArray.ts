// value !== value -> NaN check

/**
 * Excludes the following from parsing:
 *  string, number, boolean, null, undefined, symbol NaN, function, bigint.
 * 
 * Approves objects and arrays for parsing
 * 
 * @param value any
 * @returns boolean 
 */
const isObjectOrArray = (value: any): boolean =>
  typeof value === 'object' && value !== null

export default isObjectOrArray
