<template>
  <div id="forum_page">
    <br>
    <el-form label-width="120px">
      
      <el-form-item label="카테고리">
        <el-select v-model="post.category" :disabled="modify">
          <el-option label="번역" value="TRANS"></el-option>
          <el-option label="오역" value="MISS"></el-option>
          <el-option label="자유" value="FREE"></el-option>
        </el-select>
      </el-form-item>
    
      <el-form-item label="문제번호" v-if="post.category == 'TRANS' || post.category == 'MISS'">
        <el-col :span="5">
        <el-input v-model="post.problem_id"></el-input>
        </el-col>
      </el-form-item>
      
      <el-form-item label="제목">
        <el-input v-model="post.title"></el-input>
      </el-form-item>
      <el-form-item label="내용">
        <el-input type="textarea" :rows="20" v-model="post.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ submit }}</el-button>
        <el-button @click="onCancel">취소</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { baseURI, dateFormat } from './constants';

export default {
  name: 'NewPost',
  props: {
    post: {
      type: Object,
      default: function () {
        return {
          title: '',
          content: '',
          category: 'TRANS',
          problem_id: '',
        }
      }
    },
    modify: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      submit: '등록',
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
    if (this.modify) {
      this.submit = '수정';
    }
  },
  methods: {
    dateFormat,
    onSubmit() {
      if (this.modify) {
        if (confirm('수정하시겠습니까?')) {
          this.$http.post(`${baseURI}/posts/${this.post.id}`, {
            title: this.post.title,
            content: this.post.content,
            category: this.post.category,
            problem_id: this.post.problem_id,
          }, {
            headers: {
              'x-access-token': this.$store.getters['users/getToken'],
            },
          })
            .then((result) => {
              this.$router.push({ path: `/post/${this.post.id}` });
            });
        }
      } else {
        this.$http.post(`${baseURI}/posts/`, {
            title: this.post.title,
            content: this.post.content,
            category: this.post.category,
            problem_id: this.post.category === 'FREE' ? null : this.post.problem_id,
          }, {
            headers: {
              'x-access-token': this.$store.getters['users/getToken'],
            },
          })
            .then((result) => {
              this.$router.push({ path: `/post/${result.data.postId}` });
            });
      }
    },
    onCancel() {
      if (confirm('취소하시겠습니까?')) {
        this.$router.go(-1);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
