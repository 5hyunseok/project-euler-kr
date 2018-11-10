<template>
  <div id="app">
    <top-bar></top-bar>
    <div id="content">
      <router-view/>
    </div>
    <foot-bar></foot-bar>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';
import FootBar from '@/components/FootBar';
import { sayswho } from '@/components/constants.js';

export default {
  name: 'App',
  components: {
    TopBar,
    FootBar,
  },
  created() {
    console.log(this.sayswho());
    if (this.sayswho().indexOf("IE") > -1) {
      this.$router.push({ path: '/not-support' });
    }
  },
  methods: {
    sayswho,
  }
};
</script>

<style>
@import '../public/stylesheets/style.css';
#content {
  margin-top: 50px;
}
pre {
  font-size: medium;
}
</style>
