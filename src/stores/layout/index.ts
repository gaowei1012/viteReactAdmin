import { observable, makeObservable, toJS } from 'mobx'

export class LayoutStore {
  collapsed: boolean = false
  logoTitle: string = ''
  visibled: boolean = false
  constructor() {
    makeObservable(this, {
      collapsed: observable,
      visibled: observable,
      logoTitle: observable,
    })
  }

  setCollapsedState(collapsed: boolean) {
    this.collapsed = collapsed
  }

  setLogoTitle(title: string) {
    this.logoTitle = title
  }

  setVisibledState(visibled: boolean) {
    this.visibled = visibled
  }

  getCollapsedState() {
    return toJS(this.collapsed)
  }

  getLogoTitle() {
    return toJS(this.logoTitle)
  }

  getVisibledState() {
    return toJS(this.visibled)
  }
}
