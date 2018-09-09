<template>
  <div class="hello">
    <div id="header" class="noprint">
      <div id="nav" class="noprint">
        <ul>
          <li><router-link :to="{ name: 'about', params: {} }">소개</router-link></li>
          <li><router-link :to="{ name: 'archives', params: { pageNumber: 1 } }">문제</router-link></li>

          <li><router-link :to="{ name: 'recent' }">최근 문제</router-link></li>
          <li><router-link :to="{ name: 'news' }">뉴스</router-link></li>
          <li><router-link :to="{ name: 'register' }">회원 가입</router-link></li>
          <li><router-link :to="{ name: 'login' }">로그인</router-link></li>
          <li><a href="#logout">로그아웃</a></li>
        </ul>
      </div>
      <div id="logo" class="noprint">
         <div>Project Euler<span>.net</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hi',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
