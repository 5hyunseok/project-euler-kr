import Vue from 'vue';
import Router from 'vue-router';
import About from '@/components/About';
import Archives from '@/components/Archives';
import News from '@/components/News';
import Recent from '@/components/RecentArchive';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Notfound from '@/components/Notfound';
import Problem from '@/components/Problem';
import Mypage from '@/components/Mypage';
import NewPost from '@/components/NewPost';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: About,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/archives/:pageNumber',
      name: 'archives',
      component: Archives,
      props: true,
    },
    {
      path: '/problem/:problemNumber',
      name: 'problem',
      component: Problem,
      props: true,
    },
    {
      path: '/news',
      name: 'news',
      component: News,
    },
    {
      path: '/recent',
      name: 'recent',
      component: Recent,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage,
    },
    {
      path: '/new-post/:problemNumber',
      name: 'new-post',
      component: NewPost,
      props: true,
    },
    {
      path: '*',
      name: 'not-fount',
      component: Notfound,
    },
  ],
});
