<template>
  <div id="about_page">
    <h2>프로젝트 오일러에 대해서</h2>
    <img :src=eulerPortrait alt="Leonhard Euler (1707-1783)" style="margin:10px;float:right;">
    <h3>프로젝트 오일러란 무엇인가요?</h3>
    <p>프로젝트 오일러에는 도전적인 수학적/컴퓨터 프로그래밍 문제들이 있습니다. 이 문제들은 단순히 수학적인 직관 뿐만 아니라 그 이상이 요구될 것입니다. 문제를 깔끔하고 효율적으로 풀기위해 수학적 지식이 도움이 된다 하더라도, 대부분의 문제는 컴퓨터 프로그래밍 스킬이 필요합니다.<br><br>
    프로젝트 오일러를 시작한 동기, 그리고 그것을 지속적으로 진행하고 있는 것은 낯선 영역에 대한 탐구심과 새로운 개념을 배우는 것에 대한 즐거움을 위한 플랫폼을 만들고자 했기 때문입니다.</p>
    <br>
    <h3>누가 풀면 좋은 문제들인가요?</h3>
    <p>기본적인 커리큘럼으로 배움에 대한 갈증이 채워지지 않는 학생들, 수학 전공은 아니지만 수학적인 것에 관심많은 사람들, 그리고 문제 해결 능력과 수학적 지식을 계속해서 갈고 닦고자 하는 전문가들입니다.</p>
    <br>
    <h3>누구나 할 수 있을까요?</h3>
    <p>문제들의 난이도는 다양하며 대부분 귀납적인 학습 경험일 것입니다. 즉, 한 문제를 풀면 이전에 풀지 못했던 문제들을 해결할 수 있는 새로운 전략을 가지게 될 것입니다. 따라서 굳은 의지가 있는 참가자라면 천천히 그렇지만 확실히 모든 문제를 해결하게 될 것입니다.</p>
    <br>
    <h3>어떻게 시작하죠?</h3>
    <p>문제 해결 진행을 계속해서 트래킹하고자 한다면, 계정이 필요합니다. 이미 계정이 있다면 <a href="login">로그인</a>하세요! 계정이 없다면 <a href="register">가입</a>하시면 됩니다. (절대 무료이며, 개인정보를 저장하지 않습니다.)<br><br>
      문제가 먼저 보고싶으시면 가입 전에 <a href="problems">문제</a>를 볼 수도 있답니다.</p>
    <br><br>

    <p style="text-align:center;font-size:125%;font-style:italic;color:#999;">"프로젝트 오일러는 누구나 매력적인 수학의 세계에 매료되어 도전하고 발전하고 자신감을 심어주기 위해 존재합니다."</p>
    <br><br>
    <h2>projecteuler.kr에 대해서</h2>
    <p>본 페이지는 Project Euler(https://projecteuler.net) 에 소개된 문제들을 보다 많은 사람들이 즐길 수 있도록 번역하고, 번역된 문제를 풀고 한글로 이야기하는 커뮤니티입니다.</p>
    <p> 따라서 모든 문제의 저작권은 원작자에게 있으며, projecteuler.kr 은 원문을 2차 가공하여 배포하고 있음을 알려드립니다.</p>
    <!-- <p></p> -->
</div>

</template>

<script>
import eulerPortrait from '@/assets/euler_portrait.png';

export default {
  name: 'About',
  data() {
    return {
      eulerPortrait,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
