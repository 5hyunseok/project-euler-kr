<template>
  <table id="problems_table" class="grid">
    <tbody>
      <tr>
        <th class="id_column"><strong><span class="sortby">ID</span></strong></th>
        <th class="title_column">제목</th>
        <th class="solved_by_column"><strong>정답자</strong></th>
        <th class="final_column"></th>
      </tr>
      <tr v-for="problem in problems" :key="problem.id">
        <td class="id_column">{{ problem.id }}</td>
        <td>
          <router-link :to="{ name: 'problem', params: { problemNumber: problem.id } }">{{ problem.title_kr ? problem.title_kr : problem.title }}</router-link>
          <!-- <a href="/problem/"></a> -->
        </td>
        <td>
          <div style="text-align:center;">{{ problem.solver }}</div>
        </td>
        <td v-if="login">
          <table style="width:100%;" class="no_border" v-if="problem.submits.length > 0">
            <tbody>
              <tr>
                <td style="width:20px;">
                  <div style="text-align:center;"><img :src=solved alt="Solved" title="Solved"><br></div>
                </td>
                <!-- <td style="width:20px;"><a href="overview=001" title="Download overview PDF"><img src="images/icon_pdf.png" alt=""></a></td> -->
                <td style="width:20px;">
                  <router-link :to="{ name: 'threads', params: { problemNumber: problem.id } }"><img :src=forum alt=""></router-link>
                </td>
                <!--<td>
                  <router-link :to="{ name: 'threads', params: { problemNumber: problem.id, pageNumber: Math.trunc(problem.threads.length / 25) + 1 } }">
                    <div style="font-size:80%;" class="age_minutes">{{ problem.threads[problem.threads.length - 1] }}<br>2 minutes</div>
                  </router-link>
                </td>-->
                <td>
                  <div style="font-size:80%;text-align:right;color:#999;">{{ problem.threads.length }} posts</div>
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
  props: ['problems', 'login'],
  data() {
    return {
      solved,
      forum,
    };
  },
  computed: {
    threadLink(id) {
      return `/threads/${id}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
