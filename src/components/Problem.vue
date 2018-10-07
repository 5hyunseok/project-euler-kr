<template>
<div id="problem_page">
    login: {{ login }}
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
                      <div style="text-align:left;"><input size="20" type="text" name="guess" id="guess" maxlength="30"></div>
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
                    <td style="text-align:left;"><input type="submit" value="제출"></td>
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
export default {
  name: 'Problem',
  props: ['problemNumber'],
  data() {
    return {
      login: false,
      problem: {},
      hasAnswer: false,
      hasKorean: false,
      pending: false,
      solve: false,
    };
  },
  computed: {
    token() {
      return this.$store.getters.getToken;
    },
    loginButNotSolved() {
      return this.login && !this.solve;
    },
  },
  created() {
    const baseURI = 'http://localhost:3000/api';
    this.$http.get(`${baseURI}/problems/${this.problemNumber}`, {
      headers: {
        'x-access-token': this.token,
      },
    })
      .then((result) => {
        this.login = result.data.login;
        this.hasKorean = result.data.hasKorean;
        this.problem = result.data.problem;
      });
    // this.$http.get(`${baseURI}/problems/?page=${this.pageNumber}`, {
    //   headers: {
    //     'x-access-token': this.token,
    //   },
    // })
    //   .then((result) => {
    //     console.log(result.data);
    //     this.problems = result.data.problems;
    //     this.login = result.data.login;
    //   });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
