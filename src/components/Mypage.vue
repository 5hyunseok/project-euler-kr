<template>
  <div id="progress_page">
    <div id="main section">
      <div id="header_section">
        <h2 id="profile_name_text">{{ username }}</h2>
      </div>
    </div>
    <div id="progress_bar_section">
      <h3>{{ totalNumber }} 문제 중 총 {{ countOfCorrection }} 개를 풀었습니다. </h3>
      <div id="progress_bar_box" class="info">
        <div id="progress_bar" :style="{ 'background':`url(${gradientBar})`, 'width': `${ percentage }%` }"></div>
        
        <span>Completed {{ percentage }}% of the problems</span>
      </div>
    </div>
  </div>
</template>

<script>
import ArchiveTable from '@/components/ArchiveTable';
import { baseURI } from './constants';
import gradientBar from '@/assets/gradient_bar.png';

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
    }
  },
  created() {
    this.$http.get(`${baseURI}/problems/length`)
      .then((result) => {
        this.totalPageNumber = result.data.numberOfPages;
        this.totalNumber = result.data.numberOfProblem;
        
        this.$http.get(`${baseURI}/users/my`, {
          headers: {
            'x-access-token': this.token,
          },
        })
          .then((result) => {
            result.data.problemsList.forEach(problem => {
              if (problem.submits.length > 0) {
                this.countOfCorrection += 1;
              }
            })
          })
      });
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
