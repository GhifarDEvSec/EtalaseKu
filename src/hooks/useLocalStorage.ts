import { useCallback, useEffect, useState } from 'react'

type SetValue<T> = (value: T | ((previous: T) => T)) => void

function readStoredValue<T>(key: string, initialValue: T): T {
  try {
    const item = window.localStorage.getItem(key)

    if (item === null) {
      return initialValue
    }

    return JSON.parse(item) as T
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => readStoredValue(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      return
    }
  }, [key, storedValue])

  const setValue = useCallback<SetValue<T>>((value) => {
    setStoredValue((previous) =>
      typeof value === 'function' ? (value as (previous: T) => T)(previous) : value,
    )
  }, [])

  return [storedValue, setValue]
}
