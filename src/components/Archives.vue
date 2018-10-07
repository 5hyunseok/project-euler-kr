<template>
  <div id="problems_table_page">
    pageNumber: {{ pageNumber }}<br>
    totalPageNumber: {{ totalPageNumber }}<br>
    login: {{ login }}
  <!-- <div id="cache_info">Cache update: 26 minutes</div> -->
  <h2>문제 아카이브</h2>
    <p>
      문제 아카이브에는 1번부터 번까지의 문제가 있습니다. 혹시 가장 최근 업데이트된 10개의 문제를 풀고싶은가요? 그럴 땐 <a href="/recent">최근 문제</a> 메뉴를 이용하세요.<br> 각 문제의 제목을 클릭하면 문제를 볼 수 있고 정답을 제출할 수 있습니다.
    </p>

    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="'/archives/' + n">{{ n }}</a>
      <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='problem='+this.value;"></span>
    </div>
    <div style="clear:both;"></div>
    <br>
    <archive-table :problems=problems :login=login></archive-table>
    <br>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import ArchiveTable from '@/components/ArchiveTable';

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
      problems: [
        {
          number: 1,
          titleKr: '샘플 문제 타이틀1',
          correctCount: 10,
          postCount: 150,
        },
        {
          number: 2,
          titleKr: '샘플 문제 타이틀2',
          correctCount: 15,
          postCount: 250,
        },
      ],
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
  },
  created() {
    const baseURI = 'http://localhost:3000/api';
    this.$http.get(`${baseURI}/problems/page-length`)
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
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
