interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_STUDENT_NAME: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_USD_TO_IDR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

export {}
