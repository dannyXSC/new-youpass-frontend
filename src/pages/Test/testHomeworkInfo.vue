<template>
  <div class="main-card mb-3 card">
    <my-question v-model:value="questionInfo"/>
  </div>

</template>

<script>
import MyQuestion from "@/components/myQuestion";

export default {
  name: "testHomeworkInfo",
  components: {MyQuestion},
  data() {
    return {
      //填空题
      questionInfo: {
        a: 123
      }
    }
  },
  watch: {
    questionInfo: {
      handler(newVal, oldVal) {
        console.log(newVal.a, " ", oldVal.a)
      },
      deep:true
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