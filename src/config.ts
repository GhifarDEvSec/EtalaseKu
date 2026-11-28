function readUsdToIdr(): number {
  const parsed = Number(import.meta.env.VITE_USD_TO_IDR)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 16000
}

export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME,
  studentName: import.meta.env.VITE_STUDENT_NAME,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  usdToIdr: readUsdToIdr(),
}

export default appConfig
