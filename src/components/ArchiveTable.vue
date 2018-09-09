<template>
  <table id="problems_table" class="grid">
    <tbody>
      <tr>
        <th class="id_column"><strong><span class="sortby">ID</span></strong></th>
        <th class="title_column">제목</th>
        <th class="solved_by_column"><strong>정답자</strong></th>
        <th class="final_column"></th>
      </tr>
      <tr v-for="problem in problems" :key="problem.number">
        <td class="id_column">{{ problem.number }}</td>
        <td>
          <a href="/problem/">{{ problem.titleKr }}</a>
        </td>
        <td>
          <div style="text-align:center;">{{ problem.correctCount }}</div>
        </td>
        <td><img :src=solved></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import solved from '@/assets/solved.png';

export default {
  name: 'ArchiveTable',
  props: ['problems'],
  data() {
    return {
      solved,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
