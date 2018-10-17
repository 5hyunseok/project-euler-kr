<template>
  <div id="forum_page">
    <div style="text-align:center;">
      <div style="font-size:80%;color:#aaa;">포스트를 작성할 때는 항상 예의를 생각합시다 :)</div>
      <!-- <input type="hidden" name="post_token" value="170c7a2a646fd02221f7235cf576137ba23a0b97"> -->
      <!-- <input type="hidden" name="post" value=""> -->
      <textarea name="message" cols="100" rows="20" style="border:1px solid #aaa;padding:5px;" v-model="formula"></textarea><br>
      
      <button v-on:click="toggleHasCode">코드 추가</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button v-on:click="submit">포스트 올리기</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <input type="button" value="취소" onclick="if(confirm('정말 취소하시겠습니까?\n작성중인 포스트 내용은 저장되지 않습니다.')){location.href='/archives/1';}">
      <p style="font-size:80%;"><b>알림:</b> 작성한 포스트에 대해서는 전적으로 수정 및 삭제가 가능하며, 본인에게 모든 권한이 있습니다.</p>   
    </div>
    <div v-if="hasCode">
      <select v-model="selected">
        <option v-for="option in languageOptions" v-bind:key="option.value" v-bind:value="option.value">
          {{ option.value }}
        </option>
      </select>
      <codemirror v-model="code" :options="cmOptions"></codemirror>
    </div>
    <br>
    
    <table class="forum_table">
      <tbody>
        <tr>
          <td rowspan="2" class="forum_info">[미리보기]<br><div style="font-size:85%;">{{ formattedNow }}</div><span style="font-weight:bold;">5hyunseok</span>&nbsp; <img src="images/spacer.gif" width="21" height="1" alt=""></td>
          <td><div class="action_buttons">&nbsp;</div></td>
        </tr>
        <tr><td>
          <div class="forum_message">
            <pre><vue-mathjax :formula="formula"></vue-mathjax></pre><br>
            <pre v-highlightjs="code" v-if="hasCode"><code :class="selected"></code></pre>
          </div>
        </td></tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>
// language js
import 'codemirror/mode/javascript/javascript.js';
// theme css
import 'codemirror/theme/base16-dark.css';
import { baseURI, formatDate, languageOptions } from './constants';

export default {
  name: 'NewPost',
  props: ['pageNumber'],
  data() {
    return {
      login: false,
      formula: '',
      hasCode: false,
      code: '# code here',
      now: '',
      formattedNow: '',
      language: 'python',
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/python',
        theme: 'base16',
        lineNumbers: true,
        line: true,
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      selected: 'python',
      languageOptions,
    };
  },
  created() {
    this.now = Date.now();
    this.formattedNow = formatDate(this.now);
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
  },
  methods: {
    submit() {
      console.log(this.formula);

    },
    onCodeChange(editor) {
      this.code = editor.getValue();
      // this.code = this.editor.getValue();
    },
    toggleHasCode() {
      this.hasCode = !this.hasCode;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
