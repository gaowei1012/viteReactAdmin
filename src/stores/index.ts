import { LoadingStore } from './loading'

export type RootStoreInterface = {
  loadingInstance: LoadingStore
}

export const rootStore = {
  loadingInstance: new LoadingStore(),
}
