import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import detail from '@/components/detail'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/index'],resolve),
      meta:{
        title:'育儿千问',
        index:1,
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: resolve =>require(['@/components/detail'],resolve),
      meta:{
        title:'',
        index:2,
      },
    },
  ]
})
