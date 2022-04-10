<template>
  <component :is="layout">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </component>
</template>

<script>
const default_layout = "default";

export default {
  name: "index",
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
};
</script>

<style></style>
