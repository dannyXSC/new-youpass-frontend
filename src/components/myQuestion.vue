<template>
  <div>
    <div class="card-body">
      <div class="per-question">
        <div class="left-question">
          <div>
            <i>1</i>
          </div>
          <div class="option-tag-position">
            <div class="mb-2 mr-2 badge badge-primary">
              2
            </div>
          </div>
        </div>

        <!--        <div class="right-question">-->
        <!--          <div class="question-title">-->
        <!--            <h5 class="card-title">-->
        <!--              <katex-element-->
        <!--                  :expression="parseLatex(question.description)"-->
        <!--                  :throw-on-error="false"-->
        <!--                  :strict="false"-->
        <!--              />-->
        <!--            </h5>-->
        <!--          </div>-->
        <!--          <hr />-->
        <!--          <div v-if="question.type < 2" class="choice">-->
        <!--            <div-->
        <!--                v-for="(option, index) in question.options"-->
        <!--                :key="index"-->
        <!--                class="per-choice"-->
        <!--            >-->
        <!--              <div class="option-tag">-->
        <!--                <h5>{{ transform(index) }}</h5>-->
        <!--              </div>-->
        <!--              <div v-if="question.type === 0" class="option-button">-->
        <!--                <b-button-->
        <!--                    block-->
        <!--                    class="btn-md mr-2 mb-2 text-left"-->
        <!--                    :variant="calChoiceVariant(question, index)"-->
        <!--                    @click="-->
        <!--                            pickSingle(-->
        <!--                              question.numInPaper,-->
        <!--                              question.questionId,-->
        <!--                              index-->
        <!--                            )-->
        <!--                          "-->
        <!--                >-->
        <!--                  <katex-element-->
        <!--                      :expression="parseLatex(option.content)"-->
        <!--                      :throw-on-error="false"-->
        <!--                      :strict="false"-->
        <!--                  />-->
        <!--                </b-button>-->
        <!--              </div>-->
        <!--              <div v-if="question.type === 1" class="option-button">-->
        <!--                <b-button-->
        <!--                    block-->
        <!--                    class="btn-md mr-2 mb-2 text-left"-->
        <!--                    :variant="calChoiceVariant(question, index)"-->
        <!--                    @click="-->
        <!--                            pickMulti(-->
        <!--                              question.numInPaper,-->
        <!--                              question.questionId,-->
        <!--                              index-->
        <!--                            )-->
        <!--                          "-->
        <!--                >-->
        <!--                  <katex-element-->
        <!--                      :expression="parseLatex(option.content)"-->
        <!--                      :throw-on-error="false"-->
        <!--                      :strict="false"-->
        <!--                  />-->
        <!--                </b-button>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--          <div v-if="question.type > 1" class="fillin">-->
        <!--            <div class="input-group">-->
        <!--              <b-button-->
        <!--                  block-->
        <!--                  class="mr-2 mb-3"-->
        <!--                  pill-->
        <!--                  variant="outline-primary"-->
        <!--                  size="sm"-->
        <!--                  @click="handleEdit(question.numInPaper)"-->
        <!--              >编辑-->
        <!--              </b-button>-->
        <!--              <div-->
        <!--                  class="card-shadow-danger border card card-body border-danger"-->
        <!--              >-->
        <!--                <katex-element-->
        <!--                    :expression="-->
        <!--                            parseLatex(ansList[question.numInPaper - 1])-->
        <!--                          "-->
        <!--                    :throw-on-error="false"-->
        <!--                    :strict="false"-->
        <!--                />-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myQuestion",
  props: ["value"],
  data() {
    return {
      questionInfo: this.value
      /*
      *
      * 公共
      * - type: 0 1 2 3 4 分别表示单选、多选、填空、大题、图片题
      * - questionId: 题目id(数据库中id)
      * - numInPaper: 在试卷中的序号
      * -
      *
      * 选择题
      * - description: 题目描述
      * -
      *
      * */
    }
  },
  mounted() {
    console.log("questionInfo", this.value)
  },
  methods: {
    handleInput(e) {
      this.questionInfo.a++;
      this.$emit('input', this.questionInfo)
    }
  }
}
</script>

<style scoped>
.per-question {
  float: left;
  width: 1000px;
}

.per-question .left-question {
  float: left;
  width: 60px;
}

.per-question .right-question {
  float: left;
  width: 600px;
}

.question-center {
  width: 400px;
  margin: 0 auto;
}

.question-title {
  margin-top: 10px;
}

.choice {
  margin-top: 10px;
  margin-right: 90px;
  margin-left: 3px;
}

.fillin {
  margin-top: 30px;
  margin-right: 50px;
  margin-left: 3px;
  margin-bottom: 10px;
}

.choice .per-choice {
  float: left;
  width: 1000px;
  vertical-align: middle;
}

.choice .per-choice .option-tag {
  float: left;
  width: 40px;
  margin-top: 3px;
}

.choice .per-choice .option-button {
  float: left;
  width: 500px;
}

.per-question .left-question i {
  width: 40px;
  height: 40px;
  line-height: 36px;
  text-align: center;
  display: block;
  float: left;
  background: #c3d8d2;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  margin-top: 8px;
  font-size: 25px;
  font-weight: 700;
}

h5 {
  font-weight: 1000;
}

.test-head {
  position: fixed;
  width: 100%;
  height: 90px;
  background: #eee;
}

.per-question .left-question .option-tag-position {
  margin-top: 55px;
  margin-left: 3px;
}
</style>