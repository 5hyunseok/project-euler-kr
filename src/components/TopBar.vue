<template>
  <div class="hello">
    <div id="header" class="noprint">
      <div id="nav" class="noprint">
        <ul>
          <li v-bind:id="isCurrent('about')"><router-link :to="{ name: 'about', params: {} }">소개</router-link></li>

          <!-- <li v-bind:id="routeName === 'about' ? 'current' : ''"><router-link :to="{ name: 'about', params: {} }">소개</router-link></li> -->
          <li v-bind:id="isCurrent('archives')"><router-link :to="{ name: 'archives', params: { pageNumber: 1 } }">문제</router-link></li>

          <li v-bind:id="isCurrent('recent')"><router-link :to="{ name: 'recent' }">최근 문제</router-link></li>
          <li v-if="token" v-bind:id="isCurrent('mypage')"><router-link :to="{ name: 'mypage' }">내 계정</router-link></li>
          <li v-if="token" v-bind:id="isCurrent('translate')"><router-link :to="{ name: 'translate', params: { pageNumber: 1 } }">번역하기</router-link></li>
          <li v-bind:id="isCurrent('news')"><router-link :to="{ name: 'news' }">뉴스</router-link></li>
          <li v-bind:id="isCurrent('rank')"><router-link :to="{ name: 'rank' }">랭킹</router-link></li>
          <li v-if="!token" v-bind:id="isCurrent('register')"><router-link :to="{ name: 'register' }">회원 가입</router-link></li>
          <li v-if="!token" v-bind:id="isCurrent('login')"><router-link :to="{ name: 'login' }">로그인</router-link></li>
          <li v-if="token"><a href="#logout" v-on:click="logout">로그아웃</a></li>
        </ul>
      </div>
      <div id="logo_modified">
        <router-link :to="{ name: 'about' }"><img :src=logo></router-link>
      </div>
    </div>
    <div id="info_panel" v-if="token">
      <div><strong>{{ username }}</strong> - 로그인 됨</div>
      <!-- <a href="search"><img src="images/icon_search.png" alt="Search Problems" title="Search Problems"></a>
      <a href="rss2_euler.xml"><img src="images/icon_rss.png" alt="RSS Feed" title="RSS Feed"></a> -->
    </div>
  </div>
</template>

<script>
import logo from '@/assets/style_default_logo.png';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hi',
      testToken: '',
      logo,
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
    username() {
      return this.$store.getters['users/getUsername'];
    },
    routeName() {
      return this.$route.path;
    }
  },
  methods: {
    logout() {
      this.$store.commit('users/resetToken');
      this.$router.push({ name: 'about' });
    },
    isCurrent(s) {
      if (this.routeName.includes(s)) {
        return 'current';
      } else {
        return '';
      }
    },
  },
  watch: {
    $route: (to) => {
      this.routeName = to.name;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logo_modified {
  position: absolute;
  top: 0;
  left: 11px;
  width: 250px;
  height: 45px;
  margin-right: 20px;
}
</style>
