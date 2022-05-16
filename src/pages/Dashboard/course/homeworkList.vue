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
            <!--老师-->
            <template v-if="accountType===0">
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
                  管理学生
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
            </template>

            <!--学生-->
            <template v-else>
<!--              <b-tab title="作业信息"active>-->

<!--              </b-tab>-->
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
            </template>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import myList from "@/components/myList";
import PageTitle from "@/layout/Components/PageTitle.vue";
import {getHomeworkByCourseId} from "@/api";

export default {
  name: "homeworkList",
  components: {
    myList,
    PageTitle,
  },
  props: {
    courseId: Number,
  },
  mounted() {
    getHomeworkByCourseId(this.courseId)
        .then((res) => {
          console.log(res)
          if (res.code === 100) {

            res.data.forEach((value) => {
              let end_time = new Date(value.end_time)
              let start_time = new Date(value.start_time)
              end_time.setHours(end_time.getHours() - 8)
              start_time.setHours(start_time.getHours() - 8)
              value._showDetails = false;
              value.isActive = false;
              value.end_time = end_time.format("yyyy-MM-dd hh:mm:ss")
              value.start_time = start_time.format("yyyy-MM-dd hh:mm:ss")
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
  data() {
    return {
      accountType: this.$store.state.global.accountType,
      heading: "作业管理",
      subheading:
          "管理学生的作业！",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "作业管理",
          active: true,
        },
      ],

      examList: [],
      fields: [
        {label: "作业id", key: "id"},
        {
          label: "名称",
          key: "title",
        },
        {label: "开始时间", key: "start_time"},
        {label: "结束时间", key: "end_time"},
      ]
    };
  },
  methods: {
    handleCorrect(item) {
      console.log(item)
      this.$router.push({
        name: "correctedQuestion",
        params: {
          courseId: this.courseId,
          homeworkId: item.id,
          title: item.title,
          starttime: item.start_time
        },
      });
    },
    handleCheckGrade(item) {
      console.log(item)
      this.$router.push({
        name: "CertainExam",
        params: {
          courseId: this.courseId,
          homeworkId: item.id,
          title: item.title,
          starttime: item.start_time
        },
      });
    },
    handleTakeHomework(item) {
      console.log(item, this.courseId)
      this.$router.push({
        name: "homeworkTest",
        params: {
          courseId: this.courseId,
          homeworkId: item.id,
          title: item.title,
          starttime: item.start_time
        },
      });
    },
    gotoHomeworkFeedback(item) {
      this.$router.push({
        name: "homeworkFeedback",
        params: {
          studentId: this.$store.state.global.id,
          homeworkId: item.id,
          title: item.title,
          starttime: item.start_time
        },
      });
    },
    gotoCommentSection(item) {
      this.$router.push({
        path: "/dashboard/commentSection",
        query: {
          homeworkId: item.id,
          title: item.title
        },
      });
    }
  },
};
</script>

<style scoped></style>
