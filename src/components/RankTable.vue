<template>
  <table id="problems_table" class="grid">
    <tbody>
      <tr>
        <th class="category_column">순위</th>
        <th class="translater_column">유저네임</th>
        <th class="title_column">한 줄 메세지</th>
        <th class="number_column">푼 문제</th>
        <th class="number_column">번역 문제</th>
        <th class="number_column">포스트</th>
        <th class="number_column">스타</th>
        <th class="number_column">정답 비율</th>
      </tr>
      <tr v-for="u in users" :key="u.id" style="height: 35px;">
        <td class="center">
          <a>{{ u.id }}</a>
        </td>
        <td class="center">
          <a>{{ u.username }}</a>
        </td>
        <td>
          {{ u.msg }}
        </td>
        <td class="center">{{ u.answerCount }}</td>
        <td class="center">{{ u.translateCount }}</td>
        <td class="center">{{ u.postCount }}</td>
        <td class="center">{{ u.starCount }}</td>
        <td class="center">{{ u.answerRatio }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'RankTable',
  props: ['users'],
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#problems_table_page #problems_table {
  max-width: initial;
}
#problems_table_page #problems_table th.title_column {
  width: 450px;
}
#problems_table_page #problems_table th.category_column {
  width: 100px;
}
#problems_table_page #problems_table th.number_column {
  width: 100px;
}
#problems_table_page #problems_table th.translater_column {
  width: 150px;
}
#problems_table_page #problems_table th.comment_column {
  width: 100px;
}
td.center {
  text-align: center;
}
</style>
