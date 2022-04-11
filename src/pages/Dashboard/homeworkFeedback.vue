<template>
  <div>
    <div class="main-card mb-3 card" v-for="(questionInfo,index) in questionInfos">
      <my-feedback v-model:value="questionInfos[index]"/>
    </div>
  </div>
</template>

<script>
import MyFeedback from "@/components/myFeedback";
import {getFeedback} from "@/api";

export default {
  name: "homeworkFeedback",
  components: {MyFeedback},
  props: {
    studentId: Number,
    homeworkId: Number,
  },
  data() {
    return {
      questionInfos: [],
    }
  },
  mounted() {
    console.log(this.studentId, this.homeworkId);
    //获得题目信息
    getFeedback(this.studentId, this.homeworkId).then(res => {
      this.questionInfos = res.data;
    })
  }
}
</script>

<style scoped>

</style>