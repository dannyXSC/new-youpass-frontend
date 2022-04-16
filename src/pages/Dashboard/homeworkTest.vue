<template>
  <div class="container">
    <div class="main-card mb-3 card" v-for="(questionInfo,index) in questionInfos">
      <my-question v-model:value="questionInfos[index]"/>
    </div>
  </div>


</template>

<script>
import MyQuestion from "@/components/myQuestion";
import {getQuestions} from "@/api";

export default {
  name: "homeworkTest",
  components: {MyQuestion},
  data() {
    return {
      //填空题
      questionInfos: [],
      // questionInfos: [
      //   {
      //     type: 0,
      //     questionId: 1,
      //     numInPaper: 1,
      //     description: "第一题xxxx 1_321",
      //     options: [
      //       {
      //         optionId: 1,
      //         description: "答案1",
      //       },
      //       {
      //         optionId: 2,
      //         description: "答案2",
      //       },
      //       {
      //         optionId: 3,
      //         description: "答案3",
      //       },
      //       {
      //         optionId: 4,
      //         description: "答案4",
      //       }
      //     ],
      //     studentAnswer: []
      //   },
      //   {
      //     type: 1,
      //     questionId: 2,
      //     numInPaper: 2,
      //     description: "第一题xxxx 1_321",
      //     options: [
      //       {
      //         optionId: 1,
      //         description: "答案1",
      //       },
      //       {
      //         optionId: 2,
      //         description: "答案2",
      //       },
      //       {
      //         optionId: 3,
      //         description: "答案3",
      //       },
      //       {
      //         optionId: 4,
      //         description: "答案4",
      //       }
      //     ],
      //     studentAnswer: []
      //   },
      //   {
      //     type: 2,
      //     questionId: 3,
      //     numInPaper: 3,
      //     description: "第一题xxxx 1_321",
      //     studentAnswer: ""
      //   },
      //   {
      //     type: 3,
      //     questionId: 4,
      //     numInPaper: 4,
      //     description: "第一题xxxx 1_321",
      //     pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
      //     studentAnswer: "",
      //     studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"]
      //   }
      // ]
    }
  },
  mounted() {
    getQuestions(1, 1).then(res => {
      this.questionInfos = res.data;
      console.log(res);
    })
  },
  watch: {
    questionInfos: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      deep: true
    },
    test: (newVal, oldVal) => {
      console.log(newVal, oldVal)
    }
  },
  methods: {
    handleClick() {
      console.log(this.questionInfo)
    }
  }
}
</script>

<style scoped>

</style>