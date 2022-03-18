import Product from '@/pages/product'
import Home from '@/pages/home'

type defaultViewRoutesType = {
  path: string
  element: React.ReactElement | undefined
  header: boolean // 是否展示头部
  is_style: boolean // 显示特定样式
  sider: boolean // 是否显示左侧菜单
}

const routes: Array<defaultViewRoutesType> = [
  {
    path: '/home',
    element: <Home />,
    header: true,
    is_style: true,
    sider: false,
  },
  {
    path: '/product',
    element: <Product />,
    header: true,
    is_style: false,
    sider: true,
  },
]

export default routes
