<template>
  <table id="problems_table" class="grid">
    <tbody>
      <tr>
        <th class="category_column">카테고리</th>
        <th class="title_column">제목</th>
        <th class="number_column">문제번호</th>
        <th class="translater_column">글쓴이</th>
        <th class="comment_column">댓글</th>
        <th class="date_column">작성일</th>
      </tr>
      <tr v-for="translate in translates" :key="translate.id" style="height: 35px;">
        <td style="text-align:center;">{{ translate.category }}</td>
        <td>
          <a>{{ translate.title }}</a>
          <!-- <router-link :to="{ name: 'problem', params: { problemNumber: problem.id } }">{{ problem.title_kr ? problem.title_kr : problem.title }}</router-link> -->
          <!-- <a href="/problem/"></a> -->
        </td>
        <td style="text-align:center;">
          {{ translate.problem_number }}
        </td>
        <td style="text-align:center;">
          {{ translate.writer }}
        </td>
        <td style="text-align:center;">
          {{ translate.comment_number }}
        </td>
        <td>
          {{ translate.created_at }}
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
  props: ['translates'],
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
#problems_table_page #problems_table th.category_column {
  width: 100px;
}
#problems_table_page #problems_table th.number_column {
  width: 100px;
}
#problems_table_page #problems_table th.translater_column {
  width: 150px;
}
#problems_table_page #problems_table th.date_column {
  width: 250px;
}
#problems_table_page #problems_table th.comment_column {
  width: 100px;
}
</style>
