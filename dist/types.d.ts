declare type JSONValue = string | number | boolean | null | JSONValue[] | {
    [key: string]: JSONValue;
};
declare interface JSONObject {
    [k: string]: JSONValue;
}
declare interface JSONArray extends Array<JSONValue> {
}
declare type ParsedObjectOrArray = JSONArray | JSONObject;
