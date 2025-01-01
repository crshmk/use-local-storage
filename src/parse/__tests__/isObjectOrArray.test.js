import isObjectOrArray from '../isObjectOrArray'

describe('isObjectOrArray', () => {
  it('returns true for a string', () => {
    expect(isObjectOrArray('hello')).toBe(false)
  })

  it('returns true for a number', () => {
    expect(isObjectOrArray(42)).toBe(false)
  })

  it('returns true for a boolean', () => {
    expect(isObjectOrArray(true)).toBe(false)
    expect(isObjectOrArray(false)).toBe(false)
  })

  it('returns true for null', () => {
    expect(isObjectOrArray(null)).toBe(false)
  })

  it('returns true for undefined', () => {
    expect(isObjectOrArray(undefined)).toBe(false)
  })

  it('returns false for an object', () => {
    expect(isObjectOrArray({})).toBe(true)
    expect(isObjectOrArray({one: 1})).toBe(true)
  })

  it('returns false for an array', () => {
    expect(isObjectOrArray([])).toBe(true)
    expect(isObjectOrArray([24, 43])).toBe(true)
  })

  it('returns true for a function', () => {
    expect(isObjectOrArray(() => {})).toBe(false)
  })

  it('returns true for a symbol', () => {
    expect(isObjectOrArray(Symbol('symbol'))).toBe(false)
  })

  it('returns true for NaN', () => {
    expect(isObjectOrArray(NaN)).toBe(false)
  })
  
  it('returns true for a bigint', () => {
    expect(isObjectOrArray(42n)).toBe(false)
  })
})
