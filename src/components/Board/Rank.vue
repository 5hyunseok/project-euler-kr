<template>
  <div id="problems_table_page" v-if="loadComplete">
  <h2>랭킹</h2>
    <p>
      상위 50명 순위입니다.
    </p>
    <h4 v-if="myRating > 0">내 랭킹: {{ myRating }} </h4>    
    <div style="clear:both;"></div>
    <br>
    <el-table
      :data="ratingList"
      stripe
      border
      style="width: 100%">
      <el-table-column
        prop="rank"
        label="순위"
        width="80">
      </el-table-column>
      <el-table-column
        prop="uid"
        label="유저네임"
        width="200">
      </el-table-column>
      <el-table-column
        prop="short_message"
        label="한 줄 메세지">
      </el-table-column>
      <el-table-column
        prop="solve_count"
        label="푼 문제"
        width="80">
      </el-table-column>
      <el-table-column
        prop="post_count"
        label="포스트"
        width="80">
      </el-table-column>
      <el-table-column
        prop="thread_star_count"
        label="스타"
        width="80">
      </el-table-column>
      <el-table-column
        prop="solve_ratio"
        label="정답 비율"
        width="80">
      </el-table-column>
    </el-table>
    <br>
    
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import { baseURI } from '@/components/constants.js';

export default {
  name: 'Rank',
  data() {
    return {
      ratingList: [],
      loadComplete: true,
      myRating: 0,
    };
  },
  created() {
    this.$http.get(`${baseURI}/users/rating-list`, {
      headers: {
        'x-access-token': this.$store.getters['users/getToken'],
      },
    })
      .then((result) => {
        this.ratingList = result.data.ratingList;
        this.ratingList.forEach(element => {
          element.solve_ratio = `${element.solve_ratio}%`;
        });
        this.loadComplete = true;
        if (result.data.myRating !== null) {
          this.myRating = result.data.myRating.rank;
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
