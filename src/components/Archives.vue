<template>
  <div id="problems_table_page">
    pageNumber: {{ pageNumber }}
  <!-- <div id="cache_info">Cache update: 26 minutes</div> -->
  <h2>문제 아카이브</h2>
    <p>
      문제 아카이브에는 1번부터 번까지의 문제가 있습니다. 혹시 가장 최근 업데이트된 10개의 문제를 풀고싶은가요? 그럴 땐 <a href="/recent">최근 문제</a> 메뉴를 이용하세요.<br> 각 문제의 제목을 클릭하면 문제를 볼 수 있고 정답을 제출할 수 있습니다.
    </p>
    <div class="pagination">
      <a href="" class=""></a>
    </div>
    <div style="clear:both;"></div>
    <br>
    <archive-table :problems=problems></archive-table>
    <br>
    <div style="clear:both;"></div>
  </div>
</template>

<script>
import ArchiveTable from '@/components/ArchiveTable';

export default {
  name: 'Archives',
  props: ['pageNumber'],
  components: {
    ArchiveTable,
  },
  data() {
    return {
      problems: [
        {
          number: 1,
          titleKr: '샘플 문제 타이틀1',
          correctCount: 10,
          postCount: 150,
        },
        {
          number: 2,
          titleKr: '샘플 문제 타이틀2',
          correctCount: 15,
          postCount: 250,
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
