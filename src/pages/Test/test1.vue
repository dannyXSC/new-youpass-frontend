<template>
  <croppa v-model="myCroppa"
          :width="350"
          :height="350"
          placeholder="Choose an image"
          :placeholder-font-size="0"
          :disabled="false"
          :prevent-white-space="true"
          :show-remove-button="true"
          @file-choose="handleCroppaFileChoose"
          @file-size-exceed="handleCroppaFileSizeExceed"
          @file-type-mismatch="handleCroppaFileTypeMismatch"
          @image-remove="handleImageRemove"
          @move="handleCroppaMove"
          @zoom="handleCroppaZoom">
  </croppa >
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";
import $ from 'jquery'

require('bootstrap-fileinput/js/fileinput.js') // 引入图片上传插件  input 的逻辑全部都写在了这个文件内部了  需要注意！！！
require('bootstrap-fileinput/js/locales/zh.js') // 引入图片插件的汉化包
require('bootstrap-fileinput/themes/fa/theme.js') // 引入主题包
require('bootstrap/dist/js/bootstrap.js') // 引入 bootstrap

export default {
  name: "test1",
  data: {
    myCroppa: {}
  },

  methods: {
    uploadCroppedImage() {
      this.myCroppa.generateBlob(
          blob => {
            // write code to upload the cropped image file (a file is a blob)
          },
          'image/jpeg',
          0.8
      ); // 80% compressed jpeg file
    }
  }
}

</script>

<style scoped>

</style>