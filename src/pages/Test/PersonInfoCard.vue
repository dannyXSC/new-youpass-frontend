<template>
  <div>
    <b-card border-variant="success">
      <b-card-header style="font-size: 2em">About Me</b-card-header>
      <b-card-body>
        <b-row>
          <b-col>
            <b-card-img-lazy left src="https://picsum.photos/125/125/?image=58" height="200"
                             width="200" role="button" v-b-modal.pictureModal></b-card-img-lazy>
          </b-col>
          <b-col cols="8">
            <b-card-text style="font-size: 2.5em;color: #0ba360">{{ personInfo.name }}</b-card-text>
            <b-card-text style="font-size: 1.5em">学号:{{ personInfo.id }}</b-card-text>
            <b-card-text style="font-size: 1.5em">邮箱:{{ personInfo.email }}</b-card-text>
            <b-card-text style="font-size: 1.5em">家庭住址:{{ personInfo.location }}</b-card-text>
          </b-col>
          <b-col>
            <b-dropdown squared variant="success" style="float: right" dropleft text="修改个人信息" class="m-2">
              <b-dropdown-form>
                <b-form-group label="昵称">
                  <b-form-input placeholder="nickname" v-model="updateInfo.name" :state="nameInvalid">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="学号">
                  <b-form-input placeholder="id" v-model="updateInfo.id" :state="idInvalid">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="邮箱">
                  <b-form-input placeholder="email" v-model="updateInfo.email">
                  </b-form-input>
                </b-form-group>
                <b-button variant="success" :disabled="ifInfoProper" @click="submitInfo">提交</b-button>
              </b-dropdown-form>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-modal id="pictureModal" size="lg" hide-header hide-footer>
      <div id="app" style="text-align: center">
        <b-img role="button" class="uploadImageStyle" @click="toggleShow" src="https://picsum.photos/125/125/?image=58"></b-img>
        <my-upload field="img"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :width="300"
                   :height="300"
                   url="/upload"
                   :params="params"
                   :headers="headers"
                   img-format="png"></my-upload>
        <img :src="imgDataUrl">
      </div>
<!--      <b-img center src="https://picsum.photos/125/125/?image=58" height="500"-->
<!--             width="500" role="button" v-b-modal.updateAvater></b-img>-->
    </b-modal>
<!--    <b-modal id="updateAvater" hide-footer>-->
<!--      <b-form-file-->
<!--          v-model="avater"-->
<!--          :state="Boolean(avater)"-->
<!--          placeholder="Choose a file or drop it here..."-->
<!--          drop-placeholder="Drop file here..."-->
<!--      ></b-form-file>-->
<!--      <div class="mt-3" style="margin-bottom: 1.5em">Selected file: {{ avater ? avater.name : '' }}</div>-->
<!--      <b-button style="float: right" variant="success" @click="submitAvater">提交</b-button>-->
<!--    </b-modal>-->
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
export default {
  name: "PersonInfoCard",
  components: {
    'my-upload': myUpload
  },
  data() {
    return {
      personInfo: {
        id: this.$store.state.global.id,
        name: this.$store.state.global.name,
        email: this.$store.state.global.email,
        location: this.$store.state.global.location,
      },
      updateInfo:{
        id: this.$store.state.global.id,
        name: this.$store.state.global.name,
        email: this.$store.state.global.email,
        location: this.$store.state.global.location,
      },
      avater:null,
      show: true,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: ''
    }
  },
  computed:{
    nameInvalid(){
      return this.updateInfo.name.length>0
    },
    idInvalid(){
      return this.updateInfo.id.toString().length>0
    },
    ifInfoProper(){
      return !(this.updateInfo.name.length>0||this.updateInfo.id.length>0)
    }
  },
  methods:{
    submitInfo(){
      console.log(this.updateInfo)
    },
    submitAvater(){

    },
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ' + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }
  },
}
</script>

<style scoped>
.uploadImageStyle{
  width: 40em;
  height: 40em;
}
</style>
