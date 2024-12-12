import read from '../read'

describe('read', () => {
  const namespace = 'testNamespace'

  beforeEach(() => {
    localStorage.clear()
  })

  it('returns undefined if the namespace key does not exist in localStorage', () => {
    const result = read(namespace)()
    expect(result).toBeUndefined()
  })

  it('returns the namespace if no path is provided', () => {
    const mockData = { key: 'value' }
    localStorage.setItem(namespace, JSON.stringify(mockData))

    const result = read(namespace)()
    expect(result).toEqual(mockData)
  })

  it('returns a nested value', () => {
    const mockData = { user: { name: 'John Doe', age: 30 } }
    localStorage.setItem(namespace, JSON.stringify(mockData))

    const result = read(namespace)(['user', 'name'])
    expect(result).toEqual('John Doe')
  })

  it('returns undefined if the path does not exist in the namespace', () => {
    const mockData = { user: { name: 'John Doe', age: 30 } }
    localStorage.setItem(namespace, JSON.stringify(mockData))

    const result = read(namespace)(['user', 'nonexistent'])
    expect(result).toBeUndefined()
  })

  it('handles empty or invalid data in localStorage gracefully', () => {
    localStorage.setItem(namespace, '')
    const result = read(namespace)()
    expect(result).toBeUndefined()

    localStorage.setItem(namespace, 'invalid-json')
    const resultInvalid = read(namespace)()
    expect(resultInvalid).toStrictEqual({})
  })
})
