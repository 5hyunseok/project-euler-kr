<template>
  <div id="forum_page">
    <div style="text-align:center;">
      <div style="font-size:80%;color:#aaa;">포스트를 작성할 때는 항상 예의를 생각합시다 :)</div>
      <textarea name="message" cols="100" rows="20" style="border:1px solid #aaa;padding:5px;" v-model="thread.content"></textarea><br>
      <button v-on:click="toggleHasCode">코드 추가</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button v-on:click="submit">포스트 올리기</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="button" value="취소" onclick="if(confirm('정말 취소하시겠습니까?\n작성중인 포스트 내용은 저장되지 않습니다.')){location.href='/archives/1';}">
      <p style="font-size:80%;"><b>알림:</b> 작성한 포스트에 대해서는 전적으로 수정 및 삭제가 가능하며, 본인에게 모든 권한이 있습니다.</p>
    </div>
    <div v-if="hasCode">
      <select v-model="thread.language">
        <option v-for="option in languageOptions" v-bind:key="option.value" v-bind:value="option.value">
          {{ option.value }}
        </option>
      </select>
      <codemirror v-model="thread.code" :options="cmOptions"></codemirror>
    </div>
    <br>
    <thread v-bind:thread=thread v-bind:isPreview=true></thread>
  </div>
</template>

<script>
import Thread from '@/components/Thread';
import { baseURI, formatDate, languageOptions } from './constants';

export default {
  name: 'NewThread',
  props: ['problemNumber'],
  components: {
    Thread,
  },
  data() {
    return {
      login: false,
      hasCode: false,
      now: '',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/python',
        theme: 'base16',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      // selected: 'python',
      languageOptions,
      thread: {
        content: '',
        code: '',
        created_at: '',
        language: '',
        user: {
          uid: '',
        },
      },
    };
  },
  created() {
    this.$http.get(`${baseURI}/problems/${this.problemNumber}/threads/length`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then(() => {
        // nothing to do
      })
      .catch((error) => {
        if (error.response.data.message === 'NotSolved') {
          this.$store.commit('users/setMsg', '접근 불가');
        }
        this.$router.push({ path: '/archives/1' });
      });
    this.now = Date.now();
    this.thread.created_at = formatDate(this.now);
    this.thread.user.uid = this.$store.getters['users/getUsername'];
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
  },
  methods: {
    submit() {
      this.$http.post(`${baseURI}/problems/${this.problemNumber}/threads/`, {
        content: this.thread.content,
        code: this.thread.code,
        language: this.thread.language,
      }, {
        headers: {
          'x-access-token': this.$store.getters['users/getToken'],
        },
      })
        .then(() => {
          this.$router.push({ path: `/threads/${this.problemNumber}/1` });
        });
    },
    onCodeChange(editor) {
      this.code = editor.getValue();
      // this.code = this.editor.getValue();
    },
    toggleHasCode() {
      this.hasCode = !this.hasCode;
      this.thread.code = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
