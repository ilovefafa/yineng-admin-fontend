import Layout from '../views/layout/Layout'

export default [
  {
    path: '/PersonInfomation',
    component: Layout,
    redirect: '/PersonInfomation/ClientInfo',
    name: 'PersonInfomation',
    meta: { title: '人员管理', icon: 'example', roles: ['admin'] },
    children: [
      {
        path: 'ClientInfo',
        name: 'ClientInfo',
        component: () => import('@/views/personInformation/clientInfo'),
        meta: { title: '客户信息', icon: 'table', roles: ['admin'] }
      },
      {
        path: 'staffInfo',
        name: 'staffInfo',
        component: () => import('@/views/personInformation/staffInfo'),
        meta: { title: '员工信息', icon: 'table', roles: ['admin'] }
      }
    ]
  }
]
