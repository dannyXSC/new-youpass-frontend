
<template>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style lang="scss">
@import "~@/assets/base.scss";
@import "~vue-hamburger-button/dist/vue-hamburger-button.css";

// Bootstrap and its default variables
@import '../node_modules/bootstrap/scss/bootstrap';
// BootstrapVue and its default variables
@import '../node_modules/bootstrap-vue/src/index.scss';
// latex
@import "../node_modules/katex/dist/katex.min.css";
</style>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;1,500;1,700;1,800&family=Ubuntu:ital,wght@1,500;1,700&display=swap');
/*
font-family: 'Poppins', sans-serif;
font-family: 'Ubuntu', sans-serif;
*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
}

html {
  scroll-behavior: smooth;
  transition: all 0.3s ease;
}

a {
  text-decoration: none
}
li{
  list-style:none
}
</style>
