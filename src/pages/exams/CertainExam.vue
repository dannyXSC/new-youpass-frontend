<template>
  <div>
    <div class="row">
      <div class="col">
        <page-title :heading=heading
                    :subheading=subheading
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
        <students v-bind:students="students" v-if="students.length"></students>
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
import { getAllStudents } from '@/api';

export default {
  name: 'CertainExam',
  components: {MyList, PageTitle, Grade, Students, ExamTable},
  props: {
    examId: Number,
    courseId: Number
  },
  created() {
    this.exam = this.$store.state.global.currentExam
    console.log(this.exam)
    this.heading = this.exam.title
    getAllStudents(this.courseId, this.examId).then(res => {
      console.log("I'm in!")
      console.log(res.data)
      this.students = res.data
    })
  },
  data() {
    return {
      exam: "",
      students: "",

      heading: "",
      subheading: "您可以在此处查看班级同学的成绩",
      icon: 'pe-7s-plane icon-gradient bg-tempting-azure',

    }
  }
}
</script>
