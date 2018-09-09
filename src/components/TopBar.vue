<template>
  <div class="hello">
    <div id="header" class="noprint">
      <div id="nav" class="noprint">
        <ul>
          <li><router-link :to="{ name: 'about', params: {} }">소개</router-link></li>
          <li><a href="/archives/1" title="Archives" accesskey="1">문제</a></li>
          <li><a href="/recent" title="Recent" accesskey="2">최근 문제</a></li>
          <li><a href="/news" title="News" accesskey="3">뉴스</a></li>
          <li><a href="/register" title="Register" accesskey="4">회원 가입</a></li>
          <li><a href="/login" title="Login" accesskey="5">로그인</a></li>
          <li><a href="/logout" title="Logout" accesskey="6">로그아웃</a></li>
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
