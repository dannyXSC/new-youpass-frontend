<template>
  <div>
    <!-- directive -->
    <div class="images" v-viewer>
      <b-row>
        <b-col cols="4" v-for="src in images" :key="src">
          <img  :src="src">
        </b-col>
      </b-row>
    </div>
    <!-- component -->
    <viewer :images="images">
      <b-row>
        <b-col cols="4" v-for="src in images" :key="src" class="mb-5">
            <img  :src="src" width="100%" height="100%">
        </b-col>
      </b-row>
    </viewer>
    <!-- api -->
    <button type="button" @click="show">Click to show</button>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
Vue.use(VueViewer)
export default {
  data() {
    return {
      images: [
        "https://picsum.photos/200/200",
        "https://picsum.photos/300/200",
        "https://picsum.photos/250/200",
        "https://picsum.photos/252/200"
      ]
    };
  },
  methods: {
    show() {
      this.$viewerApi({
        images: this.images,
      })
    },
  },
}
</script>