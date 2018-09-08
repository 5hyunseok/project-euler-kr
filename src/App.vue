<template>
  <div id="app">
    <top-bar></top-bar>
    <div id="content">
      <router-view/>
    </div>
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
#content {
  margin-top: 50px;
}
</style>
