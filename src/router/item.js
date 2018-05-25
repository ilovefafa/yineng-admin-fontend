import Layout from '../views/layout/Layout'

export default [
  {
    path: '/ProjectManagement',
    component: Layout,
    redirect: '/ProjectManagement/CurrentItem',
    name: 'ProjectManagement',
    meta: { title: '项目管理', icon: 'example' },
    children: [
      {
        path: 'CurrentItem',
        name: 'CurrentItem',
        component: () => import('@/views/item/CurrentItem/index'),
        meta: { title: '实时项目', icon: 'table' }
      },
      {
        path: 'HistoryItem',
        name: 'HistoryItem',
        component: () => import('@/views/item/HistoryItem/index'),
        meta: { title: '历史项目', icon: 'table' }
      },
      {
        path: 'NewItem',
        name: 'NewItem',
        component: () => import('@/views/item/NewItem/index'),
        hidden: true,
        meta: { title: '新建项目' }
        // component: NewItem
      },
      {
        path: 'EditItem',
        name: 'EditItem',
        hidden: true,
        component: () => import('@/views/item/EditItem/index'),
        meta: { title: '编辑项目' }
      }
    ]
  }

]
