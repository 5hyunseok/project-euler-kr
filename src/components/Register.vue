<template>
<div>
  <span class="warning">{{ msg }}</span>
  <h2>회원가입</h2>
  <div name="form" style="width:320px;" class="form_box">
    <table class="no_border" style="width:300px;">
      <tbody>
        <tr>
          <td>
            <div style="text-align:right;">사용할 아이디:</div>
          </td>
          <td>
            <input style="width:150px;" maxlength="32" type="text" name="username" autocomplete="off" v-model="currentNewUsername">
          </td>
        </tr>
      <tr>
        <td>
          <div style="text-align:right;">사용할 비밀번호:</div>
        </td>
        <td>
          <input id="pw" style="width:150px;" type="password" name="password" autocomplete="off" v-model="currentNewPassword">
        </td>
      </tr>
      <tr>
        <td>
          <div style="text-align:right;">사용할 비밀번호 재입력:</div>
        </td>
        <td>
          <input style="width:150px;" type="password" name="cpassword" v-model="currentNewConfirmPassword">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div style="text-align:center;font-size:80%;">
            <vue-recaptcha sitekey="6LdFrFYUAAAAALBGeDX156Q3l_789dnX7Xyrj0i8" @verify="onVerify" @expired="onExpired"></vue-recaptcha>
          </div>
        </td>
      </tr>
      <tr>
        <td><input id="pwValidation" type="hidden" name="pwValidation">&nbsp;</td>
        <td style="text-align:left;"><button v-on:click="register" @keyup.enter="register" id="submitButton" value="가입">가입</button></td>
      </tr>
      </tbody>
    </table>

  </div>
  <p>
    아이디는 32자 이하로 알파벳, 숫자(0-9), 점(.), 대시(-), 밑줄(_)만 사용할 수 있습니다.<br>
    비밀번호는 8자 이상 32자 이하입니다.
  </p>
  <p>
    <span class="warning">경고:</span>
    비밀번호를 잊어버리지 마세요. <br>
    본인인증에 사용될 수 있는 어떠한 개인정보도 수집하지 않기 때문에 비밀번호를 잊어버린 경우 비밀번호 복구가 불가능합니다. <br>
  </p>

</div>
</template>

<script>
import { baseURI } from './constants';
import VueRecaptcha from 'vue-recaptcha';

export default {
  name: 'Register',
  components: { VueRecaptcha },
  data() {
    return {
      currentNewUsername: '',
      currentNewPassword: '',
      currentNewConfirmPassword: '',
      msg: '',
      recaptchaClicked: false,
      response: '',
    };
  },
  methods: {
    register() {
      let usernameCheck = true;
      let passwordConfirm = true;
      let passwordCheck = true;
      let recaptchaCheck = true;
      if (this.currentNewUsername.length > 32 || !this.isAvailableUsername(this.currentNewUsername)) {
        usernameCheck = false;
        this.msg = '아이디는 32자 이하 알파벳, 숫자, 점, 대시 또는 밑줄만 가능합니다.';
        return;
      }
      if (this.currentNewPassword.length < 8 || this.currentNewPassword > 32) {
        passwordCheck = false;
        this.msg = '비밀번호는 8자 이상 32자 이하입니다.';
        return;
      }
      if (this.currentNewPassword !== this.currentNewConfirmPassword) {
        passwordConfirm = false;
        this.msg = '재입력한 비밀번호가 사용할 비밀번호와 다릅니다.';
        return;
      }
      if (!this.recaptchaClicked || !this.response) {
        recaptchaCheck = false;
        this.msg = '로봇이 아닙니다를 클릭하지 않았거나 만료되었습니다.';
      }
      if (passwordConfirm && passwordCheck && usernameCheck && recaptchaCheck) {
        this.$http.post(`${baseURI}/users/`, {
          uid: this.currentNewUsername,
          password: this.currentNewPassword,
          recaptchaResponse: this.response,
        })
          .then(() => {
            this.$router.push({ path: 'login' });
            // this.$http.post(`${baseURI}/users/login`, {
            //   uid: this.currentNewUsername,
            //   password: this.currentNewPassword,
            //   recaptchaResponse: this.response,
            // })
            //   .then((loginResponse) => {
            //     this.$store.commit('users/setToken', loginResponse.data.token);
            //     this.$store.commit('users/setUsername', this.currentNewUsername);
            //     this.$router.push({ path: 'about' });
            //   });
          })
          .catch((error) => {
            if (error.response.status === 409) {
              this.msg = '기존에 사용중인 아이디입니다.';
              return;
            }
            this.msg = 'error';
          });
      }
    },
    isAvailableUsername(string) {
      return /^[a-zA-Z0-9-_.]+$/.test(string);
    },
    onVerify(response) {
      this.recaptchaClicked = true;
      this.response = response;
    },
    onExpired() {
      this.recaptchaClicked = false;
      this.response = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
