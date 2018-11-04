<template>
<div id="problem_page">
  <span class="warning" v-if="!hasAnswer">아직 정답이 없는 문제입니다.<br></span>
  <span class="warning" v-if="!hasKorean">아직 번역이 없는 문제입니다. <a href="/translate/1">번역하러가기</a><br></span>
  <span class="warning">{{ msg }}</span>
  <h2>
    {{ hasKorean ? problem.title_kr : problem.title }}
  </h2>
  <div id="problem_info">
    <h3>문제 {{ problem.id }}
      <!-- <span style="float:right;" class="info noprint">
        <img src="images/icon_info.png" style="width:18px;opacity:0.7;">
        <span style="left:-400px;width:450px;font-size:80%;">Published on Friday, 29th August 2003, 06:00 pm; Solved by 26127;<br>Difficulty rating: 15%</span>
      </span> -->
    </h3>
  </div>
  <div class="problem_content" role="problem">
    <span v-html="hasKorean ? problem.problem_kr : problem.problem"></span>
  </div>
  <br>
  <div style="text-align:center;" class="noprint" v-if="solve">
    <span class="warning">정답입니다! - {{answer}}</span>
  </div>
  <div style="text-align:center;" class="noprint" v-if="loginButNotSolved">
    <!-- <form name="form" method="post" action="/submit"> -->
      <table width="400" cellpadding="10" align="center">
        <tbody>
          <tr>
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" name="no" maxlength="30" :value="problem.id" hidden>
                      <div style="text-align:right;">정답:</div>
                    </td>
                    <td style="text-align:left;">
                      <div style="text-align:left;"><input size="20" type="text" name="guess" id="guess" maxlength="30" v-model="currentAnswer"></div>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2"> </td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <div style="text-align:center;font-size:80%;">
                        <div class="g-recaptcha" data-sitekey="6LdFrFYUAAAAALBGeDX156Q3l_789dnX7Xyrj0i8" data-callback="enableBtn"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                    <td style="text-align:left;"><button v-on:click="submit">제출</button></td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    <!-- </form> -->
  </div>
</div>
</template>

<script>
import { baseURI } from './constants';

export default {
  name: 'Problem',
  props: ['problemNumber'],
  data() {
    return {
      currentAnswer: '',
      login: false,
      problem: {},
      hasAnswer: true,
      hasKorean: true,
      pending: false,
      solve: false,
      answer: '',
      msg: '',
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
    loginButNotSolved() {
      return this.login && !this.solve;
    },
  },
  created() {
    this.$http.get(`${baseURI}/problems/${this.problemNumber}`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then((result) => {
        this.login = result.data.login;
        this.hasKorean = result.data.hasKorean;
        this.problem = result.data.problem;
        this.hasAnswer = result.data.hasAnswer;
        this.solve = result.data.solve;
        this.answer = result.data.submitAnswer;
      });
  },
  methods: {
    submit() {
      if (!this.isOnlyNumber(this.currentAnswer)) {
        this.msg = '정답은 숫자만 입력하세요';
        return;
      }
      this.$http.post(`${baseURI}/problems/${this.problemNumber}/submit`, {
        answer: this.currentAnswer,
      }, {
        headers: {
          'x-access-token': this.token,
        },
      })
        .then((result) => {
          this.solve = result.data.isCorrect;
          if (this.solve) {
            this.answer = this.currentAnswer;
          } else {
            this.msg = '틀렸습니다!';
          }
        });
    },
    isOnlyNumber(string) {
      return /^[0-9]+$/.test(string);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
