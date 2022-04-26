<template>
  <div v-if="imageIdList!==null">
    <vue-dropzone
        :ref="myRef"
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="onSuccess"
        @vdropzone-removed-file="onRemovedFile"
    ></vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {getImageUrl, imagePostURL, removeImage} from "@/api";

export default {
  name: "myDropzone",
  props: {
    myRef: {
      type: String,
      default: 'myVueDropzone',
    },
    value: Array,
  },
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: imagePostURL,
        method: "post",
        thumbnailWidth: 150,
        maxFilesize: 1,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"},
      },
      imageIdList: this.value,
      is_destroying: false,
    }
  },
  mounted(){
    this.imageIdList.forEach(imageId => {
      getImageUrl(imageId).then(res => {
        if (res.code === 100) {
          let mockFile = {
            id: imageId,
            name: 'FileName',
            size: '1000',
            type: 'image/jpeg',
            accepted: true,
          }
          this.$refs[this.myRef].manuallyAddFile(mockFile, res.data);
        } else {
          this.$toast.error(res.msg);
        }
      }).catch(error => {
        this.$toast.error(error.message);
      })
    })
  },
  methods: {
    handleInput() {
      this.$emit('input', this.imageIdList)
    },
    onSuccess(file, response) {
      if (response.code === 100) {
        let id = response.data.id
        this.$refs[this.myRef].dropzone.files.forEach((value, index) => {
          if (value === file) {
            this.$refs[this.myRef].dropzone.files[index].id = id
          }
        })
        this.imageIdList.push(id)
        this.$toast.success("上传成功")
      } else {
        this.$refs[this.myRef].removeFile(file);
        this.$toast.error(response.msg);
      }
      this.handleInput()
    },
    onRemovedFile(file, error, xhr) {
      if (this.is_destroying) {
        return
      }
      if (file.id) {
        removeImage(file.id).then(res => {
          this.imageIdList = this.imageIdList.filter((value, index) => {
            return value !== file.id
          })
          this.handleInput()
          this.$toast.success("删除成功")
        })
      }
    }
  },
  beforeDestroy() {
    this.is_destroying = true;
  },
  destroyed() {
    this.is_destroying = false;
  },
}
</script>

<style scoped>

</style>