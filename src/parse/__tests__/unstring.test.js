import unstring from '..'

describe('unstring util', () => {
  it('parses a valid object', () => {
    const jsonString = '{"name": "John", "age": 30}'
    const result = unstring(jsonString)
    
    expect(result).toEqual({
      name: 'John',
      age: 30,
    })
  })

  it('parses a valid array', () => {
    expect(unstring('[1, 2, 3]')).toEqual([1, 2, 3])
    expect(unstring('[]')).toEqual([])
  })

  it('returns an empty object when attempting an invalid object', () => {
    expect(unstring('{"name": "John", "age":}')).toEqual({})
    expect(unstring("{ key: 'value' }")).toEqual({})

    const invalidNestedJson = '{"name": "John", "details": { "age": 30, }}'
    expect(unstring(invalidNestedJson)).toEqual({})
  })

  it('returns an empty array when attempting an invalid array', () => {
    expect(unstring('[1, 2, 3')).toEqual([])
    expect(unstring('[1, 2, { "key": "value" },]')).toEqual([])
  })

  it('returns an empty object when valid primitive would not be an object or array', () => {
    expect(unstring(true)).toStrictEqual({})
    expect(unstring(false)).toStrictEqual({})
    expect(unstring(42)).toStrictEqual({})
  })

  it('returns an empty object when a value does not parse', () => {
    expect(unstring('')).toStrictEqual({})
    expect(unstring(null)).toStrictEqual({})
    expect(unstring(undefined)).toStrictEqual({})
    expect(unstring(function() {})).toStrictEqual({})
    expect(unstring(() => {})).toStrictEqual({})
    expect(unstring(1234567890123456789012345678901234567890n)).toStrictEqual({})
    expect(unstring(Symbol('symbol'))).toStrictEqual({})
    expect(unstring(NaN)).toStrictEqual({})
  })})
