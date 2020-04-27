/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const my_routers = {
  path: '/du',
  component: Layout,
  redirect: '/du/list',
  name: 'du',
  meta: {
    title: '我的第一级菜单',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/my_views/mylist.vue'),
      name: 'list',
      meta: { title: 'list' }
    },
    {
      path: 'aaa',
      component: () => import('@/views/my_views/aaa.vue'),
      name: 'aaa',
      meta: { title: 'aaa' }
    },
    {
      path: 'bbb',
      component: () => import('@/views/my_views/bbb.vue'),
      name: 'bbb',
      meta: { title: 'bbb' }
    },
    {
      path: 'ccc',
      component: () => import('@/views/my_views/ccc.vue'),
      name: 'ccc',
      meta: { title: 'ccc' }
    }
  ]
}
export default my_routers
