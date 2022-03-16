import { LoadingStore } from './loading'
import { LayoutStore } from './layout'

export type RootStoreInterface = {
  loadingInstance: LoadingStore
  layoutInstance: LayoutStore
}

export const rootStore = {
  loadingInstance: new LoadingStore(),
  layoutInstance: new LayoutStore(),
}
