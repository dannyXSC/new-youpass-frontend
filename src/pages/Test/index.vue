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
  methods: {
    handleClick() {
      this.$toast.open({
        message: "hello",
        type: "info",
        position: "top",
        duration: 500,
        queue: false,
      });
    },
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
  mounted() {
    this.$store.dispatch("global/getInfo", this.$store.state.global.id);
    console.log(this.$store.state);
  },
};
</script>

<style></style>
