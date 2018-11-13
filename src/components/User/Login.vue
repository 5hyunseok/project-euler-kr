<template>
<div>
  <span class="warning">{{ msg }}</span>
  <h2>로그인</h2>
  <div name="sign_in_form" style="width:320px;" class="form_box">
    <table class="no_border" style="width:300px;">
      <tbody>
        <tr>
          <td><div style="text-align:right;">아이디:</div></td>
          <td><input style="width:150px;" type="text" name="username" id="username" v-model="currentUsername"></td>
        </tr>
        <tr>
          <td><div style="text-align:right;">비밀번호:</div></td>
          <td><input style="width:150px;" type="password" name="password" id="password" v-model="currentPassword" @keyup.enter="login"></td>
        </tr>
        <tr>
          <td colspan="2">
            <div style="text-align:center;font-size:80%;">
              <vue-recaptcha ref="recaptcha" sitekey="6LdFrFYUAAAAALBGeDX156Q3l_789dnX7Xyrj0i8" @verify="onVerify" @expired="onExpired"></vue-recaptcha>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2"><div style="text-align:center;"><label for="remember_me">로그인 유지:&nbsp;&nbsp;</label><input type="checkbox" name="remember_me" id="remember_me" style="vertical-align:middle;"></div></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
          <td><button name="sign_in" v-on:click="login" value="로그인">로그인</button></td>
        </tr>
      </tbody>
    </table>
  </div>
<p>
  계정이 없다면 먼저 <a href="register" title="Register">가입</a>하세요.<br>
</p>
</div>
</template>

<script>
import { baseURI } from '../constants';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Login',
  components: { VueRecaptcha },
  data() {
    return {
      currentUsername: '',
      currentPassword: '',
      rememberedUserName: '',
      msg: '',
      recaptchaClicked: false,
      response: '',
    };
  },
  methods: {
    login() {
      if (this.recaptchaClicked && this.response) {
        this.$http.post(`${baseURI}/users/login`, {
          uid: this.currentUsername,
          password: this.currentPassword,
          recaptchaResponse: this.response,
        })
          .then((loginResponse) => {
            this.$store.commit('users/setToken', loginResponse.data.token);
            this.$store.commit('users/setUsername', this.currentUsername);
            this.$router.push({ path: 'archives/1' });
          })
          .catch((error) => {
            if (error.response.status === 403) {
              this.msg = '아이디나 비밀번호가 틀립니다.';
              this.resetRecaptcha();
              return;
            }
            this.msg = 'unexpected error';
          });
      } else {
        this.msg = '로봇이 아닙니다를 클릭하지 않았거나 만료되었습니다.';
      }
      
    },
    onVerify(response) {
      this.recaptchaClicked = true;
      this.response = response;
    },
    onExpired() {
      this.recaptchaClicked = false;
      this.response = '';
    },
    resetRecaptcha() {
      this.$refs.recaptcha.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
