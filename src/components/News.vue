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
      <h4>{{ dateFormat(n.updated_at) }}: {{ n.title }}</h4>
      <div>{{ n.content }}</div>
    </div>
    <div style="text-align:center"><button v-on:click="moreNews">지난 소식 불러오기</button></div>
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
  created() {
    const baseURI = 'http://localhost:3000/api';
    this.$http.get(`${baseURI}/news`)
      .then((result) => {
        this.recentNews = result.data.news;
      });
  },
  methods: {
    dateFormat(d) {
      return d.split("T")[0];
    },
    moreNews() {
      const baseURI = 'http://localhost:3000/api';
      this.$http.get(`${baseURI}/news/more`)
        .then((result) => {
          let hasDuplication = false;
          this.recentNews.forEach((r) => {
            result.data.news.forEach((m) => {
              if(r.id === m.id) {
                hasDuplication = true;
              }
            });
          });
          if(!hasDuplication) {
            this.recentNews = this.recentNews.concat(result.data.news);
          }
        });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
