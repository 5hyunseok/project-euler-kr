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
        <td>
          <table style="width:100%;" class="no_border">
            <tbody>
              <tr>
                <td style="width:20px;">
                  <div style="text-align:center;"><img :src=solved alt="Solved" title="Solved"><br></div>
                </td>
                <!-- <td style="width:20px;"><a href="overview=001" title="Download overview PDF"><img src="images/icon_pdf.png" alt=""></a></td> -->
                <td style="width:20px;">
                  <a href=""><img :src=forum alt=""></a>
                </td>
                <td>
                  <div style="font-size:80%;text-align:right;color:#999;">{{ problem.postCount }} posts</div>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <img :src=solved> <img :src=forum> <div style="font-size:80%;text-align:right;color:#999;">{{ problem.postCount }} posts</div></td> -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import solved from '@/assets/solved.png';
import forum from '@/assets/forum.png';

export default {
  name: 'ArchiveTable',
  props: ['problems'],
  data() {
    return {
      solved,
      forum,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
