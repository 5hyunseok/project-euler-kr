import Vue from 'vue';
import Router from 'vue-router';

import About from '@/components/Static/About';
import Notfound from '@/components/Static/Notfound';
import NotSupport from '@/components/Static/NotSupport';

import Archives from '@/components/Problem/Archives';
import Recent from '@/components/Problem/RecentArchive';
import Problem from '@/components/Problem/Problem';

import Login from '@/components/User/Login';
import Register from '@/components/User/Register';
import Mypage from '@/components/User/Mypage';

import NewThread from '@/components/Thread/NewThread';
import Threads from '@/components/Thread/Threads';

import Translates from '@/components/Board/Translates';
import Rank from '@/components/Board/Rank';
import Post from '@/components/Board/Post';
import NewPost from '@/components/Board/NewPost';
import News from '@/components/Board/News';

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
      path: '/new-thread/:problemNumber',
      name: 'new-thread',
      component: NewThread,
      props: true,
    },
    {
      path: '/threads/:problemNumber',
      redirect: '/threads/:problemNumber/1',
    },
    {
      path: '/threads/:problemNumber/:pageNumber',
      name: 'threads',
      component: Threads,
      props: true,
    },
    {
      path: '/translate',
      name: 'translate',
      component: Translates,
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/post/:postId',
      name: 'post',
      component: Post,
      props: true,
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: NewPost,
      props: true,
    },
    {
      path: '/not-support',
      name: 'not-support',
      component: NotSupport,
    },
    {
      path: '*',
      name: 'not-fount',
      component: Notfound,
    },
  ],
});
