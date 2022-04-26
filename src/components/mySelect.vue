<template>
  <b-modal
      id="select-modal"
      size="xl"
      title="Select"
      style="height: 80%"
      @hide="handleExit"
  >
    <b-button v-for="option in optionList"
              :key="option.id"
              block
              class="mr-2 mb-1 text-left"
              :variant="calVariant(option)"
              size="sm"
              @click="handleSelect(option.id)"
    >
      <katex-element
          :expression="parseLatex(option.description)"
          :throw-on-error="false"
          :strict="false"
      />
    </b-button>
  </b-modal>
</template>

<script>
import parse from "@/utils/parseLatex";

export default {
  name: "mySelect",
  props: {
    initOptionList: {
      type: Array,
    },
    initAnswerList:{
      default: () => [],
      type: Array,
    },
    onShowAnswer: Number,
  },
  data() {
    return {
      optionList: JSON.parse(JSON.stringify(this.initOptionList)),
      answerList: JSON.parse(JSON.stringify(this.initAnswerList))
    }
  },
  methods: {
    handleExit(trigger) {
      if (trigger.trigger === "ok") {
        this.$emit("onSubmit", this.answerList)
      } else {
        this.$emit("onCancel")
      }
    },
    parseLatex(content) {
      return parse(content)
    },
    handleSelect(id) {
      if (this.onShowAnswer === 1) {
        //单选
        this.answerList = [id]
      } else {
        if(this.answerList.includes(id)) {
          this.answerList.splice(this.answerList.indexOf(id), 1)
        } else {
          this.answerList.push(id)
        }
      }

    },
    calVariant(option) {
      if (this.answerList.includes(option.id)) {
        return 'primary'
      } else {
        return 'outline-primary'
      }
    }
  },
}
</script>

<style scoped>

</style>