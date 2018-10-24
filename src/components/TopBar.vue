<template>
  <div class="hello">
    <div id="header" class="noprint">
      <div id="nav" class="noprint">
        <ul>
          <li v-bind:id="routeName == 'about' ? 'current' : ''"><router-link :to="{ name: 'about', params: {} }">소개</router-link></li>
          <li v-bind:id="routeName == 'archives' ? 'current' : ''"><router-link :to="{ name: 'archives', params: { pageNumber: 1 } }">문제</router-link></li>

          <li v-bind:id="routeName == 'recent' ? 'current' : ''"><router-link :to="{ name: 'recent' }">최근 문제</router-link></li>
          <li v-if="token" v-bind:id="routeName == 'mypage' ? 'current' : ''"><router-link :to="{ name: 'mypage' }">내 계정</router-link></li>
          <li v-bind:id="routeName == 'news' ? 'current' : ''"><router-link :to="{ name: 'news' }">뉴스</router-link></li>
          <li v-if="!token" v-bind:id="routeName == 'register' ? 'current' : ''"><router-link :to="{ name: 'register' }">회원 가입</router-link></li>
          <li v-if="!token" v-bind:id="routeName == 'login' ? 'current' : ''"><router-link :to="{ name: 'login' }">로그인</router-link></li>
          <li v-if="token"><a href="#logout" v-on:click="logout">로그아웃</a></li>
        </ul>
      </div>
      <div id="logo" class="noprint">
         <div>Project Euler<span>.net</span></div>
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

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hi',
      testToken: '',
      routeName: '',
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
    username() {
      return this.$store.getters['users/getUsername'];
    },
  },
  methods: {
    logout() {
      this.$store.commit('users/resetToken');
      this.$router.push({ name: 'about' });
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

</style>
