<template>
<b-card>
  <b-card-header header-text-variant="success" style="font-size: 2em">{{title}}</b-card-header>
  <b-card-body>
    <b-row style="margin-bottom: 2em">
      <b-col cols="3">
        课程:{{courseName}}
      </b-col>
      <b-col>
        指导教师:{{teacherName}}
      </b-col>
    </b-row>
    <b-row style="margin-bottom: 2em">
      <b-col cols="3">
        开始时间:{{startTime}}
      </b-col>
      <b-col>
        截止时间:{{endTime}}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="success" v-b-toggle.commentToHomework>
          发起评论
        </b-button>
      </b-col>
    </b-row>
  </b-card-body>
  <b-collapse id="commentToHomework">
    <b-row style="margin-left: 1em">
      <b-col cols="10">
        <b-form-textarea
            v-model="myComment"
            placeholder="说点什么..."
            rows="3"
            max-rows="6"
        ></b-form-textarea>
      </b-col>
      <b-col cols="2">
        <b-button-group vertical size="lg">
          <b-button type="submit" style="height: 2em" variant="success" @click="submit">提交
          </b-button>
          <b-button type="reset" style="height: 2em" variant="danger" @click="clear">
            清除
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
  </b-collapse>
</b-card>
</template>

<script>
import {getHomeworkInfo, sendHomeworkComment, submitComment} from "@/api";
export default {
  name: "homeworkInfoCard",
  props:{
    homeworkId:Number
  },
  data(){
    return{
      title:"",
      courseName:"",
      teacherName:"",
      startTime:"",
      endTime:"",
      myComment:""
    }
  },
  mounted() {
    this.getHomeworkInfo()
  },
  methods:{
    getHomeworkInfo(){
      getHomeworkInfo(this.homeworkId).then(res=>{
        this.title=res.data.title
        this.courseName=res.data.courseName
        this.teacherName=res.data.teacherName
        this.startTime=res.data.startTime
        this.endTime=res.data.endTime
      })
    },
    clear(){
      this.myComment=""
    },
    submit(){
      console.log(this.homeworkId)
      submitComment(this.$store.state.global.id,this.homeworkId,-1,1,this.myComment).then(res=>{
        this.myComment=""
        this.$parent.init()
      })
    }
  }
}
</script>

<style scoped>

</style>
