<template>
  <div id="news_page">
    <h2>최신 소식</h2>
    <div class="news" v-for="n in recentNews" :key="n.id">
      <h4>{{ dateFormat(n.updated_at) }} {{ n.title }}</h4>
      <div>{{ n.content }}</div>
    </div>
    <div style="text-align:center"><button v-on:click="moreNews">지난 소식 불러오기</button></div>
  </div>
</template>

<script>
import { baseURI, dateFormat } from './constants';

export default {
  name: 'Archives',
  props: ['pageNumber'],
  data() {
    return {
      recentNews: [],
    };
  },
  created() {
    this.$http.get(`${baseURI}/news`)
      .then((result) => {
        this.recentNews = result.data.news;
      });
  },
  methods: {
    moreNews() {
      this.$http.get(`${baseURI}/news/more`)
        .then((result) => {
          let hasDuplication = false;
          this.recentNews.forEach((r) => {
            result.data.news.forEach((m) => {
              if (r.id === m.id) {
                hasDuplication = true;
              }
            });
          });
          if (!hasDuplication) {
            this.recentNews = this.recentNews.concat(result.data.news);
          }
        });
    },
    dateFormat,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
