type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | {[key: string]: JSONValue}

interface JSONObject {
  [k: string]: JSONValue
}

interface JSONArray extends Array<JSONValue> {}

type ParsedObjectOrArray = JSONArray | JSONObject
