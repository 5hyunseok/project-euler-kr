<template>
  <div id="forum_page">
    <h2>문제 {{ problemNumber }}</h2>
    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="`/threads/${problemNumber}/${n}`">{{ n }}</a>
      <!-- <router-link :to="{ name: 'threads', params: { problemNumber: problem.id } }"><img :src=forum alt=""></router-link> -->
      <!-- <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='../problem/'+this.value;"></span> -->
    </div>
    <div style="clear:both;"></div>
    <br>
    <post v-for="thread in threads" :key="thread.id" v-bind:thread=thread v-bind:isPreview=false></post>
    <br>
    <div class="pagination">
      <a v-for="n in totalPageNumber" :key=n :class="n == pageNumber ? 'current' : ''" :href="`/threads/${problemNumber}/${n}`">{{ n }}</a>
      <!-- <router-link :to="{ name: 'threads', params: { problemNumber: problem.id } }"><img :src=forum alt=""></router-link> -->
      <!-- <span>&nbsp;&nbsp;&nbsp;문제 바로가기: <input type="text" id="jump_top" style="width:30px;" onkeypress="if (event.keyCode==13) location.href='../problem/'+this.value;"></span> -->
    </div>
    <div style="clear:both;"></div>
    <br>
    <div style="text-align:right;"><router-link :to="{ name: 'new-post', params: { problemNumber: problemNumber } }">포스트 쓰기</router-link></div>
  </div>
</template>

<script>
import { baseURI, dateFormat } from './constants';
import { error } from 'util';
import thumbsUp from '@/assets/icon_thumb_up.png';
import Post from '@/components/Post';

export default {
  name: 'Problem',
  props: ['problemNumber', 'pageNumber'],
  components: {
    Post,
  },
  data() {
    return {
      thumbsUp,
      totalPageNumber: 0,
      totalThreadNumber: 0,
      threads: [],
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
  },
  created() {
    this.$http.get(`${baseURI}/problems/${this.problemNumber}/threads/length`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then((result) => {
        this.totalPageNumber = result.data.numberOfPages;
        if (this.totalPageNumber === 0) {
          this.totalPageNumber += 1;
        }
        this.totalThreadNumber = result.data.numberOfThread;

        this.$http.get(`${baseURI}/problems/${this.problemNumber}/threads/?page=${this.pageNumber}`, {
          headers: {
            'x-access-token': this.token,
          },
        })
          .then((result) => {
            this.threads = result.data.threads;
            console.log(this.threads);
          })
      })
      .catch((error) => {
        if (error.response.data.message === 'NotSolved') {
          this.$store.commit('users/setMsg', '접근 불가');
        }
        this.$router.push({ path: '/archives/1' });
      });
    
  },
  methods: {
    dateFormat,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
