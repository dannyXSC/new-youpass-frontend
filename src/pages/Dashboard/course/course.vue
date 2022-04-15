<template>
  <div>
    <my-course-modal
        id="createCourseModal"
        @onSubmit="handleCreate"
        @onCancel="handleCancelCreate"
    />

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
            <b-tab title="其他功能">
              <div class="widget-content-right">
                <b-button
                    block
                    type="button"
                    class="btn btn-light md-2"
                    @click="gotoHomeworkList(row.row.item)"
                >
                  查看作业列表
                </b-button>
                <b-button
                    block
                    type="button"
                    class="btn btn-error md-2"
                    @click="quitCourse(row.row.item)"
                >
                  退出课程
                </b-button>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>

    <!--老师-->
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
                        课程名称：<br/><br/>课程编号：
                      </div>
                    </div>
                    <div class="widget-content-right">
                      <div class="widget-heading">
                        {{ row.row.item.课程名称 }}<br/><br/>{{
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
                    @click="gotoHomeworkList(row.row.item)"
                >
                  管理作业
                </b-button>
                <b-button
                    block
                    type="button"
                    class="btn btn-light md-2"
                    @click="manageMember(row.row.item)"
                >
                  管理成员
                </b-button>
                <b-button
                    block
                    type="button"
                    class="btn btn-light md-2"
                    @click="releaseAssignment(row.row.item)"
                >
                  发布作业
                </b-button>
                <b-button
                    block
                    type="button"
                    class="btn btn-light md-2"
                    @click="addQuestion(row.row.item)"
                >
                  上传题目
                </b-button>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
      <template v-slot:footer>
        <div class="text-right">
          <b-button
              type="button"
              class="btn btn-warning"
              @click="createCourse()"
          >
            创建课程
          </b-button>
        </div>
      </template>
    </my-list>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

import {createCourse, getStuCourses, getTeaCourses, studentQuitCourse} from "@/api";
import myCourseModal from "@/components/myCourseModal";

export default {
  name: "course",
  components: {myCourseModal, MyList, PageTitle},
  data() {
    return {
      heading: "课程信息",
      subheading: "记得按时上课哦！",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      fields: ["课程名称", "ID"],
      showChart: false,
      breadcrumbItem: [
        {
          text: "课程信息",
          active: true,
        },
      ],
      courseListStu: [],
      courseListTea: [],
    };
  },
  methods: {
    init() {
      if (this.$store.state.global.accountType === 1) {
        getStuCourses(this.$store.state.global.id).then((res) => {
          if (res.code === 100) {
            this.courseListStu = res.data
          } else {
            this.$bvToast.toast("未检索到相关课程信息", {
              title: "提示",
              variant: "danger",
              solid: true,
              autoHideDelay: 2000
            });
          }
        })
      } else {
        getTeaCourses().then((res) => {
          if (res.code === 100) {
            this.courseListTea = res.data
          } else {
            this.$bvToast.toast("未检索到相关课程信息", {
              title: "提示",
              variant: "danger",
              solid: true,
              autoHideDelay: 2000
            });
          }
        })
      }
    },
    releaseAssignment(item) {

    },
    addQuestion(item) {

    },
    gotoHomeworkList(item) {
      this.$router.push({
        name: "homeworkList",
        params: {
          courseId: item.ID,
        },
      });
    },
    quitCourse(item) {
      studentQuitCourse(item.ID).then((res) => {
        if (res.code === 100) {
          this.$toast.success("退出成功");
          this.init()
        } else {
          this.$toast.open({
            message: res.msg,
            type: "is-danger",
          });
        }
      }).catch(error => {
        this.$toast.error(error.message);
      })
    },
    manageMember(item) {
      this.$router.push({
        name: "studentList",
        params: {
          courseId: item.ID,
        },
      });
    },
    createCourse() {
      this.$bvModal.show("createCourseModal");
    },
    handleCancelCreate() {
    },
    handleCreate(content) {
      createCourse({
        title: content.title,
        password: content.password,
        url: content.url
      }).then(res => {
        if (res.code === 100) {
          this.$toast.success("成功")
          this.init()
        } else {
          this.$toast.error(res.msg)
        }
      }).catch(error => {
        this.$toast.error(error.message);
      })
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
          name: this.courseListStu[i].name,
          ID: this.courseListStu[i].courseId,
          teacherId: this.courseListStu[i].teacherId,
          teacherName: this.courseListStu[i].teacherName,
          assignments: this.courseListStu[i].assignments,
          url: this.courseListStu[i].url,
          courseTime: this.courseListStu[i].courseTime,
          password: this.courseListStu[i].password
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
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped></style>
