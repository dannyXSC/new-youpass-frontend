<template>
  <div>
    <content-loader
        v-if="isLoading"
        viewBox="0 0 476 124"
        primaryColor="#f3f3f3"
        secondaryColor="#cccccc"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6"/>
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6"/>
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6"/>
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6"/>
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6"/>
      <circle cx="20" cy="20" r="20"/>
    </content-loader>
    <component :is="layout" v-else>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
import {ContentLoader} from 'vue-content-loader'

export default {
  name: "index",
  components: {ContentLoader},
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + "-layout";
    },
  },
  mounted() {
    this.$store.dispatch("global/getBasicInfo", this.$store.state.global.id).then(res => {
      if(res.code===100) {
        this.isLoading = false;
      }
      else
        this.$toast.error("something went wrong");
    }).catch(err => {
      this.$toast.error(err)
    });
  },
};
</script>

<style></style>
