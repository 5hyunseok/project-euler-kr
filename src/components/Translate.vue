<template>
  <div id="problems_table_page">
    pageNumber: {{ pageNumber }}<br>
    totalPageNumber: {{ totalPageNumber }}<br>
    login: {{ login }}
  <!-- <div id="cache_info">Cache update: 26 minutes</div> -->
  <h2>번역 게시판</h2>
    <p>
      번역하는 게시판입니다.
    </p>

    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="'/archives/' + n">{{ n }}</a>
      <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='../problem/'+this.value;"></span>
    </div>
    <div style="clear:both;"></div>
    <br>
    <translate-table :translates=translates></translate-table>
    <br>
    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="'/archives/' + n">{{ n }}</a>
      <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='../problem/'+this.value;"></span>
    </div>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import TranslateTable from '@/components/TranslateTable';
import { baseURI } from './constants';

export default {
  name: 'Archives',
  props: ['pageNumber'],
  components: {
    TranslateTable,
  },
  data() {
    return {
      login: false,
      totalPageNumber: 0,
      problems: [],
      translates: [
        {
          id: 1,
          category: '번역',
          title: '23번 번역합니다',
          problem_number: 23,
          writer: '5hyunseok',
          comment_number: 1,
          created_at: '2018-10-24 16:15:52',
        },
        {
          id: 2,
          category: '오타',
          title: '1번 문제 오타 있어서 글씁니당',
          problem_number: 1,
          writer: '5hyunseok',
          comment_number: 5,
          created_at: '2018-10-24 16:21:55',

        }
      ],
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
  },
  created() {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
