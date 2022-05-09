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
import {getHomeworkByCourseId, getHomeworkByStudent} from "@/api";

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
          "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "作业信息",
          active: true,
        },
      ],

      examList: [],
      fields: [
        {label: "课程id", key: "courseId"},
        {label: "作业id", key: "homeworkId"},
        {
          label: "名称",
          key: "title",
        },
        {label: "分数", key: "score"},
        {label: "开始时间", key: "start_time"},
        {label: "结束时间", key: "end_time"},
      ]
    };
  },
  mounted() {
    getHomeworkByStudent()
        .then((res) => {
          if (res.code === 100) {

            res.data.forEach((value) => {
              let endTime = new Date(value.end_time)
              let startTime = new Date(value.start_time)
              endTime.setHours(endTime.getHours() - 8)
              startTime.setHours(startTime.getHours() - 8)
              value._showDetails = false;
              value.isActive = false;
              value.end_time = endTime.format("yyyy-MM-dd hh:mm:ss")
              value.start_time = startTime.format("yyyy-MM-dd hh:mm:ss")
              this.examList.push(JSON.parse(JSON.stringify(value)));
            });
            //根据开始时间排序
            this.examList.sort((a, b) => {
              return (new Date(a.start_time)) < (new Date(b.start_time)) ? -1 : 1;
            });
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
      this.$router.push({
        name: "homeworkTest",
        params: {
          studentId: this.$store.state.global.id,
          homeworkId: item.homeworkId,
        },
      });
    },
    gotoHomeworkFeedback(item) {
      this.$router.push({
        name: "homeworkFeedback",
        params: {
          studentId: this.$store.state.global.id,
          homeworkId: item.homeworkId,
        },
      });
    },
    gotoCommentSection(item) {
      this.$router.push({
        path: "/dashboard/commentSection",
        query: {
          homeworkId: item.homeworkId,
        },
      });
    }
  }
}
</script>

<style scoped>

</style>
