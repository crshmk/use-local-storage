import { useEffect } from 'react'

import receiveStorageEvent from './receiveStorageEvent'

import read from './crud/read'
import unset from './crud/unset'
import update from './crud/update'

/**
 * Interact with namespaced localStorage 
 * 
 * Emit storage events to other tabs
 */
const useLocalStorage = (namespace, eventCb) => {

  useEffect(() => {
    const onStore = receiveStorageEvent(eventCb)
    window.addEventListener("storage", onStore)

    return () => window.removeEventListener("storage", onStore)
  }, [])

  return {
     /**
     * Read a namespace in localStorage or a nested value at that namespace
     * 
     * @param {unknown} value parsed item value 
     * @param {(string | number)[]} path Ramda Path to nested prop 
     */
    read: read(namespace),
     /**
     * Set a namespace in localStorage or a nested value at that namespace
     * 
     * Emit the update to other tabs 
     * 
     * @param {unknown} value parsed item value 
     * @param {(string | number)[]} path Ramda Path to set nested prop, or undefined to set namespace
     */
    update: update(namespace),
    /**
     * Remove a namespace from localStorage or a nested value at that namespace
     * 
     * @param {(string | number)[] | undefined} path Ramda Path to nested prop  
     */
    unset: unset(namespace)
  }
}

module.exports = useLocalStorage