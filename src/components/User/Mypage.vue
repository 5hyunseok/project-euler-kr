<template>
  <div id="progress_page" v-if="loadComplete">
    <div id="message" class="noprint" v-if="changeSuccess">성공적으로 변경되었습니다.</div>
    <div id="main section">
      <div id="header_section">
        <h2 id="profile_name_text">{{ username }}</h2>
        <h3>{{ oneLineMsg }}</h3>
      </div>
    </div>
    <br>
    <div id="account_page">
      <div class="form_box" style="width: 600px;">
      <table style="width:100%;" class="grid">
        <tbody>
          <tr>
            <th style="width:150px;">현재 비밀번호:</th>
            <td>
              <table style="width:100%;" class="no_border">
                <tbody>
                  <tr>
                  <td><input type="password" size="20" autocomplete="off" v-model="currentPassword">
                    <span class="warning">{{ currentMsg }}</span>
                  </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th style="width:150px;">새 비밀번호:</th>
            <td>
              <table style="width:100%;" class="no_border">
                <tbody>
                  <tr>
                  <td><input type="password" size="20" autocomplete="off" v-model="newPassword">
                    <span class="warning">{{ newMsg }}</span>
                  </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <th>새 비밀번호 재입력:</th>
            <td>
              <table style="width:100%;" class="no_border">
                <tbody>
                <tr>
                <td><input type="password" size="20" autocomplete="off" v-model="confirmPassword">
                  <span class="warning">{{ confirmMsg }}</span>
                </td>
                <td style="width:100px;">
                  <div style="text-align:right;"><button v-on:click="changePassword">비밀번호 변경</button></div>
                </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2"><div class="small_notice">비밀번호는 8자 이상 32자 이하입니다. 비밀번호를 잊어버리지 마세요.
            본인인증에 사용될 수 있는 어떠한 개인정보도 수집하지 않기 때문에 비밀번호를 잊어버린 경우 비밀번호 복구가 불가능합니다. <br><br></div></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <br>
    <div id="account_page">
      <div class="form_box" style="width: 600px;">
      <table style="width:100%;" class="grid">
        <tbody>
          <tr>
            <th>한 줄 메세지 변경:</th>
            <td>
              <table style="width:100%;" class="no_border">
                <tbody>
                <tr>
                <td><input type="text" v-model="currentOneLineMsg">
                  <span class="warning">{{ oneLineErrorMsg }}</span>
                </td>
                <td style="width:100px;">
                  <div style="text-align:right;"><button v-on:click="changeOneLineMsg">변경</button></div>
                </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2"><div class="small_notice">한 줄 메세지는 랭킹이나 계정 페이지에 보여지는 메세지입니다. 300자 이내로 설정할 수 있습니다.<br><br></div></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <br>
    <div id="account_page">
      <div class="form_box" style="width: 600px;">
      <table style="width:100%;" class="grid">
        <tbody>
          <tr>
            <th>프로필 공개 설정:</th>
            <td>
              <table style="width:100%;" class="no_border">
                <tbody>
                <tr>
                <td>
                  <input type="radio" v-model="currentClosed" id="public" value="public"><label for="public">공개</label>
                  <input type="radio" v-model="currentClosed" id="private" value="private"><label for="private">비공개</label>
                </td>
                <td style="width:100px;">
                  <div style="text-align:right;"><button v-on:click="changeClosed">변경</button></div>
                </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="2"><div class="small_notice">프로필 공개 여부를 설정할 수 있습니다. 비공개 설정 시 유저네임, 한 줄 메세지를 제외한 모든 정보가 보이지 않게 됩니다.
               (단, 랭킹 페이지에는 보여질 수 있습니다.)<br><br></div></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
    <progress-section 
      :totalNumber="totalNumber" 
      :countOfCorrection="countOfCorrection"
      :totalPostNumber="totalPostNumber"
      :totalStarNumber="totalStarNumber"
      :totalProblemList="totalProblemList"
      :totalTableNumber="totalTableNumber"></progress-section>
  </div>
</template>

<script>
import { baseURI } from '@/components/constants';
import ProgressSection from '@/components/User/ProgressSection';

export default {
  name: 'Mypage',
  components: {
    ProgressSection,
  },
  data() {
    return {
      login: false,
      countOfCorrection: 0,
      totalNumber: 0,
      totalPageNumber: 0,
      totalProblemList: [],
      totalPostNumber: 0,
      totalStarNumber: 0,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      newMsg: '',
      currentMsg: '',
      confirmMsg: '',
      changeSuccess: false,
      loadComplete: false,
      oneLineMsg: '',
      currentOneLineMsg: '',
      oneLineErrorMsg: '',
      currentClosed: 'private',
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
    username() {
      return this.$store.getters['users/getUsername'];
    },
    totalTableNumber() {
      return Math.ceil(this.totalNumber / 20) + 1;
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loadComplete = false;
      this.totalProblemList = [];
      this.$http.get(`${baseURI}/problems/length`)
      .then((result) => {
        this.totalPageNumber = result.data.numberOfPages;
        this.totalNumber = result.data.numberOfProblem;
        const len = Math.trunc(this.totalNumber / 20);
        for (let i = 0; i <= len + 1; i += 1) {
          this.totalProblemList.push([]);
        }
        this.$http.get(`${baseURI}/users/my`, {
          headers: {
            'x-access-token': this.token,
          },
        })
          .then((innerResult) => {
            this.totalPostNumber = innerResult.data.threadCount;
            this.totalStarNumber = innerResult.data.threadStarCount;
            innerResult.data.problemsList.forEach((problem) => {
              if (problem.submits.length > 0) {
                this.countOfCorrection += 1;
                // this.totalProblemList.push("hi");
                this.totalProblemList[Math.ceil(problem.id / 20)].push({
                  id: problem.id,
                  solved: true,
                });
              } else {
                this.totalProblemList[Math.ceil(problem.id / 20)].push({
                  id: problem.id,
                  solved: false,
                });
              }
            });
            this.oneLineMsg = innerResult.data.user.short_message;
            this.currentOneLineMsg = this.oneLineMsg;
            if (innerResult.data.user.closed_flag) {
              this.currentClosed = 'private';
            } else {
              this.currentClosed = 'public';
            }
            this.loadComplete = true;
          })
          .catch(() => {
            this.$store.commit('users/setMsg', '접근 불가');
            this.$router.push({ path: '/archives/1' });
          });
      });
    },
    changePassword() {
      if (this.newPassword.length < 8 || this.newPassword > 32) {
        this.newMsg = '비밀번호는 8자 이상 32자 이하입니다.';
        setTimeout(() => {
          this.newMsg = '';
        }, 5000);
      } else if (this.newPassword !== this.confirmPassword) {
        this.confirmMsg = '재입력한 비밀번호가 다릅니다';
        setTimeout(() => {
          this.confirmMsg = '';
        }, 5000);
      } else {
        this.$http.put(`${baseURI}/users/password`, {
          curPassword: this.currentPassword,
          newPassword: this.newPassword,
        }, {
          headers: {
            'x-access-token': this.$store.getters['users/getToken'],
          },
        })
          .then(() => {
            this.changeSuccess = true;
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmPassword = '';
            setTimeout(() => {
              this.changeSuccess = false;
            }, 5000);
          })
          .catch((error) => {
            if (error.response.data.message === 'NotMatch') {
              this.currentMsg = '현재 비밀번호가 틀립니다.';
              setTimeout(() => {
                this.currentMsg = '';
              }, 5000);
            }
          });
      }
    },
    changeOneLineMsg() {
      this.$http.put(`${baseURI}/users/info`, {
        shortMessage: this.currentOneLineMsg,
      }, {
        headers: {
          'x-access-token': this.$store.getters['users/getToken'],
        },
      })
        .then(() => {
          this.changeSuccess = true;
          setTimeout(() => {
            this.changeSuccess = false;
          }, 5000);
          this.init();
        })
        .catch((error) => {
          if (error.response.data.message === 'ShortMessageTooLong') {
            this.oneLineErrorMsg = '300자 이내로 입력하세요.';
            setTimeout(() => {
              this.oneLineErrorMsg = '';
            }, 5000);
          }
        });
    },
    changeClosed() {
      this.$http.put(`${baseURI}/users/closed-flag`, {
        closedFlag: this.currentClosed === 'private' ? 1 : 0,
      }, {
        headers: {
          'x-access-token': this.$store.getters['users/getToken'],
        },
      })
        .then(() => {
          this.changeSuccess = true;
          setTimeout(() => {
            this.changeSuccess = false;
          }, 5000);
          this.init();
        })
        .catch(() => {});
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
