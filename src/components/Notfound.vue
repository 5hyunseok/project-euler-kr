<template>
  <div id="error_page">
    <img :src=errorImage alt="page not found">
    <h3>존재하지 않는 페이지입니다.</h3>
  </div>

</template>

<script>
import errorImage from '@/assets/error_page.png';

export default {
  name: 'About',
  data() {
    return {
      errorImage,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
