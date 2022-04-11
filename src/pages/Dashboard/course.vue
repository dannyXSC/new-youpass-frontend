<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <my-list
      v-if="accountType === 1"
      title="课程信息"
      :items="items"
      :fields="fields"
    >
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="课程信息" active>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        授课教师：{{ row.row.item.teacherName }}
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-heading">
                        编号： {{ row.row.item.teacherId }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        网课网址：{{ row.row.item.url }}
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-heading">
                        密码： {{ row.row.item.password }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        上课时间：{{ row.row.item.courseTime }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </b-tab>
            <b-tab title="作业信息" active>
              <li
                v-for="exam in row.row.item.assignments"
                :key="exam.id"
                class="list-group-item"
              >
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        {{ exam.title }}
                      </div>
                      <div class="widget-subheading">
                        作业编号：{{ exam.assignmentId }} <br />
                        截止时间：{{ exam.end_time.slice(0, 10) }}
                        {{ exam.end_time.slice(11, 16) }}
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <button
                        type="button"
                        class="btn btn-light"
                        @click="enterAssignment(exam.courseId, exam.assignmentId)"
                      >
                        编辑作业
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </b-tab>
            <b-tab title="其他功能">
              <div class="widget-content-right">
                <b-button
                  block
                  type="button"
                  class="btn btn-light md-2"
                  @click="getAssignmentsResults(row.row.item.courseId)"
                >
                  查看课程考试成绩
                </b-button>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>

    <my-list
      v-if="accountType === 0"
      title="我的课程"
      :items="t_items"
      :fields="fields"
    >
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="课程信息" active>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <div class="widget-heading">
                        课程名称：<br /><br />课程编号：
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-heading">
                        {{ row.row.item.课程名称 }}<br /><br />{{
                          row.row.item.ID
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </b-tab>
            <b-tab title="其他功能">
              <div class="widget-content-right">
                <b-button
                  block
                  type="button"
                  class="btn btn-light md-2"
                  @click="manageAssignments(row.row.item.ID)"
                >
                  管理作业
                </b-button>
                <b-button
                  block
                  type="button"
                  class="btn btn-light md-2"
                  @click="releaseAssignment(row.row.item.ID)"
                >
                  发布作业
                </b-button>
                <b-button
                    block
                    type="button"
                    class="btn btn-light md-2"
                    @click="addQuestion(row.row.item.ID)"
                >
                  上传题目
                </b-button>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

import {getStuCourses ,getTeaCourses} from "@/api/index";

export default {
  name: "course",
  components: { MyList, PageTitle },
  data() {
    return {
      heading: "课程信息",
      subheading: "记得按时上课哦！",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      fields: ["课程名称", "ID"],
      showChart: false,
      bars: [
        { variant: "success", value: 75 },
        { variant: "info", value: 75 },
        { variant: "warning", value: 75 },
        { variant: "danger", value: 75 },
        { variant: "primary", value: 75 },
        { variant: "secondary", value: 75 },
        { variant: "dark", value: 75 },
        { variant: "alternate", value: 75 },
        { variant: "focus", value: 75 },
      ],
      breadcrumbItem: [
        {
          text: "课程信息",
          active: true,
        },
      ],
      courseListStu:[],
      courseListTea:[],
    };
  },
  methods: {
    getAssignmentsResults(courseId){

    },
    enterAssignment(courseId,assignmentId){

    },
    manageAssignments(courseId) {

    },
    releaseAssignment(courseId) {

    },
    addQuestion(courseId) {

    }
  },
  computed: {
    items() {
      let return_item = [];
      for (let i = 0; i < this.courseListStu.length; ++i) {
        return_item.unshift({
          _showDetails: false,
          isActive: true,
          课程名称: this.courseListStu[i].name,
          name:this.courseListStu[i].name,
          ID: this.courseListStu[i].courseId,
          teacherId: this.courseListStu[i].teacherId,
          teacherName: this.courseListStu[i].teacherName,
          assignments: this.courseListStu[i].assignments,
          url:this.courseListStu[i].url,
          courseTime:this.courseListStu[i].courseTime,
          password:this.courseListStu[i].password
        });
      }
      return return_item;
    },
    t_items() {
      let return_item = [];
      for (let i = 0; i < this.courseListTea.length; ++i) {
        return_item.unshift({
          _showDetails: false,
          isActive: true,
          课程名称: this.courseListTea[i].title,
          ID: this.courseListTea[i].courseId,
          examListTea:
            this.courseListTea[i].assignments,
        });
      }
      return return_item;
    },
    accountType() {
      return this.$store.state.global.accountType;
    },
  },
  mounted() {
    if(this.$store.state.global.accountType===1){
      getStuCourses(this.$store.state.global.id).then((res)=>{
        if(res.code===100){
          this.courseListStu=res.data
        }
        else {
          this.$bvToast.toast("未检索到相关课程信息", {
            title: "提示",
            variant: "danger",
            solid: true,
            autoHideDelay: 2000
          });
        }
      })
    }
    else{
      getTeaCourses().then((res)=>{
        if(res.code===100){
          this.courseListTea=res.data
        }
        else {
          this.$bvToast.toast("未检索到相关课程信息", {
            title: "提示",
            variant: "danger",
            solid: true,
            autoHideDelay: 2000
          });
        }
      })
    }
    this.timer = setInterval(() => {
      this.bars.forEach((bar) => (bar.value = 25 + Math.random() * 75));
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped></style>
