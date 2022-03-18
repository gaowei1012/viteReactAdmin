/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 开发环境
  readonly DEV_API_BASE_URL: string
  readonly DEV_API_PORT: string

  // 上线环境
  readonly LOCAL_API_BASE_URL: string
  readonly LOCAL_API_PORT: string

  // docker环境
  readonly DOCKER_API_BASE_URL: string
  readonly DOCKER_API_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
