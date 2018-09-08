<template>
  <div id="app">
    <top-bar></top-bar>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar';

export default {
  name: 'App',
  components: {
    TopBar,
  },
};
</script>

<style>
@import '../public/stylesheets/style.css';
</style>
