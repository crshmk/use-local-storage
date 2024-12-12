import emitStorageEvent from '../emitStorageEvent'

describe('emitStorageEvent', () => {
  let dispatchEventSpy

  beforeEach(() => {
    dispatchEventSpy = jest.spyOn(window, 'dispatchEvent')
  })

  afterEach(() => {
    dispatchEventSpy.mockRestore()
  })

  it('emits a storage event with the correct configuration', () => {
    const key = 'testKey'
    const stringifiedValue = JSON.stringify({ key: 'value' })

    emitStorageEvent(key, stringifiedValue)

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1)
    const storageEvent = dispatchEventSpy.mock.calls[0][0]

    expect(storageEvent.type).toBe('storage')
    expect(storageEvent.key).toBe(key)
    expect(storageEvent.newValue).toBe(stringifiedValue)
    expect(storageEvent.storageArea).toBe(window.localStorage)
    expect(storageEvent.url).toBe(window.location.href)
  })

  it('handles an empty key and value gracefully', () => {
    emitStorageEvent('', '')

    expect(dispatchEventSpy).toHaveBeenCalledTimes(1)
    const storageEvent = dispatchEventSpy.mock.calls[0][0]

    expect(storageEvent.type).toBe('storage')
    expect(storageEvent.key).toBe('')
    expect(storageEvent.newValue).toBe('')
  })
})
