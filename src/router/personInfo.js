import Layout from '../views/layout/Layout'

export default [
  {
    path: '/PersonInfomation',
    component: Layout,
    redirect: '/PersonInfomation/ClientInfo',
    name: 'PersonInfomation',
    meta: { title: '人员管理', icon: 'example' },
    children: [
      {
        path: 'ClientInfo',
        name: 'ClientInfo',
        component: () => import('@/views/personInfomation/clientInfo.vue'),
        meta: { title: '客户信息', icon: 'table' },
        hidden: true
      },
      {
        path: 'SalesmanInfo',
        name: 'SalesmanInfo',
        component: () => import('@/views/personInfomation/salesmanInfo.vue'),
        meta: { title: '业务员信息', icon: 'table' },
        hidden: true
      }
    ]
  }
]
