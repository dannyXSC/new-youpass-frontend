<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <div class="main-card mb-3 card">
            <b-card-header v-b-modal.modalBox class="border-1">
              <h3 class="card-title">题目信息</h3>
            </b-card-header>
            <b-card-body>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <h5>题目总分</h5>
                    </div>
                    <div class="widget-content-right">
                      <h5>{{ value }}</h5>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <h5>此学生的分数</h5>
                    </div>
                    <div class="widget-content-right">
                      <h5>{{ onShowStudentScore }}</h5>
                    </div>
                  </div>
                </div>
              </li>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                      <h5>题目类型</h5>
                    </div>
                    <div class="widget-content-right">
                      <h5>{{ typeName }}</h5>
                    </div>
                  </div>
                </div>
              </li>
            </b-card-body>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">题干信息</h5>
              <hr/>
              <katex-element
                  :expression="descriptionLatex"
                  :throw-on-error="false"
                  :strict="false"
              />
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">标准答案</h5>
              <hr/>
              <template v-if="type===0||type===1">
                <div class="card-shadow-success border card card-body mb-2"
                     :class="[optionStandardAnswer.includes(item.optionId)?'bg-success':'border-success']"
                     v-for="(item,index) in option"
                >
                  <katex-element
                      :expression="parseLatex(item.content)"
                      :throw-on-error="false"
                      :strict="false"
                  />
                </div>
              </template>
              <template v-else>
                <p>
                  {{ standardAnswer }}
                </p>
              </template>
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">学生答案</h5>
              <hr/>
              <template v-if="type===0||type===1">
                <div class="card-shadow-success border card card-body mb-2"
                     :class="[onShowStudentAnswer.includes(item.optionId)?'bg-success':'border-success']"
                     v-for="(item,index) in option"
                >
                  <katex-element
                      :expression="parseLatex(item.content)"
                      :throw-on-error="false"
                      :strict="false"
                  />
                </div>
              </template>
              <template v-else>
                <katex-element
                    :expression="parseLatex(onShowStudentAnswer)"
                    :throw-on-error="false"
                    :strict="false"
                />
              </template>
            </div>
          </div>

        </b-col>
        <b-col cols="4">
          <my-count-bar
              :currentPage_props="currentPage"
              :total_rows_props="studentList.length"
              :per_page_props="per_page"
              :items="studentList"
              @updatePage="updatePage"
              @onSelect="handleSelect"
          >
            <template v-slot:header>
              相关信息
            </template>
            <template v-slot:footer>
              <b-row v-if="studentList.find(el=>el.id===onShowId)">
                <b-form-spinbutton
                    type="number"
                    name="number"
                    id="exampleNumber"
                    placeholder="输入分数..."
                    :min="0"
                    :max="value"
                    v-model="studentList.find(el=>el.id===onShowId).score"
                />
              </b-row>
              <br/>
              <b-row class="justify-content-between">
                <b-col cols="8" md="auto">
                </b-col>
                <b-col cols="4" md="auto">
                  <b-button pill variant="warning" @click="handleSubmit">提交</b-button>
                </b-col>
              </b-row>
            </template>
            <template v-slot:button="item">
              <b-button pill
                        :variant="calButtonVariant(item.item)"
                        @click="handleSelect(item.item)"
              >
                {{ item.item.index + 1 }}
              </b-button>
            </template>
          </my-count-bar>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import myCountBar from "@/components/myCountBar";
import {getCorrectedQuestion} from "@/api";
import parse from "@/utils/parseLatex";

export default {
  name: "correctPaper",
  components: {myCountBar},
  props: {
    examId: Number,
    courseId: Number,
    questionId: Number,
  },
  data() {
    return {
      currentPage: 1,
      studentList: [],
      per_page: 9,
      onShowId: 0,
      description: "",
      type: null,
      value: 0,
      option: [],
      //放的是id
      optionStandardAnswer: [],
      standardAnswer: "",
    }
  },
  computed: {
    typeName() {
      if (this.type === 0)
        return "单选"
      else if (this.type === 1) {
        return "多选"
      } else if (this.type === 2) {
        return "填空"
      } else {
        return "大题"
      }
    },
    descriptionLatex() {
      return parse(this.description)
    },
    onShowStudentScore() {
      let score = 0
      this.studentList.forEach((value) => {
        if (value.id === this.onShowId) {
          score = value.score
        }
      })
      return score
    },
    onShowStudentAnswer() {
      let answer = ""
      this.studentList.forEach((value) => {
        if (value.id === this.onShowId) {
          answer = value.answer
        }
      })
      return answer
    }
  },
  methods: {
    parseLatex(content) {
      return parse(content)
    },
    updatePage(page) {
      this.currentPage = page
    },
    handleSelect(item) {
      this.onShowId = item.id
    },
    calButtonVariant(item) {
      if (this.onShowId === item.id) {
        return 'secondary'
      } else {
        if (item.score !== null) {
          return 'outline-success'
        } else {
          return 'outline-success'
        }
      }
    },
    handleSubmit() {
      let data = {
        questionId: this.questionId,
        courseId: this.courseId,
        examId: this.examId,
        scoreInfoList: []
      }
      this.studentList.forEach((value) => {
        if (value.score !== null) {
          data.scoreInfoList.push({studentId: value.id, score: value.score})
        }
      })
      console.log(data)
      this.$store.dispatch("global/manualCorrect", data);
    }
  },
  mounted() {
    getCorrectedQuestion({
      questionId: this.questionId,
      courseId: this.courseId,
      examId: this.examId
    }).then(res => {
      console.log(res)
      if (res.code === 100) {
        //题目信息
        this.description = res.data.questionInfo.description
        this.type = res.data.questionInfo.type
        this.value = res.data.studentList[0].value
        if (this.type === 0 || this.type === 1) {
          this.option = JSON.parse(JSON.stringify(res.data.questionInfo.optionInfoList))
          this.option = this.option.sort((a, b) => {
            return a.optionId - b.optionId
          })

          this.option.forEach((value, index) => {
            this.option[index].index = index
          })

          this.option.forEach((value, index) => {
            if (res.data.questionInfo.standardAnswer && res.data.questionInfo.standardAnswer.slice(index, index + 1) === "1") {
              this.optionStandardAnswer.push(value.optionId)
            }
          })

        } else {
          this.standardAnswer = res.data.questionInfo.standardAnswer
        }

        //学生信息
        res.data.studentList.forEach((value, index) => {
          if (this.type === 0 || this.type === 1) {
            let answer = []
            this.option.forEach((optionValue, optionIndex) => {
              if (value.studentAnswer && value.studentAnswer.slice(optionIndex, optionIndex + 1) === "1") {
                answer.push(optionValue.optionId)
              }
            })
            this.studentList.push({index: index, id: value.studentId, answer: answer, score: 0})
          } else {
            this.studentList.push({index: index, id: value.studentId, answer: value.studentAnswer, score: null})
          }
        })

        //onshow
        this.onShowId = this.studentList[0].id
      } else {
        alert(res.msg)
      }
    }).catch(error => {
      alert(error)
    })
  },
}
</script>

<style scoped>

</style>