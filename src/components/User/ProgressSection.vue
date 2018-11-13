<template>
  <div>
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
import gradientBar from '@/assets/gradient_bar.png';
import { baseURI } from '@/components/constants';

export default {
  name: 'ProgressSection',
  props: ['totalNumber', 'countOfCorrection', 'totalPostNumber', 'totalStarNumber', 'totalProblemList', 'totalTableNumber'],
  data() {
    return {
      gradientBar,
      
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
      return (this.totalNumber === 0 ? 0 : (this.countOfCorrection / this.totalNumber).toFixed(3)) * 100;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
