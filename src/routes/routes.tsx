import Product from '@/pages/product'
import Home from '@/pages/home'

type defaultViewRoutesType = {
  path: string
  element: React.ReactElement | undefined
  header: boolean
  is_style: boolean // 显示特定样式
  sider: boolean
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
