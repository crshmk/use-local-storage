import receiveStorageEvent from '../receiveStorageEvent'
import parse from 'unstring'

jest.mock('unstring', () => jest.fn())

describe('receiveStorageEvent', () => {
  let callback

  beforeEach(() => {
    callback = jest.fn()
    jest.clearAllMocks()
  })

  it('calls the callback with parsed newValue when newValue exists', () => {
    const mockParsedValue = { key: 'value' }
    parse.mockReturnValue(mockParsedValue)

    const event = {
      newValue: JSON.stringify(mockParsedValue),
    }

    const listener = receiveStorageEvent(callback)
    listener(event)

    expect(parse).toHaveBeenCalledWith(event.newValue)
    expect(callback).toHaveBeenCalledWith(mockParsedValue)
  })

  it('does not call the callback if cb is not a function', () => {
    const listener = receiveStorageEvent(null)
    const event = {
      newValue: JSON.stringify({ key: 'value' }),
    }

    listener(event)

    expect(callback).not.toHaveBeenCalled()
    expect(parse).not.toHaveBeenCalled()
  })

  it('does not call the callback if newValue is null', () => {
    const event = {
      newValue: null,
    }

    const listener = receiveStorageEvent(callback)
    listener(event)

    expect(parse).not.toHaveBeenCalled()
    expect(callback).not.toHaveBeenCalled()
  })

  it('handles invalid JSON in newValue gracefully', () => {
    const event = {
      newValue: 'invalid-json',
    }
  
    parse.mockReturnValue(undefined)
  
    const listener = receiveStorageEvent(callback)
    listener(event)
  
    expect(parse).toHaveBeenCalledWith(event.newValue)
    expect(callback).not.toHaveBeenCalled()
  })
})
