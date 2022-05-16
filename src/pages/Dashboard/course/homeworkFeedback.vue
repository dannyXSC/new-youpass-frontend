<template>
  <div>
    <page-title
        :heading="this.title"
        :subheading="subheading"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <b-container>
      <div class="main-card mb-3 card" v-for="(questionInfo,index) in questionInfos">
        <my-feedback v-model:value="questionInfos[index]"/>
      </div>
    </b-container>

  </div>
</template>

<script>
import MyFeedback from "@/components/myFeedback";
import {getFeedback} from "@/api";
import PageTitle from "@/layout/Components/PageTitle.vue";

export default {
  name: "homeworkFeedback",
  components: {MyFeedback,PageTitle},
  props: ["homeworkId","studentId","title","starttime"],
  data() {
    return {
      heading: "管理成员",
      subheading:
          "在这里查看作业批改详情",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "作业管理",
          href: "#/dashboard/homeworkListOfStudent",
        },
        {
          text: this.title,
          active: true,
        },
      ],
      questionInfos: [],
    }
  },
  mounted() {
    //获得题目信息
    getFeedback(this.studentId, this.homeworkId).then(res => {
      this.questionInfos = res.data;
    })
  }
}
</script>

<style scoped>

</style>