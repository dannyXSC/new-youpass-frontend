<template>
  <b-modal
      :id="id"
      size="xl"
      title="编辑"
      style="height: 80%"
      @hide="handleExit"
      ok-title="确认"
      cancel-title="取消"

  >
    <vue-good-table
        ref="my-table"
        @on-selected-rows-change="selectionChanged"
        :columns="columns"
        :rows="questionList"
        :pagination-options="{
          enabled: true,
          mode: 'pages'
        }"
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
          // type: 'date',
          // dateInputFormat: 'yyyy-MM-dd',
          // dateOutputFormat: 'yyyy-MM-dd',
        },
      ],
      questionList: this.allQuestionInfo,
      selectedQuestionList: JSON.parse(JSON.stringify(this.initQuestionList))
    }
  },
  mounted() {
    console.log("list",this.questionList)
    this.questionList.forEach((value, index) => {
      value.createdAt=new Date(value.createdAt).format("yyyy-MM-dd hh:mm:ss")
      console.log(value.createdAt)
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
  watch: {
    initQuestionList: {
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