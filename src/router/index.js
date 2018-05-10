import Vue from 'vue'
import Router from 'vue-router'
import MainContent from '@/components/MainContent'
import TopicList from '@/components/TopicList'
import TopicContent from '@/components/TopicContent'
import UserInfo from '@/components/UserInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainContent',
      component: MainContent,
      children: [
        {
          path: '',
          name: 'topicList',
          component: TopicList
        },
        {
          path: 'topicContent/:id',
          name: 'topicContent',
          component: TopicContent
        }
      ]
    },
    {
      path: '/userInfo/:loginname',
      name: 'userInfo',
      component: UserInfo
    }
  ]
})
