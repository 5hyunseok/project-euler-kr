<template>
  <div id="progress_page" v-if="loadComplete">
    <div id="message" class="noprint" v-if="changeSuccess">비밀번호가 성공적으로 변경되었습니다.</div>
    <div id="main section">
      <div id="header_section">
        <h2 id="profile_name_text">{{ username }}</h2>
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
    <div id="progress_bar_section">
      <h3>{{ totalNumber }} 문제 중 총 {{ countOfCorrection }} 개를 풀었습니다. </h3>
      <div id="progress_bar_box" class="info">
        <div id="progress_bar" :style="{ 'background':`url(${gradientBar})`, 'width': `${ percentage }%` }"></div>
        <span>Completed {{ percentage }}% of the problems</span>
      </div>
    </div>
    <div id="posts_made_section">
      <h3> 내 포스트 개수: {{ totalPostNumber }} / 받은 스타 수: {{ totalStarNumber }}</h3>
    </div>
    <div id="problems_solved_section">
      <h3>내가 푼 문제들</h3>
      <table class="grid problems_solved_table">
        <tbody>
        <tr  v-for="i in totalTableNumber" :key="i">
        <td :class="{ problem_unsolved: !problem.solved, problem_solved: problem.solved }" v-bind:style="{ backgroundColor: problem.solved ? 'rgba(255, 136, 0,0.335)' : ''}" v-for="problem in totalProblemList[i]" :key="problem.id">
          <!-- <span><div class="heading">Problem 3 (solved by 453619 members)</div><div style="font-size:85%;font-weight:bold;color:#333;">Difficulty rating: 5%</div>"Largest prime factor"</span> -->
          <a :href="`problem/${problem.id}`" style="color:inherit;">
            <div style="" class="info">{{ problem.id }}</div>
          </a>
        </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ArchiveTable from '@/components/ArchiveTable';
import gradientBar from '@/assets/gradient_bar.png';
import { baseURI } from './constants';

export default {
  name: 'Archives',
  props: ['pageNumber'],
  components: {
    ArchiveTable,
  },
  data() {
    return {
      gradientBar,
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
    };
  },
  computed: {
    token() {
      return this.$store.getters['users/getToken'];
    },
    username() {
      return this.$store.getters['users/getUsername'];
    },
    percentage() {
      return this.totalNumber === 0 ? 0 : (this.countOfCorrection / this.totalNumber).toFixed(3);
    },
    totalTableNumber() {
      return Math.ceil(this.totalNumber / 20) + 1;
    },
  },
  created() {
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
            this.loadComplete = true;
          })
          .catch(() => {
            this.$store.commit('users/setMsg', '접근 불가');
            this.$router.push({ path: '/archives/1' });
          });
      });
  },
  methods: {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
