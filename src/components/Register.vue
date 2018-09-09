<template>
<div>
  <h2>회원가입</h2>
  <form name="form" method="post" action="/register" style="width:320px;" class="form_box">
    <table class="no_border" style="width:300px;">
      <tbody>
        <tr>
          <td>
            <div style="text-align:right;">사용할 아이디:</div>
          </td>
          <td>
            <input style="width:150px;" maxlength="32" type="text" name="username" autocomplete="off">
          </td>
        </tr>
      <tr>
        <td>
          <div style="text-align:right;">사용할 비밀번호:</div>
        </td>
        <td>
          <input id="pw" style="width:150px;" type="password" name="password" autocomplete="off">
        </td>
      </tr>
      <tr>
        <td>
          <div style="text-align:right;">사용할 비밀번호 재입력:</div>
        </td>
        <td>
          <input style="width:150px;" type="password" name="cpassword">
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <div style="text-align:center;font-size:80%;">
            <div class="g-recaptcha" data-sitekey="6LdFrFYUAAAAALBGeDX156Q3l_789dnX7Xyrj0i8" data-callback="enableBtn"></div>
          </div>
        </td>
      </tr>
      <tr>
        <td><input id="pwValidation" type="hidden" name="pwValidation">&nbsp;</td>
        <td style="text-align:left;"><button id="submitButton" type="submit" value="가입">가입</button></td>
      </tr>
      </tbody>
    </table>

  </form>
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

export default {
  name: 'Register',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
