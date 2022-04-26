<template>
  <b-modal
      :id="id"
      size="xl"
      title="Edit"
      style="height: 80%"
      @hide="handleExit"
  >
    <vue-good-table
        ref="my-table"
        @on-selected-rows-change="selectionChanged"
        :columns="columns"
        :rows="questionList"
        :select-options="{
            selectOnCheckboxOnly: true,
            enabled: true,
        }"
        :search-options="{ enabled: true }">
    </vue-good-table>
  </b-modal>
</template>

<script>
export default {
  name: "mySelectQuestionModal",
  props: {
    id: {
      type: String,
      default: "edit-modal"
    },
    initQuestionList: {
      type: Array,
      default: []
    },
    allQuestionInfo: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      columns: [
        {
          label: '题号',
          field: 'id',
        },
        {
          label: '题目类型',
          field: 'type',
        },
        {
          label: '题目简介',
          field: 'description',
        },
        {
          label: '创建时间',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'yyyy-MM-dd',
        },
      ],
      questionList: this.allQuestionInfo,
      selectedQuestionList: JSON.parse(JSON.stringify(this.initQuestionList))
    }
  },
  mounted() {
    this.questionList.forEach((value, index) => {
      if (this.selectedQuestionId.includes(value.id))
        this.$set(this.questionList[index], 'vgtSelected', true);
    })
  },
  methods: {
    selectionChanged(item) {
      this.selectedQuestionList = JSON.parse(JSON.stringify(this.$refs['my-table'].selectedRows))
    },
    handleExit(trigger) {
      if (trigger.trigger === "ok") {
        this.$emit("onSubmit", this.selectedQuestionList)
      } else {
        this.$emit("onCancel")
      }
    },
  },
  computed: {
    selectedQuestionId() {
      return this.selectedQuestionList.map(value => value.id)
    }
  },
  watch:{
    initQuestionList:{
      handler(newVal, oldVal) {
        this.selectedQuestionList = JSON.parse(JSON.stringify(newVal))
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>