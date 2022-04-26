<template>
  <div>
    <vue-dropzone
        ref="myVueDropzone"
        id="dropzone"
        :options="dropzoneOptions"
        @vdropzone-success="onSuccess"
        @vdropzone-removed-file="onRemovedFile"
    ></vue-dropzone>
    <button @click="test">click me</button>
  </div>

</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import axios from "axios";

export default {
  name: "test2.vue",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "/api/testUploadImage",
        methods: "post",
        thumbnailWidth: 150,
        maxFilesize: 1,
        addRemoveLinks: true,
        headers: {"My-Awesome-Header": "header value"},
        init: function () {
          // If the thumbnail is already in the right size on your server:
          // callback and crossOrigin are optional
          // let mockFile = { name: "Filename", size: 12345 };
          // this.displayExistingFile(mockFile, 'https://image-url');
          // this.files.push(mockFile);    // add to files array
          // this.emit("addedfile", mockFile);
          // this.emit("thumbnail", mockFile, 'http://dannyxsc.xyz/img/image-20220225222647576.png');
          // this.emit("complete", mockFile);
        }
      },
      dropzoneObject:null,
    }
  },
  mounted() {
    var mockFile = {
      name: 'FileName',
      size: '1000',
      type: 'image/jpeg',
      thumbnailWidth: 150,
      accepted: true            // required if using 'MaxFiles' option
    };

    this.$refs.myVueDropzone.manuallyAddFile(mockFile,'http://dannyxsc.xyz/img/image-20220225222647576.png');
    this.dropzoneObject = this.$refs.myVueDropzone.dropzone;
    // this.dropzoneObject.displayExistingFiles()
    // this.$refs.myVueDropzone.dropzone.files.push(mockFile);
    // this.$refs.myVueDropzone.dropzone.emit("addedfile", mockFile);
    // this.$refs.myVueDropzone.dropzone.emit("thumbnail", mockFile, 'http://dannyxsc.xyz/img/image-20220225222647576.png');
    // this.$refs.myVueDropzone.dropzone.emit("complete", mockFile);
    // console.log(this.$refs.myVueDropzone.dropzone)
  },
  methods: {
    onSuccess(file, response) {
      console.log("******************************")
      console.log("1",file, response)
      if (response.code === 100) {
        // $(file.previewElement).remove();

      }else{
        console.log(123)
        this.$refs.myVueDropzone.removeFile(file);
      }
    },
    onRemovedFile(file, error, xhr) {
      console.log(file, error, xhr)
      console.log(this.dropzoneObject)
    },
    test() {
      console.log(this.$refs.myVueDropzone.dropzone)
    }
  },
  props: {},
  computed: {},
};
</script>

<style scoped></style>
