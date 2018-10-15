<template>
  <div id="problems_table_page">
    <h2>최신 아카이브</h2>
    <p>가장 최근 업로드 된 10개의 문제입니다.</p>
    <archive-table :problems=problems></archive-table>
    <br>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import ArchiveTable from '@/components/ArchiveTable';
import { baseURI } from './constants';

export default {
  name: 'RecentArchives',
  components: {
    ArchiveTable,
  },
  data() {
    return {
      problems: [
        {
          number: 1,
          titleKr: '최근 문제 타이틀1',
          correctCount: 4,
          postCount: 500,
        },
        {
          number: 2,
          titleKr: '최근 문제 타이틀2',
          correctCount: 1,
          postCount: 350,
        },
      ],
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
  },
  created() {
    this.$http.get(`${baseURI}/problems/page-length`)
      .then((result) => {
        this.totalPageNumber = result.data.numberOfPages;
      });
    this.$http.get(`${baseURI}/problems/recent`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then((result) => {
        this.problems = result.data.problems;
        this.login = result.data.login;
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
