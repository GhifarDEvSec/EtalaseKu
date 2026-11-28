import { useSyncExternalStore } from 'react'
import { getApiStatsSnapshot, subscribeApiStats } from '../services/apiClient'
import type { ApiRequestRecord } from '../services/apiClient'

export interface ApiStatsResult {
  requests: ApiRequestRecord[]
  total: number
  last: ApiRequestRecord | null
  lastStatus: 'aktif' | 'bermasalah'
}

export function useApiStats(): ApiStatsResult {
  const requests = useSyncExternalStore(subscribeApiStats, getApiStatsSnapshot, getApiStatsSnapshot)
  const last = requests.length > 0 ? requests[requests.length - 1] : null
  const lastStatus = last && !last.ok ? 'bermasalah' : 'aktif'

  return { requests, total: requests.length, last, lastStatus }
}
