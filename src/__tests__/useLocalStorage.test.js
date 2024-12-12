import { renderHook, act } from '@testing-library/react'
import useLocalStorage from '..'
import emitStorageEvent from '../emitStorageEvent'

describe('useLocalStorage', () => {
  const namespace = 'testNamespace'
  const eventCb = jest.fn()

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('sets up and cleans up the storage event listener', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useLocalStorage(namespace, eventCb))

    expect(addEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function))

    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith('storage', expect.any(Function))

    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
  })

  it('exposes crud methods for a namespace', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { read: readFn, update: updateFn, unset: unsetFn } = result.current
  
    act(() => {
      updateFn({ key: 'value' })
    })
    expect(localStorage.getItem(namespace)).toBe(JSON.stringify({ key: 'value' }))
  
    // sync 
    const data = readFn()
    expect(data).toEqual({ key: 'value' })
  
    // async
    act(() => {
      unsetFn(['key'])
    })
    expect(localStorage.getItem(namespace)).toBe('{}')
  })

  it('handles reading and updating nested data', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { read: readFn, update: updateFn } = result.current
  
    act(() => {
      updateFn(
        {
          user: {
            name: 'John',
            details: {
              age: 30,
              city: 'New York',
            },
          },
        },
      )
    })
    expect(localStorage.getItem(namespace)).toBe(
      JSON.stringify({
        user: {
          name: 'John',
          details: {
            age: 30,
            city: 'New York',
          },
        },
      }),
    )
  
    const userName = readFn(['user', 'name'])
    expect(userName).toBe('John')
  
    const userAge = readFn(['user', 'details', 'age'])
    expect(userAge).toBe(30)
  
    act(() => {
      updateFn('Los Angeles', ['user', 'details', 'city'])
    })
  
    const updatedCity = readFn(['user', 'details', 'city'])
    expect(updatedCity).toBe('Los Angeles')
  
    const fullData = readFn()
    expect(fullData).toEqual({
      user: {
        name: 'John',
        details: {
          age: 30,
          city: 'Los Angeles',
        },
      },
    })
  })
  
  it('handles storage events', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))

    const testData = { key: 'value' }
    act(() => {
      localStorage.setItem(namespace, JSON.stringify(testData))
      emitStorageEvent(namespace, JSON.stringify(testData))
    })

    expect(eventCb).toHaveBeenCalledWith(testData)
  })

  it('returns undefined when reading a non-existent path', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { read: readFn } = result.current
  
    const nonexistentData = readFn(['nonexistent', 'path'])
    expect(nonexistentData).toBeUndefined()
  })
  
  it('returns undefined when the namespace does not exist', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { read: readFn } = result.current
  
    const data = readFn()
    expect(data).toEqual(undefined)
  })
  
  it('handles invalid JSON in localStorage gracefully', () => {
    localStorage.setItem(namespace, 'invalid-json')
  
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { read: readFn } = result.current
  
    const data = readFn()
    expect(data).toEqual({})
  })
  
  it('does not throw when updating a path in a non-existent namespace', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { update: updateFn } = result.current
  
    act(() => {
      updateFn('value', ['nonexistent', 'path'])
    })
  
    const data = JSON.parse(localStorage.getItem(namespace))
    expect(data).toEqual({ nonexistent: { path: 'value' } })
  })
  
  it('does not throw when unsetting a path in a non-existent namespace', () => {
    const { result } = renderHook(() => useLocalStorage(namespace, eventCb))
    const { unset: unsetFn } = result.current
  
    act(() => {
      unsetFn(['nonexistent', 'path'])
    })
  
    const data = localStorage.getItem(namespace)
    expect(data).toBeNull()
  })
})
