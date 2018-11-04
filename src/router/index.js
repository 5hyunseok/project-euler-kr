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
import NewThread from '@/components/NewThread';
import Threads from '@/components/Threads';
import Translates from '@/components/Translates';
import Rank from '@/components/Rank';
import Post from '@/components/Post';
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
      path: '*',
      name: 'not-fount',
      component: Notfound,
    },
  ],
});
