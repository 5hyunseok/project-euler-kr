<template>
  <div id="progress_page" v-if="loadComplete">
    
      <div id="main section">
        <div id="header_section">
          <h2 id="profile_name_text">{{ currentUserName }}</h2>
          <h3>{{ currentOneLineMsg }}</h3>
        </div>
      </div>
      <br>
      <progress-section v-if="!currentClosed"
        :totalNumber="totalNumber" 
        :countOfCorrection="countOfCorrection"
        :totalPostNumber="totalPostNumber"
        :totalStarNumber="totalStarNumber"
        :totalProblemList="totalProblemList"
        :totalTableNumber="totalTableNumber"></progress-section>
      <div v-else>
        <h3>비공개</h3>
      </div>
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
  props: ['userid'],
  data() {
    return {
      login: false,
      countOfCorrection: 0,
      currentUserName: '',
      currentOneLineMsg: '',
      currentClosed: true,
      totalNumber: 0,
      totalPageNumber: 0,
      totalProblemList: [],
      totalPostNumber: 0,
      totalStarNumber: 0,
      loadComplete: false,
      oneLineMsg: '',
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
        this.$http.get(`${baseURI}/users/${this.userid}`, {
          headers: {
            'x-access-token': this.token,
          },
        })
          .then((innerResult) => {
            console.log(innerResult.data);
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
            this.currentOneLineMsg = innerResult.data.user.short_message;
            this.currentUserName = innerResult.data.user.uid;
            this.currentClosed = innerResult.data.user.closed_flag;
            this.loadComplete = true;
          })
          .catch((error) => {
            if (error.response.data.message === 'NotFound') {
              this.$store.commit('users/setMsg', '존재하지 않는 회원입니다.');
            } else {
              this.$store.commit('users/setMsg', '알 수 없는 오류입니다.');
            }
            this.$router.push({ path: '/archives/1' });            
          });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
