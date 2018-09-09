<template>
  <div id="news_page">
    <h2>번역 및 정답 업데이트 소식</h2>
    <ul style="padding-left:10px;">
      <li v-for="n in smallNews" :key="n.id">
        <span class="small_notice">{{ n.titleKr }}, {{ n.updateDate }}</span>
      </li>
    </ul>
    <h2>최신 소식</h2>
    <div class="news" v-for="n in recentNews" :key="n.id">
      <h4>{{ n.updateDate }}: {{ n.titleKr }}</h4>
      <div>{{ n.contentsKr }}</div>
    </div>
    <div style="text-align:center"><button>지난 소식 불러오기</button></div>
  </div>
</template>

<script>
export default {
  name: 'Archives',
  props: ['pageNumber'],
  data() {
    return {
      smallNews: [
        {
          id: 69,
          titleKr: '600번 번역완료',
          updateDate: '2018-9-23, 01:00 am',
        },
        {
          id: 70,
          titleKr: '샘플 문제 타이틀2',
          updateDate: '2018-9-23, 01:00 am',
        },
      ],
      recentNews: [
        {
          id: 1,
          titleKr: '첫 번째 뉴스',
          updateDate: '2018-09-23',
          contentsKr: 'GDPR이 적용되었습니다?!',
        },
      ],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
