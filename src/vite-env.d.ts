interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_STUDENT_NAME: string
  readonly VITE_STUDENT_NIM: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
