<template>
  <div>
    <div class="row">
      <div class="col">
        <page-title :heading=heading
                    :subheading=subheading
                    :icon=icon
                    :breadcrumb-item="breadcrumbItem"
        >

        </page-title>
      </div>

    </div>
    <div>
      <b-card
          header="成绩饼状图"
          class="mb-3">
        <grade v-bind:students="students" v-if="students.length"></grade>
      </b-card>
      <b-card
          header="学生成绩表">
        <students v-bind:students="students" v-if="students.length">
          <template slot-scope="row">
            <b-card class="mb-3 nav-justified" no-body>
              <b-tabs pills card>
                <b-tab title="其他功能">
                  <div class="widget-content-right">
                    <b-button
                        block
                        type="button"
                        class="btn btn-light md-2"
                        @click="checkHomework(row.row.item)"
                    >
                      查看作业
                    </b-button>
                  </div>
                </b-tab>
              </b-tabs>
            </b-card>
          </template>
        </students>
      </b-card>

    </div>


  </div>
</template>
<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

import Grade from "@/pages/exams/Grade.vue"
import Students from "@/pages/exams/Students.vue"
import ExamTable from "@/pages/exams/ExamsTable.vue"
import {getAllStudents} from '@/api';

export default {
  name: 'CertainExam',
  components: {MyList, PageTitle, Grade, Students, ExamTable},
  props: {
    homeworkId: Number,
    // courseId: Number
  },
  mounted() {
    console.log(this.homeworkId);
    getAllStudents(this.homeworkId).then(res => {
      res.data.forEach(value => {
        value._showDetails = false;
        value.isActive = false;
        this.students.push(JSON.parse(JSON.stringify(value)))
      })
    })
  },
  data() {
    return {
      students: [],
      heading: "作业信息",
      subheading: "您可以在此处查看班级同学的成绩",
      icon: 'pe-7s-plane icon-gradient bg-tempting-azure',
      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
          // active: true,
        },
        {
          text: "作业列表",
          href: "#/dashboard/homeworkList"
          // active: true,
        },
        {
          text: "作业详情",
          active: true,
        },
      ],
    }
  },
  methods: {
    checkHomework(item) {
      if (!isNaN(item.studentId)) {
        this.$router.push({
          name: "homeworkFeedback",
          params: {
            studentId: item.studentId,
            homeworkId: this.homeworkId,
          },
        });
      }else{
        this.$toast.error("错误")
      }
    }
  }
}
</script>
