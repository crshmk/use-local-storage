import isObjectOrArray from './isObjectOrArray'

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
const parse: (json: string) => ParsedObjectOrArray = json => {

  let parsed: ParsedObjectOrArray = {}

  try {
    parsed = JSON.parse(json)
    return isObjectOrArray(parsed) ? parsed : {}
  } catch(e) {    
    if(typeof json === 'string' && json.length > 0 && json.charAt(0) === '[') {
      return []
    }
    return parsed 
  }
}

export default parse 