import unset from '../unset'

describe('unset', () => {
  const namespace = 'testNamespace'

  beforeEach(() => {
    localStorage.clear()
  })

  it('removes the entire namespace if no path is provided', () => {
    localStorage.setItem(namespace, JSON.stringify({ key: 'value' }))

    const initialData = localStorage.getItem(namespace)
    expect(initialData).not.toBeNull() 

    unset(namespace)()

    const finalData = localStorage.getItem(namespace)
    expect(finalData).toBeNull() 
  })

  it('removes a nested property when a valid path is provided', () => {
    const initialData = {
      user: {
        name: 'John',
        age: 30,
      },
      settings: {
        theme: 'dark',
      },
    }
    localStorage.setItem(namespace, JSON.stringify(initialData))

    unset(namespace)(['user', 'name'])

    const updatedData = JSON.parse(localStorage.getItem(namespace))
    expect(updatedData).toEqual({
      user: {
        age: 30,
      },
      settings: {
        theme: 'dark',
      },
    })
  })

  it('does nothing if the path does not exist in the namespace', () => {
    const initialData = {
      user: {
        name: 'John',
        age: 30,
      },
    }
    localStorage.setItem(namespace, JSON.stringify(initialData))

    unset(namespace)(['nonexistent', 'path'])

    const finalData = JSON.parse(localStorage.getItem(namespace))
    expect(finalData).toEqual(initialData)
  })

  it('emits storage event when namespace is removed', () => {
    localStorage.setItem(namespace, JSON.stringify({ key: 'value' }))

    const spy = jest.spyOn(window, 'dispatchEvent')

    unset(namespace)()

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0].type).toBe('storage')
    spy.mockRestore()
  })
})
