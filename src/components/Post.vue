<template>
  <div id="forum_page">
    <br>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ this.post.user.uid }}  ({{ dateFormat(this.post.updated_at) }})</span>
        <h2>{{ this.post.title }}</h2>
        <el-button style="float: right; padding: 0px 0; margin-right:5px;" type="text" v-if="username == this.post.user.uid" @click="deletePost"><h4>삭제</h4></el-button>
        <el-button style="float: right; padding: 0px 0; margin-right:5px;" type="text" v-if="username == this.post.user.uid" @click="modifyPost"><h4>수정</h4></el-button>
      </div>
      <div class="text item">
        {{ post.content }}
      </div>
    </el-card>
    <br>
    <el-card class="box-card-reply" v-for="reply in replies" :key="reply.id">
      <span>{{ reply.user.uid }}  ({{ dateFormat(reply.updated_at) }})</span>
      <el-button style="float: right; padding: 0px 0; margin-right:5px;" type="text" v-if="username == reply.user.uid" @click="deleteReply(reply.id)"><h5>삭제</h5></el-button>
      <!-- <el-button style="float: right; padding: 0px 0; margin-right:5px;" type="text" v-if="username == reply.user.uid"><h5>수정</h5></el-button> -->
      <div class="text item">
        {{ reply.content }}
      </div>
      
    </el-card>
    <br><br>
    <el-form label-width="120px">
      <el-form-item label="댓글쓰기">
        <el-input type="textarea" :rows="10" v-model="textarea"></el-input>
      </el-form-item>
      <el-form-item style="float:right">
        <el-button type="primary" @click="replySubmit" class="eulerBtn">댓글 등록</el-button>
        <el-button>취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { baseURI, dateFormat, translateCategory } from './constants';
import Thread from '@/components/Thread';

export default {
  name: 'Post',
  props: ['postId'],
  components: {
    Thread,
  },
  data() {
    return {
      post: {},
      replies: [],
      textarea: '',
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
    this.setPostContent();
  },
  methods: {
    dateFormat,
    translateCategory,
    setPostContent() {
      this.$http.get(`${baseURI}/posts/${this.postId}`)
        .then((result) => {
          this.post = result.data.post;
          this.replies = result.data.post.postReplies;
          this.post.category = this.translateCategory(this.post.category);
        });
    },
    replySubmit() {
      if (this.textarea !== '') {
        this.$http.post(`${baseURI}/posts/${this.post.id}/replies`, {
          content: this.textarea,
        }, {
          headers: {
            'x-access-token': this.$store.getters['users/getToken'],
          },
        })
          .then(() => {
            this.textarea = '';
            this.setPostContent();
          });  
      }  
    },
    deletePost() {
      if (confirm('삭제하시겠습니까?')) {
        this.$http.delete(`${baseURI}/posts/${this.post.id}`, {
          headers: {
            'x-access-token': this.$store.getters['users/getToken'],
          },
        })
          .then(() => {
            if (this.post.category === 'TRANS') {
              this.$router.push({ path: `/translate` });
            }
          })
      }
    },
    deleteReply(replyId) {
      if (confirm('삭제하시겠습니까?')) {
        this.$http.delete(`${baseURI}/posts/${this.post.id}/replies/${replyId}`, {
          headers: {
            'x-access-token': this.$store.getters['users/getToken'],
          },
        })
          .then(() => {
            this.setPostContent();
          })
      }
    },
    modifyPost() {
      console.log(this.post);
      
      this.$router.push({ name: 'new-post', params: { post: this.post, modify: true }});
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .text {
    font-size: 14px;
  } */

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  
  .box-card-reply {
    width: 95%;
    margin-bottom: 10px;
  }

  .eulerBtn {
    background-color: #303133;
    border-color: #303133;
  }
</style>
