<template>
  <div>
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <my-list title="作业信息" :items="examList" :fields="fields">
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>

            <!--学生-->
            <b-tab title="其他功能">

              <b-button
                  block
                  class="mr-2 mb-2"
                  variant="outline-info"
                  @click="handleTakeHomework(row.row.item)"
              >
                做作业
              </b-button>
              <b-button
                  block
                  class="mr-2 mb-2"
                  variant="outline-info"
                  @click="gotoHomeworkFeedback(row.row.item)"
              >
                查看作业反馈
              </b-button>
              <b-button
                  block
                  class="mr-2 mb-2"
                  variant="outline-info"
                  @click="gotoCommentSection(row.row.item)"
              >
                进入讨论区
              </b-button>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import myList from "@/components/myList";
import PageTitle from "@/layout/Components/PageTitle.vue";
import {getHomeworkByCourseId, getHomeworkByStudent, getSubmitByStudent} from "@/api";
import async from "async";
import * as $axios from "@/api";

export default {
  name: "homeworkListOfStudent",
  components: {
    myList,
    PageTitle,
  },
  data() {
    return {
      accountType: this.$store.state.global.accountType,
      heading: "作业管理",
      subheading:
          "记得按时完成作业！",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      submit: "未提交",
      breadcrumbItem: [
        {
          text: "作业管理",
          active: true,
        },
      ],

      examList: [],
      fields: [
        {label: "课程id", key: "courseId"},
        {label: "作业id", key: "id"},
        {
          label: "名称",
          key: "title",
        },
        // {label: "分数", key: "score"},
        {label: "开始时间", key: "startTime"},
        {label: "结束时间", key: "endTime"},
        {label: "是否完成", key: "submit"}
      ]
    };
  },
  mounted: function () {

     getHomeworkByStudent(this.$store.state.global.id)
        .then( (res) => {
          // console.log(res)
          if (res.code === 100) {
            res.data.forEach((value) => {
            getSubmitByStudent(this.$store.state.global.id, value.id).then( (response) => {
                if (response.code === 100) {
                  response.data.forEach((item) => {
                    // console.log(item.submit === 1)
                    if (item.submit === 0) {
                      this.submit = "未提交";
                    } else {
                      this.submit = "已提交";
                      console.log(this.submit)
                    }
                    let endTime = new Date(value.endTime)
                    let startTime = new Date(value.startTime)
                    console.log(endTime)
                    console.log(startTime)
                    endTime.setHours(endTime.getHours()-8)
                    startTime.setHours(startTime.getHours() -8)
                    value._showDetails = false;
                    value.isActive = false;
                    value.endTime = endTime.toLocaleDateString()+' '+endTime.toLocaleTimeString()
                    value.startTime = startTime.toLocaleDateString()+' '+startTime.toLocaleTimeString()


                    value.submit = this.submit
                    console.log(value)
                    this.examList.push(JSON.parse(JSON.stringify(value)));
                  })
                }
              })

            });
            //根据开始时间排序
            //TODO
            this.examList.sort((a, b) => {
              return (new Date(a.startTime)) < (new Date(b.startTime)) ? -1 : 1;
            });
            console.log(this.examList)
          } else {
            alert(res.msg);
          }
        })
        .catch((error) => {
          alert(error);
        });
  },
  methods: {
    handleTakeHomework(item) {
      console.log("当前时间"+new Date().format("yyyy-MM-dd hh:mm:ss"))
      console.log("截止时间"+item.endTime)
      if(new Date().format("yyyy-MM-dd hh:mm:ss")>item.endTime){
        this.$toast.warning("作业截止时间已过！不能再提交作业！")
      }
      else{
        this.$router.push({
          name: "homeworkTest",
          params: {
            studentId: this.$store.state.global.id,
            homeworkId: item.id,
            title: item.title,
            starttime: item.startTime,
            courseId: this.courseId,
          },
        });
      }

    },
    gotoHomeworkFeedback(item) {
      console.log(item)
      if(new Date().format("yyyy-MM-dd hh:mm:ss")>item.endTime){
        this.$router.push({
          name: "homeworkFeedback",
          params: {
            studentId: this.$store.state.global.id,
            homeworkId: item.id,
            title: item.title,
            starttime: item.startTime
          }});
      }
      else if (item.submit === "未提交") {
        this.$toast.warning("当前作业未提交，不能查看作业反馈！")
      } else {
        this.$router.push({
          name: "homeworkFeedback",
          params: {
            studentId: this.$store.state.global.id,
            homeworkId: item.id,
            title: item.title,
            starttime: item.startTime
          },
        });
      }
    },

    gotoCommentSection(item) {
      this.$router.push({
        name: "commentSection",
        params:{
          courseId: item.courseId,
          homeworkId: item.id,
          title: item.title
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
