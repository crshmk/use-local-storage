/**
 * Excludes the following from parsing:
 *  string, number, boolean, null, undefined, symbol NaN, function, bigint.
 *
 * Approves objects and arrays for parsing
 *
 * @param value any
 * @returns boolean
 */
declare const isObjectOrArray: (value: any) => boolean;
export default isObjectOrArray;
