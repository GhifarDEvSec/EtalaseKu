export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME,
  studentName: import.meta.env.VITE_STUDENT_NAME,
  studentNim: import.meta.env.VITE_STUDENT_NIM,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
} as const

export default appConfig
