<template>
  <div id="problems_table_page">
  <h2>랭킹</h2>
    <p>
      문제 푼 순위
    </p>
    <div style="clear:both;"></div>
    <br>
    <rank-table :users=users></rank-table>
    <br>
    
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import RankTable from '@/components/RankTable';
import { baseURI } from './constants';

export default {
  name: 'Rank',
  components: {
    RankTable,
  },
  data() {
    return {
      users: [
        {
          id: 1,
          username: '5hyunseok',
          msg: 'hi',
          answerCount: 24,
          translateCount: 12,
          postCount: 15,
          starCount: 223,
          answerRatio: '95.558%',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
