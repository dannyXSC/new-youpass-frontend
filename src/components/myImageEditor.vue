<template>
  <b-modal
      :id="id"
      size="xl"
      title="Edit Image"
      style="height: 80%"
      @hide="handleExit"
  >
    <div style="height: 70vh">
      <tui-image-editor ref="tuiImageEditor" :include-ui="useDefaultUI" :options="options"></tui-image-editor>
    </div>
  </b-modal>
</template>

<script>
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';
import {ImageEditor} from '@toast-ui/vue-image-editor';
import convertBase64UrlToImgFile from "@/utils/base64ToFile";
import {testPostImage} from "@/api";

export default {
  name: "myImageEditor",
  components: {
    'tui-image-editor': ImageEditor,
  },
  props: {
    path: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
    },
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
            path: this.path,
            name: this.name,
          },
        },
      },
    };
  },
  methods: {
    handleExit(trigger) {
      if (trigger.trigger === "ok") {
        //返回的是base64
        let img = this.$refs.tuiImageEditor.invoke('toDataURL')
        this.$emit("onSubmit", img)
      } else {
        this.$emit("onCancel")
      }
    }
  },
  // methods: {
  //   handleClick() {
  //     //创建formdata对象
  //     let formdata = new FormData();
  //     let a = this.$refs.tuiImageEditor.invoke('toDataURL')
  //     let imgfile = convertBase64UrlToImgFile(a, 'test.jpeg', 'image/jpeg')
  //     //将文件添加到formdata里面
  //     formdata.append("file",imgfile);
  //     console.log(formdata)
  //     //发送请求
  //     testPostImage(formdata).then(res => {
  //       console.log(res)
  //     })
  //   },
  // }

}
</script>

<style scoped>

</style>