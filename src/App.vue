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
