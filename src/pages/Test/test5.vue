<template>
  <div>
    <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-removed-file='removeThisFile'
    ></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import MyEditModal from "@/components/myEditModal";
import {deleteImageByName} from "@/api";

export default {
  name: "test5",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: file => this.saveImages(file),
        thumbnailWidth: 150,
        maxFilesize: 2,
        addRemoveLinks: true,
        params: () => {
          return ({id: 0})
        },
      },
    }
  },
  methods: {
    removeThisFile(file, error, xhr) {
      deleteImageByName(file.name);
    },
    saveImages(data) {
      const file = new FormData
      file.append('file', data[0])
      console.log(data)
      return 1;
    }
  }
}
</script>

<style scoped>
</style>