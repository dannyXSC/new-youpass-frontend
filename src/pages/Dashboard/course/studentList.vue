<template>
  <div>
    <my-list
        title="学生管理"
        :items="items"
        :fields="fields"
    >
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="其他功能">
              <div class="widget-content-right">
                <button block
                        type="button"
                        class="btn btn-info md-2 mr-2"
                        @click="checkHomework(row.row.item.id)"
                > 查看作业
                </button>
                <button block
                        type="button"
                        class="btn btn-danger md-2"
                        @click="kickStudent(row.row.item.id)"
                > 踢除学生
                </button>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import {getStudentListByCourseId, kickStudentByIdAndCourseId} from "@/api";
import myList from "@/components/myList";
export default {
  name: "studentList",
  components: {myList},
  props: {courseId: Number},
  data() {
    return {
      studentList: [],
      fields: [
        {key: 'name', label: "姓名"},
        {key: 'id', label: "ID"}
      ]
    }
  },
  mounted() {
    getStudentListByCourseId(this.courseId).then(res => {
      if (res.code === 100) {
        this.studentList = res.data;
        console.log(this.studentList, this.fields)
      } else {
        this.$bvToast.toast("获取学生列表失败", {
          title: "提示",
          variant: "danger",
          solid: true,
          autoHideDelay: 2000
        });
      }
    })
  },
  methods: {
    kickStudent(id) {
      console.log(id)
      let name = this.studentList.find(element => element.id === id).name
      this.$bvModal.msgBoxConfirm(`您确定要踢出 ${id}-${name}`, {
        okTitle: "确定",
        cancelTitle: "取消",
        title: "请确认",
      }).then(value => {
        //点击了确认
        if (value === true) {
          kickStudentByIdAndCourseId(id, this.courseId).then(res => {
            if (res.code === 100) {
              this.$bvToast.toast("踢出成功", {
                title: "提示",
                variant: "success",
                solid: true,
                autoHideDelay: 2000
              });
              this.studentList = this.studentList.filter(item => item.id !== id);
            } else {
              this.$bvToast.toast("踢出失败", {
                title: "提示",
                variant: "danger",
                solid: true,
                autoHideDelay: 2000
              });
            }
          })
        }
      })

    },
    checkHomework(id) {
      this.$router.push({
        name: "homeworkListOfStudentOfCourse",
        params: {
          courseId: this.courseId,
          studentId: id
        },
      });
    }
  },
  computed: {
    items() {
      let return_item = [];
      for (let i = 0; i < this.studentList.length; ++i) {
        return_item.push({
          _showDetails: false,
          isActive: true,
          name: this.studentList[i].name,
          id: this.studentList[i].id,
        });
      }
      return return_item;
    }
  }
}
</script>

<style scoped>

</style>