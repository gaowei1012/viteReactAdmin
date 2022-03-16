import Product from '@/pages/product'
import Home from '@/pages/home'

type defaultViewRoutesType = {
  path: string
  element: React.ReactElement | undefined
  header: boolean
  sider: boolean
}

const routes: Array<defaultViewRoutesType> = [
  {
    path: '/home',
    element: <Home />,
    header: true,
    sider: false,
  },
  {
    path: '/product',
    element: <Product />,
    header: false,
    sider: true,
  },
]

export default routes
