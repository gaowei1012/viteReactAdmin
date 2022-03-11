import { CloudOutlined, DesktopOutlined } from '@ant-design/icons'

export const menu = [
  {
    name: '用户管理',
    icon: CloudOutlined,
    subs: [
      {
        path: '/user/sys',
        name: '系统用户',
        icon: CloudOutlined,
      },
      {
        path: '/user/general',
        name: '业务用户',
        icon: CloudOutlined,
      },
      {
        path: '/user/leave',
        name: '待职员工',
        icon: CloudOutlined,
      },
    ],
  },
  {
    path: '/organization',
    name: '组织机构管理',
    icon: DesktopOutlined,
  },
  {
    path: '/roles',
    name: '角色管理',
    icon: DesktopOutlined,
  },
]
