<template>
  <div>
    <b-card border-variant="success">
      <b-card-header style="font-size: 2em">个人信息</b-card-header>
      <b-card-body>
        <b-row>
          <b-col>
            <b-card-img-lazy left :src="personInfo.avater" height="200"
                             width="200" role="button" v-b-modal.pictureModal ></b-card-img-lazy>
          </b-col>
          <b-col cols="8">
            <b-card-text style="font-size: 2.5em;color: #0ba360">{{ personInfo.name }}</b-card-text>
            <b-card-text style="font-size: 1.5em">学号:{{ personInfo.id }}</b-card-text>
            <b-row>
              <b-col>
                <b-card-text style="font-size: 1.5em">性别:{{personInfo.sex}}</b-card-text>
                <b-card-text style="font-size: 1.5em">联系电话:{{personInfo.phone}}</b-card-text>
              </b-col>
              <b-col>
                <b-card-text style="font-size: 1.5em">邮箱:{{ personInfo.email }}</b-card-text>
                <b-card-text style="font-size: 1.5em">学校:{{ personInfo.school }}</b-card-text>
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-dropdown squared variant="success" ref="uploadInfo" style="float: right" dropleft text="修改个人信息" class="m-2">
              <b-dropdown-form>
                <b-form-group label="姓名">
                  <b-form-input placeholder="nickname" v-model="updateInfo.name" :state="nameInvalid">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="性别">
                  <b-form-select v-model="updateInfo.sex" :options="sexOptions">

                  </b-form-select>
                </b-form-group>
                <b-form-group label="联系电话">
                  <b-form-input placeholder="phone" v-model="updateInfo.phone" :state="phoneInvalid">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="学校">
                  <b-form-input placeholder="school" v-model="updateInfo.school" :state="schoolInvalid">
                  </b-form-input>
                </b-form-group>
                <b-button variant="success" :disabled="ifInfoProper" @click="submitInfo">提交</b-button>
              </b-dropdown-form>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
    <b-modal id="pictureModal" size="lg" hide-footer title="点击图片以更换头像" title-class="center">
      <b-img center :src="personInfo.avater" height="500"
             width="500" role="button" v-b-modal.updateAvater></b-img>
    </b-modal>
    <b-modal id="updateAvater" ref="updateAvater" hide-footer>
      <b-form-file
          v-model="avater"
          :state="Boolean(avater)"
          placeholder="选择一个文件或拖入文件到此位置..."
          drop-placeholder="拖入文件"
          langType="ch"
      ></b-form-file>
      <div class="mt-3" style="margin-bottom: 1.5em">请选择文件... {{ avater ? avater.name : '' }}</div>
      <b-button style="float: right" variant="success" @click="submitAvater">提交</b-button>
    </b-modal>
  </div>
</template>

<script>
import {getHisInfo ,updateInfo, updateAvater, getHisImage, updateAvaterStage2} from "@/api";

export default {
  name: "PersonInfoCard",
  data() {
    return {
      personInfo: {
        id:0,
        name:'',
        email:'',
        school:'',
        sex:'',
        phone:'',
        avater:''
      },
      updateInfo: {
        name:'',
        school:'',
        sex:'',
        phone:'',
        avater:''
      },
      sexOptions:[
        { value: '男', text: '男' },
        { value: '女', text: '女' },
      ],
      avater:null
    }
  },
  mounted() {
    this.init()
  },
  computed: {
    nameInvalid() {
      return this.updateInfo.name.length > 0
    },
    phoneInvalid() {
      return this.updateInfo.phone.length > 0
    },
    schoolInvalid(){
      return this.updateInfo.school.length > 0
    },
    ifInfoProper() {
      return !(this.updateInfo.name.length > 0 && this.updateInfo.phone.length > 0 && this.updateInfo.school.length > 0)
    }
  },
  methods: {
    init(){
      getHisInfo().then((res)=>{
        if(res.data.name!=null) this.personInfo.name=this.updateInfo.name=res.data.name
        if(res.data.id!=null)  this.personInfo.id=res.data.id
        if(res.data.sex!=null)  this.personInfo.sex=this.updateInfo.sex=res.data.sex
        if(res.data.email!=null)  this.personInfo.email=res.data.email
        if(res.data.phone!=null)  this.personInfo.phone=this.updateInfo.phone=res.data.phone
        if(res.data.school!=null)  this.personInfo.school=this.updateInfo.school=res.data.school
      })
      getHisImage().then(res=>{
        this.personInfo.avater=this.updateInfo.avater=res.data
      })
    },
    submitInfo() {
      updateInfo(this.updateInfo).then((res)=>{
        if(res.code===100){
          console.log('update success')
        }
        else{
          this.$bvToast.toast("上传失败", {
            title: "提示",
            variant: "danger",
            solid: true,
            autoHideDelay: 2000
          });
        }
        this.$refs.uploadInfo.hide()
        this.init()
      })
    },
    submitAvater() {
      let update=new FormData()
      update.append('file',this.avater)
      updateAvater(update).then((res2)=>{
        updateAvaterStage2(res2.data.id).then(res=>{
          if(res.code===100){
            this.$refs.updateAvater.hide()
            this.init()
          }
          else{
            this.$bvToast.toast("上传头像失败", {
              title: "提示",
              variant: "danger",
              solid: true,
              autoHideDelay: 2000
            });
          }
            })
      })
    }
  },
}
</script>

<style scoped>
.center{
  /*text-align: center;*/
  align-items: center;
}
</style>
