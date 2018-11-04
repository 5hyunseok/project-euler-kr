<template>
  <div id="footer" class="noprint">
  프로젝트 오일러: <router-link :to="{ name: 'copyright' }">Copyright Information</router-link> | <router-link :to="{ name: 'privacy' }">Privacy Policy</router-link>
  <!--/Creative Commons License--><!-- <rdf:RDF xmlns="http://web.resource.org/cc/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#">
    <Work rdf:about="">
        <license rdf:resource="http://creativecommons.org/licenses/by-nc-sa/2.0/uk/" />
    <dc:type rdf:resource="http://purl.org/dc/dcmitype/Text" />
    </Work>
    <License rdf:about="http://creativecommons.org/licenses/by-nc-sa/2.0/uk/"><permits rdf:resource="http://web.resource.org/cc/Reproduction"/><permits rdf:resource="http://web.resource.org/cc/Distribution"/><requires rdf:resource="http://web.resource.org/cc/Notice"/><requires rdf:resource="http://web.resource.org/cc/Attribution"/><prohibits rdf:resource="http://web.resource.org/cc/CommercialUse"/><permits rdf:resource="http://web.resource.org/cc/DerivativeWorks"/><requires rdf:resource="http://web.resource.org/cc/ShareAlike"/></License></rdf:RDF> -->
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
