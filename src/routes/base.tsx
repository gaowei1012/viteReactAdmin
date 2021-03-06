import * as React from 'react'
import { useLocation, Routes, Route, Outlet } from 'react-router-dom'
import DefaultLayout from '@/layout/layout'
import routes from '@/routes/routes'

// layout view
import AppSider from '@/layout/sider'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/hooks/useStore'
import AppHeader from '@/layout/header'
import _ from 'lodash'

const BaseRoutes = observer(() => {
  const { layoutInstance } = useStore()
  const location = useLocation()
  const renderDefaultLayout = () => {
    let obj: any = {}
    _.map(routes, r => {
      if (new RegExp('^' + r.path.replace(/:(\w+)/g, '\\w+') + '$').test(location.pathname)) {
        obj = r
        return obj
      }
    })

    // 加载header头部
    const renderHeader = () => {
      return <>{obj['header'] ? <AppHeader isStyle={obj['is_style']} collapsed={layoutInstance.getCollapsedState()} {...obj} /> : <></>}</>
    }

    // 加载左侧sider
    const renderSider = () => {
      return <>{obj['sider'] ? <AppSider collapsed={layoutInstance.getCollapsedState()} logoTitle={layoutInstance.getLogoTitle()} /> : <></>}</>
    }

    return <DefaultLayout appHeader={renderHeader()} appSider={renderSider()} routeOutlet={<Outlet />} {...obj} />
  }
  const renderRoute = () => (
    <Routes>
      <Route path='/' element={renderDefaultLayout()}>
        {routes.map((route: { sider: boolean; path: string; element: any; header: boolean }, idx: number) => {
          return <Route key={idx} path={route.path} element={route.element} />
        })}
      </Route>
    </Routes>
  )
  return <>{renderRoute()}</>
})

export default BaseRoutes
