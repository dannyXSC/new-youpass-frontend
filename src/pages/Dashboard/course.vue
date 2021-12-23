<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <my-list title="课程信息" :items="items" :fields="fields">
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
              <template
                v-for="variant in [
                  'primary',
                  'secondary',
                  'success',
                  'info',
                  'warning',
                  'danger',
                  'focus',
                  'alternate',
                  'light',
                  'dark',
                  'link',
                ]"
              >
                <b-button class="mr-2 mb-2" :variant="variant" :key="variant">
                  {{ variant }}
                </b-button>
              </template>
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
          text: "Admin",
          href: "#",
        },
        {
          text: "Manage",
          href: "#",
        },
        {
          text: "Library",
          active: true,
        },
      ],
    };
  },
  methods: {
    enterExam(courseId, exam_id) {
      this.$store.dispatch("global/setSession", {
        courseId: courseId,
        examId: exam_id,
      });
    },
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
