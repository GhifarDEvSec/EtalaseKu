import { useEffect } from 'react'
import { appConfig } from '../config'

export function usePageTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} · ${appConfig.appName}`
  }, [title])
}
