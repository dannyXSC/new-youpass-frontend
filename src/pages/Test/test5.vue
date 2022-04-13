<template>
  <div style="height: 800px">
    <tui-image-editor ref="tuiImageEditor" :include-ui="useDefaultUI" :options="options"></tui-image-editor>
    <button @click="handleClick">click me</button>
  </div>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import MyEditModal from "@/components/myEditModal";
import {deleteImageByName, testPostImage} from "@/api";
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import {ImageEditor} from '@toast-ui/vue-image-editor';

export default {
  name: "test5",
  components: {
    vueDropzone: vue2Dropzone,
    'tui-image-editor': ImageEditor,
  },
  data() {
    return {
      useDefaultUI: true,
      options: {
        // for tui-image-editor component's "options" prop
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        includeUI: {
          loadImage: {
            path: 'http://dannyxsc.xyz/img/image-20220225222647576.png',
            name: 'My sample image'
          },
        },
      },

    };
  },
  methods: {
    handleClick() {
      //创建formdata对象
      let formdata = new FormData();
      let a = this.$refs.tuiImageEditor.invoke('toDataURL')
      let imgfile = this.convertBase64UrlToImgFile(a, 'test.jpeg', 'image/jpeg')
      //将文件添加到formdata里面
      formdata.append("file",imgfile);
      console.log(formdata)
      //发送请求
      testPostImage(formdata).then(res => {
        console.log(res)
      })
    },
    convertBase64UrlToImgFile(urlData, fileName, fileType) {
      var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }

      return new Blob( [ab] , {type : 'image/png'});
    }
  }
};
</script>

<style scoped></style>
