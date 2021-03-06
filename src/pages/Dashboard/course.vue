<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <my-list
      v-if="accountType == 1"
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
            </b-tab>
            <b-tab title="考试信息" active>
              <li
                v-for="exam in row.row.item.examList"
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
                        考试编号：{{ exam.exam_id }} <br />
                        开始时间：{{ exam.start_time.slice(0, 10) }}
                        {{ exam.start_time.slice(11, 16) }} <br />
                        结束时间：{{ exam.end_time.slice(0, 10) }}
                        {{ exam.end_time.slice(11, 16) }}
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <button
                        type="button"
                        class="btn btn-light"
                        @click="enterExam(exam.courseId, exam.exam_id)"
                      >
                        进入考试
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
                  @click="getGrade(row.row.item.ID, row.row.item.课程名称)"
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
      v-if="accountType == 0"
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
                  @click="teacherExam(row.row.item.ID)"
                >
                  管理考试
                </b-button>
                <b-button
                  block
                  type="button"
                  class="btn btn-light md-2"
                  @click="postExam(row.row.item.ID)"
                >
                  发布考试
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

import { getStuCourseExamScore } from "@/api/index";

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
    };
  },
  methods: {
    getGrade(courseId) {
      let gradeData = [];
      getStuCourseExamScore(courseId)
        .then((res) => {
          gradeData = res.data;
          let responseList = [];
          gradeData.forEach((element) => {
            responseList.unshift({ name: element.title, value: element.score });
          });
          console.log(responseList);
          this.$router.push({
            name: "studentExam",
            params: {
              responseList: responseList,
            },
          });
        })
        .catch((err) => alert(err));
    },
    enterExam(courseId, exam_id) {
      this.$store.dispatch("global/setSession", {
        courseId: courseId,
        examId: exam_id,
      });
    },
    teacherExam(courseId) {
      this.$router.push({
        name: "teacherExam",
        params: {
          courseId: courseId,
        },
      });
    },
    postExam(courseId) {
      this.$router.push({
        name: "postExam",
        params: {
          courseId: courseId,
        },
      });
    },
    addQuestion(courseId) {
      this.$router.push({
        name: "addQuestion",
        params: {
          courseId: courseId,
        },
      });
    }
  },
  computed: {
    items() {
      console.log("computed" + this.$store.state.global.courseListStu);
      let return_item = [];
      for (let i = 0; i < this.$store.state.global.courseListStu.length; ++i) {
        return_item.unshift({
          _showDetails: false,
          isActive: true,
          课程名称: this.$store.state.global.courseListStu[i].courseInfo.title,
          ID: this.$store.state.global.courseListStu[i].courseInfo.courseId,
          teacherId: this.$store.state.global.courseListStu[i].teacherId,
          teacherName: this.$store.state.global.courseListStu[i].teacherName,
          examList: this.$store.state.global.courseListStu[i].exams,
        });
      }
      return return_item;
    },
    t_items() {
      console.log("computed teacher" + this.$store.state.global.courseListTea);
      let return_item = [];
      for (let i = 0; i < this.$store.state.global.courseListTea.length; ++i) {
        return_item.unshift({
          _showDetails: false,
          isActive: true,
          课程名称: this.$store.state.global.courseListTea[i].title,
          ID: this.$store.state.global.courseListTea[i].courseId,
          examListTea:
            this.$store.state.global.courseListTea[i].examReturnInfoSet,
        });
      }
      return return_item;
    },
    accountType() {
      return this.$store.state.global.accountType;
    },
  },
  mounted() {
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
