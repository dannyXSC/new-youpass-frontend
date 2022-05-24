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
import {getHomeworkByStudent, getHomeworkInfo, sendHomeworkComment, submitComment} from "@/api";
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
    this.init()
  },
  methods:{
    init(){
      this.getHomeworkInfo()
    },
    getHomeworkInfo(){
      getHomeworkByStudent(this.$store.state.global.id).then(res=>{
        console.log(this.$store.state.global.id)
        res.data.forEach((value) => {
          let endTime = new Date(value.endTime)
          let startTime = new Date(value.startTime)
          endTime.setHours(endTime.getHours() - 8)
          startTime.setHours(startTime.getHours() - 8)
          value.endTime = endTime.format("yyyy-MM-dd hh:mm:ss")
          value.startTime = startTime.format("yyyy-MM-dd hh:mm:ss")
        });
        let target={}
                    console.log(res.data.length)
        for(let i=0;i<res.data.length;i++){
          console.log(this.homeworkId)
          console.log(res.data[i].id)
          if(res.data[i].id===this.homeworkId){
            target=res.data[i]
            break
          }
        }
        this.title=target.title
        this.courseName=target.teacherId
        this.teacherName=target.courseId
        this.startTime=target.startTime
        this.endTime=target.endTime
      })
    },
    clear(){
      this.myComment=""
    },
    submit(){
      submitComment(this.$store.state.global.id,this.homeworkId,-1,this.$store.state.global.accountType,this.myComment).then(res=>{
        this.myComment=""
        this.$emit("change")
      })
    }
  }
}
</script>

<style scoped>

</style>
