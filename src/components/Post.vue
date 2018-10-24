<template>
  <div>
  <table class="forum_table">
    <tbody>
      <tr>
        <td rowspan="2" class="forum_info">
          <p v-if="isPreview">[미리보기]</p>
          <div style="font-size:85%;">{{ formatDate(thread.created_at) }}</div>
          <span style="font-weight:bold;">{{ thread.user.uid }}</span>
        </td>
        <td>
          <div class="action_buttons" v-if="!isPreview">
            &nbsp; &nbsp;<a href="#">신고</a>
            &nbsp; &nbsp;<a title="Give Kudos" href="#" v-on:click="vote()">
              <img :src="thumbsUp" alt="" v-if="!isVoted">
              <img :src="thumbsUpVoted" alt="" v-else>
              {{ stars }}
              </a>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <div class="forum_message">
            <pre><vue-mathjax :formula="thread.content"></vue-mathjax></pre><br>
            <pre v-highlightjs="thread.code" v-if="thread.code"><code :class="thread.language"></code></pre>
          </div>
          <div style="text-align:right;"></div>
        </td>
      </tr>
    </tbody>
  </table>
  <br>
  </div>
</template>

<script>
import thumbsUp from '@/assets/icon_thumb_up.png';
import thumbsUpVoted from '@/assets/icon_thumb_up_voted.png';
import { formatDate, baseURI } from './constants';

export default {
  name: 'Post',
  props: ['thread', 'isPreview'],
  data() {
    return {
      thumbsUp,
      thumbsUpVoted,
      isVoted: false,
      stars: 0,
    };
  },
  created() {
    if (!this.isPreview) {
      if (this.thread.threadStars.length === 0) {
        this.isVoted = false;
      } else {
        this.isVoted = true;
      }
      this.stars = this.thread.star;
    }
  },
  methods: {
    formatDate,
    vote() {
      this.$http.post(`${baseURI}/problems/${this.thread.problem_id}/threads/${this.thread.id}/star`, { }, {
        headers: {
          'x-access-token': this.$store.getters['users/getToken'],
        },
      })
        .then((result) => {
          if (result.data.isIncrease) {
            this.isVoted = true;
            this.stars += 1;
          } else {
            this.isVoted = false;
            this.stars -= 1;
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
