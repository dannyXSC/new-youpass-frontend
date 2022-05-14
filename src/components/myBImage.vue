<template>
  <div v-if="!loading">
    <viewer :images="imageUrlList">
      <b-row>
        <b-col cols="4" v-for="src in imageUrlList" :key="src.id" class="mb-2"
               style="display: inline-block;position: relative;width: 100%"
        >
          <div style="margin-top: 100%"></div>
          <div
              class="mr-2"
              style="position: absolute;top: 0;bottom: 0;left: 0;right: 0;"
          >
            <div style="height: 100%;width: 100%;" class="flex">
              <div class="flex-1 overflow-auto center">
                <img :src="src.url" width="100%" height="100%">
              </div>
              <slot :src="src"></slot>
            </div>

          </div>

        </b-col>
      </b-row>
    </viewer>

  </div>
  <div v-else>
    <atom-spinner
        :animation-duration="1000"
        :size="60"
        :color="'#b4d0c3'"
    />
  </div>
</template>

<script>
import {getImageUrl} from "@/api";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
import {AtomSpinner} from 'epic-spinners'

Vue.use(VueViewer)

export default {
  name: "myBImage",
  components: {AtomSpinner},
  props: {
    idList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      imageUrlList: [],
      loading: false
    }
  },
  mounted() {
    console.log(this.idList)
    this.calImageUrlList(this.idList)
  },
  methods: {
    async calImageUrlList(idList) {
      this.loading = true
      this.imageUrlList = []
      for (const id of idList) {
        let res = await getImageUrl(id)
        this.imageUrlList.push({url: res.data.url, id: id})
      }
      this.loading = false
    }
  },
  watch: {
    idList: function (newval, oldVal) {
      this.calImageUrlList(newval)
    }
  }
}
</script>

<style scoped>
body {
  padding: 0;
  margin: 0;
}

.flex {
  display: flex;
  flex-direction: column;
}

.flex-1 {
  flex: 1 1 0%;
}

.overflow-auto {
  overflow: auto;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-height: 100%;
  max-width: 100%;
}

.p-4 {
  padding: 1rem;
}

.bg-blue-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(147, 197, 253, var(--tw-bg-opacity));
}

.h-6 {
  height: 1.5rem;
}

.w-full {
  width: 100%;
}

</style>