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

export default {
  name: 'App',
  components: {
    TopBar,
    FootBar,
  },
};
</script>

<style>
@import '../public/stylesheets/style.css';
#content {
  margin-top: 50px;
}
</style>
