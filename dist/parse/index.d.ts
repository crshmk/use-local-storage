/**
 * Safely parse jason without explicit try / catch
 *
 * Always returns an object or array
 * - primitives, null, etc return an empty object
 * - malformed objects return an empty object
 * - malfomred arrays return an empty array
 *
 * @param json
 * @returns object or array
 */
declare const parse: (json: string) => ParsedObjectOrArray;
export default parse;
