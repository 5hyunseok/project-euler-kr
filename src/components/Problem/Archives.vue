<template>
  <div id="problems_table_page" v-if="loadComplete">
  <!-- <div id="cache_info">Cache update: 26 minutes</div> -->
  <div id="message" class="noprint" v-if="loginMsg">{{ loginMsg }}</div>
  <h2>문제 아카이브</h2>
    <p>
      문제 아카이브에는 1번부터 번까지의 문제가 있습니다. 혹시 가장 최근 업데이트된 10개의 문제를 풀고싶은가요? 그럴 땐 <router-link :to="{ name: 'recent' }">최근 문제</router-link> 메뉴를 이용하세요.<br> 각 문제의 제목을 클릭하면 문제를 볼 수 있고 정답을 제출할 수 있습니다.
    </p>

    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="'/archives/' + n">{{ n }}</a>
      <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='../problem/'+this.value;"></span>
    </div>
    <div style="clear:both;"></div>
    <br>
    <archive-table :problems=problems :login=login></archive-table>
    <br>
    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="'/archives/' + n">{{ n }}</a>
      <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='../problem/'+this.value;"></span>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import ArchiveTable from '@/components/Problem/ArchiveTable';
import { baseURI } from '@/components/constants.js';

export default {
  name: 'Archives',
  props: ['pageNumber'],
  components: {
    ArchiveTable,
  },
  data() {
    return {
      login: false,
      totalPageNumber: 0,
      problems: [],
      loadComplete: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
    loginMsg() {
      return this.$store.getters['users/getMsg'];
    },
  },
  created() {
    this.$http.get(`${baseURI}/problems/length`)
      .then((result) => {
        this.totalPageNumber = result.data.numberOfPages;
      });
    this.$http.get(`${baseURI}/problems/?page=${this.pageNumber}`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then((result) => {
        this.problems = result.data.problems;
        this.login = result.data.login;
        this.loadComplete = true;
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.$store.commit('users/resetToken');
          this.$router.push({ name: 'about' });
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
