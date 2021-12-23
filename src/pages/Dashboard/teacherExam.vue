<template>
  <div>
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <my-list title="考试信息" :items="examList" :fields="fields">
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="其他功能" active>
              <b-button
                  block
                  class="mr-2 mb-2"
                  variant="outline-info"
                  @click="handleCorrect(row.row.item)"
              >
                批改试卷
              </b-button>
              <b-button
                  block
                  class="mr-2 mb-2"
                  variant="outline-info"
                  @click="handleCheckGrade(row.row.item)"
              >
                查看成绩
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
import {courseGetExam} from "@/api";

export default {
  name: "teacherExam",
  components: {
    myList,
    PageTitle,
  },
  props: {
    courseId: Number,
  },
  mounted() {
    courseGetExam(1000)
        .then((res) => {
          console.log(res);
          if (res.code === 100) {
            res.data.forEach((value) => {
              console.log(value)
              value._showDetails = false;
              value.isActive = false;
              value.end_time = value.end_time.slice(0, 10) + " " + value.end_time.slice(11, 16)
              value.start_time = value.start_time.slice(0, 10) + " " + value.start_time.slice(11, 16)
              this.examList.push(JSON.parse(JSON.stringify(value)));
            });
            console.log(this.examList);
          } else {
            alert(res.msg);
          }
        })
        .catch((error) => {
          alert(error);
        });
  },
  data() {
    return {
      heading: "考试管理",
      subheading:
          "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "考试管理",
          active: true,
        },
      ],

      examList: [],
      fields: [
        {label: "考试id", key: "exam_id"},
        {
          label: "名称",
          key: "title",
        },
        {label: "开始时间", key: "start_time"},
        {label: "结束时间", key: "end_time"},
      ],
    };
  },
  methods: {
    handleCorrect(item) {
      // console.log(item)
      this.$router.push({
        name: "correctedQuestion",
        params: {
          courseId: this.courseId,
          // courseId:1000,
          examId: item.exam_id,
        },
      });
    },
    handleCheckGrade(item) {
      this.$router.push({
        name: "CertainExam",
        params: {
          courseId: this.courseId,
          examId: item.exam_id,
        },
      });
    }
  },
};
</script>

<style scoped></style>
