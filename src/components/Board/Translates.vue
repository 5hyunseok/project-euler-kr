<template>
  <div id="problems_table_page" v-if="loadComplete">
  <h2>번역 게시판</h2>
    <p>
      번역하는 게시판입니다.
    </p>
    <div style="text-align:right;"><router-link :to="{ name: 'new-post' }">포스트 쓰기</router-link></div>
    <br>
    <div style="clear:both;"></div>
    <el-table
      :data="translates"
      stripe
      border
      
      style="width: 100%">
      <el-table-column
        prop="category"
        label="카테고리"
        width="100">
        <!-- <template slot-scope="scope">
          <span><el-tag color="#ACACAC" style="color: white">{{ scope.row.category }}</el-tag></span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="title"
        label="제목">
        <template slot-scope="scope">
          <span><router-link :to="{ name: 'post', params: { postId: scope.row.id }}">{{ scope.row.title }}</router-link></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="problem_id"
        label="문제번호"
        width="100">
      </el-table-column>
      <el-table-column
        prop="user.uid"
        label="글쓴이"
        width="180">
      </el-table-column>
      <el-table-column
        prop="postReplies.length"
        label="댓글 수"
        width="100">
      </el-table-column>
      <el-table-column
        prop="updated_at"
        label="작성일"
        width="200">
      </el-table-column>
    </el-table>
    <br>
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pageNumber"
        :page-size="20"
        layout="prev, pager, next"
        :total="totalPostNumber">
    </el-pagination>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import { baseURI, dateFormat, translateCategory } from '@/components/constants.js';

export default {
  name: 'Translates',
  data() {
    return {
      login: false,
      pageNumber: 1,
      totalPageNumber: 0,
      totalPostNumber: 0,
      problems: [],
      translates: [],
      loadComplete: false,
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
  created() {
    this.$http.get(`${baseURI}/auth/token-validation`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then(() => {
        this.$http.get(`${baseURI}/posts/length?category=TRANS`)
          .then((result) => {
            this.totalPageNumber = result.data.numberOfPages;
            this.totalPostNumber = result.data.numberOfPost;
          });
        this.setPosts(this.pageNumber);
        this.loadComplete = true;
      })
      .catch((error) => {
        this.$router.push({ name: 'login' });
      });
    
  },
  methods: {
    dateFormat,
    translateCategory,
    handleCurrentChange(val) {
      this.setPosts(val);
    },
    postLink(val) {
      this.$router.push({ path: `/post/${val.id}` });
    },
    setPosts(pageNumber) {
      this.$http.get(`${baseURI}/posts/?page=${pageNumber}&category=TRANS`)
      .then((result) => {
        this.translates = result.data.posts;
        this.translates.forEach(element => {
          element.created_at = this.dateFormat(element.created_at);
          element.updated_at = this.dateFormat(element.updated_at);
          element.category = this.translateCategory(element.category);
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-pagination {
  text-align: center;
}
</style>
