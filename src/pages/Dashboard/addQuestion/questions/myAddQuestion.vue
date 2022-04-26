<template>
  <div>
    <div class="card-body">
      <b-form>
        <b-form-group
            label-cols-lg="3"
            :label="'编辑题目'+(questionInfo.id+1)+'信息'"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
        >

          <b-form-group
              label="题目种类:"
              label-cols-sm="3"
              label-align-sm="right"
          >
            <b-form-select v-model="questionInfo.type" :options="typeOptions"
                           @change="handleChangeType"></b-form-select>
          </b-form-group>

          <template v-if="questionInfo.type !=null">

            <b-form-group
                label="学科:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-input placeholder="输入学科"></b-form-input>
            </b-form-group>

            <b-form-group
                label="是否私有:"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-select :options="isPrivateOptions"></b-form-select>
            </b-form-group>

            <template v-if="questionInfo.type===0||questionInfo.type===1">
              <choice v-model="questionInfo" @input="handleInput"/>
            </template>
            <template v-else-if="questionInfo.type===2">
              <filling v-model="questionInfo" @input="handleInput"/>
            </template>
            <template v-else>
              <big-question v-model="questionInfo" @input="handleInput"/>
            </template>

          </template>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import parseLatex from "@/utils/parseLatex";
import Choice from "@/pages/Dashboard/addQuestion/questions/Choice";
import Filling from "@/pages/Dashboard/addQuestion/questions/Filling";
import BigQuestion from "@/pages/Dashboard/addQuestion/questions/BigQuestion";

export default {
  name: "myAddQuestion",
  components: {Choice, Filling, BigQuestion},
  props: {
    value: Object,
  },
  data() {
    return {
      isMounted: false,
      typeOptions: [
        {value: null, text: 'Please select an option'},
        {value: 0, text: '单择题'},
        {value: 1, text: '多选题'},
        {value: 2, text: '填空题'},
        {value: 3, text: '大题'}
      ],
      isPrivateOptions: [
        {value: null, text: 'Please select an option'},
        {value: 1, text: '私有'},
        {value: 0, text: '公有'},
      ],
      questionInfo: this.value,
      /**
       * 公共：
       * id: this.questionList.length 可能不用。
       * type: 0 1 2 3 分别表示单选 多选 填空 大题
       * description: "",
       *
       * 单选/多选：
       * option: 数组,
       *  - id：选项的id
       *  - description: 选项的描述
       * standardAnswer: 选项的答案，数组（单选多选都是数组）
       *
       * 填空题：
       * standardAnswer: 填空题的答案，string
       *
       * 大题：
       * imageDescription: []
       *  - id: 后端对这个图片的标识
       * standardAnswer: 大题的答案，stirng
       * imageStandardAnswer: [],
       */
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', this.questionInfo)
    },
    handleChangeType() {
      //初始化信息
      if (this.questionInfo.type === 0 || this.questionInfo.type === 1) {
        //单选/多选
        this.questionInfo.description = ""
        this.questionInfo.standardAnswer = []
        this.questionInfo.option = []
        this.questionInfo.imageDescription = []
        this.questionInfo.imageStandardAnswer = []
      } else if (this.questionInfo.type === 2) {
        //填空
        this.questionInfo.description = ""
        this.questionInfo.standardAnswer = ""
        this.questionInfo.option = null
        this.questionInfo.imageDescription = []
        this.questionInfo.imageStandardAnswer = []
      } else {
        //大题
        this.questionInfo.description = ""
        this.questionInfo.standardAnswer = ""
        this.questionInfo.option = null
        this.questionInfo.imageDescription = []
        this.questionInfo.imageStandardAnswer = []
      }

      this.handleInput()
    },
  }
}
</script>

<style scoped>

</style>