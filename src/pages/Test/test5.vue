<template>
  <div>
    <my-image-editor
        :path="path"
        :name="name"
        :id="id"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
    <button @click="handleClick">click me</button>
    <b-img :src="image" fluid alt="Responsive image"></b-img>
  </div>

</template>

<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import MyEditModal from "@/components/myEditModal";
import {deleteImageByName, testPostImage} from "@/api";
import MyImageEditor from "@/components/myImageEditor";

export default {
  name: "test5",
  components: {MyImageEditor},
  data() {
    return {
      path: "http://dannyxsc.xyz/img/image-20220225233444664.png",
      name: "123",
      id: "image-editor",
      image: "",
    };
  },
  methods: {
    handleSubmit(img) {
      console.log(img)
      this.image = img;
    },
    handleCancel() {
    },
    handleClick() {
      this.$nextTick(_ => this.$bvModal.show(this.id))
    }
  }
};
</script>

<style scoped></style>
