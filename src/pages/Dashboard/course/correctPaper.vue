<template>
  <div v-if="info">
    <b-container>
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
                      <h5>{{ info.questionInfo.value }}</h5>
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
          <div class="main-card mb-3 card"
               v-for="(questionInfo,index) in questionInfos"
               :key="questionInfo.numInPaper"
               v-if="index===onShowId"
          >
            <my-feedback v-model:value="questionInfos[index]" :editable="true"/>
          </div>
        </b-col>
        <b-col cols="4">
          <my-count-bar-new
              :items="indexItem"
          >
            <template v-slot:header>
              相关信息
            </template>
            <template v-slot:footer>
              <b-row>
                <b-form-spinbutton
                    type="number"
                    name="number"
                    id="exampleNumber"
                    placeholder="输入分数..."
                    :min="0"
                    :max="info.questionInfo.value"
                    v-model="info.studentList[onShowId].mark"
                    class="mb-3"
                />
              </b-row>
              <b-row class="justify-content-between">
                <b-col cols="4" offset="8">
                  <b-button pill variant="warning">提交</b-button>
                </b-col>
              </b-row>
            </template>
            <template v-slot:button="item">
              <b-button pill
                        :variant="calButtonVariant(item.item)"
                        @click="handleSelect(item.item)"
              >
                {{ item.item + 1 }}
              </b-button>
            </template>
          </my-count-bar-new>
        </b-col>
      </b-row>

    </b-container>

  </div>
  <div v-else>
    <content-loader
        viewBox="0 0 476 124"
        primaryColor="#f3f3f3"
        secondaryColor="#cccccc"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6"/>
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6"/>
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6"/>
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6"/>
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6"/>
      <circle cx="20" cy="20" r="20"/>
    </content-loader>
  </div>
</template>

<script>
import MyFeedback from "@/components/myFeedback";
import MyCountBar from "@/components/myCountBar";
import MyCountBarNew from "@/components/myCountBarNew";
import {Slide} from 'vue-burger-menu'
import {ContentLoader} from 'vue-content-loader'
import {getCorrectedQuestion} from "@/api";

export default {
  name: "correctPaper",
  components: {MyCountBarNew, MyCountBar, MyFeedback, Slide, ContentLoader},
  props: {
    homeworkId: Number,
    questionId: Number
  },
  data() {
    return {
      onShowId: 0,
      questionInfos: [],
      info: null
      /**
       * info: 信息
       * questionInfo: 题目信息
       * studentList: 学生信息
       *
       * questionInfo:
       * 公有:
       * - type: 题目类型
       * - questionId: 题目id
       * - description: 题目描述
       * - value: 题目满分
       *
       * 选择题 0
       * - options: 选项
       *   - optionId: 选项id
       *   - description: 选项描述
       * - standardAnswer: 正确答案，数组, 但是里面只有一个数
       *
       * 多选题 1
       * - options: 选项
       *   - optionId: 选项id
       *   - description: 选项描述
       * - standardAnswer: 正确答案, 数组，对应optionId
       *
       * 填空题 2
       * - studentAnswer: 学生答案，文本
       *
       * 大题 3
       * - pictureDescription: 列表，每一项是一个图片的url
       * - standardAnswer: 正确答案，文本
       * - standardPictureAnswers: 正确答案，图片
       *
       * studentList:
       * - studentId: 学生id
       * - answer: 学生答案，数组，对应optionId
       * - mark: 学生得分 null 为未批改
       * - textComment: 老师给的文本评价
       * - pictureComment: 老师给的图片评价（只能有一个，因为是对于学生作业的批改），但是存为list
       *
       * 大题 3
       * - studentPictureAnswers
       **/
    };
  },
  mounted() {
    console.log(this.homeworkId,this.questionId)
    getCorrectedQuestion({
      homeworkId: this.homeworkId,
      questionId: this.questionId
    }).then(res => {
      if (res.code === 100) {
        this.info = res.data;
        //维护questionInfo，用于展示作业
        for (let i = 0; i < this.info.studentList.length; i++) {
          let questionInfo = JSON.parse(JSON.stringify(this.info.questionInfo));
          if (this.info.questionInfo.type === 3) {
            //加入学生图片答案
            questionInfo.studentPictureAnswers = this.info.studentList[i].studentPictureAnswers || []
          }
          //加入这道题是第几个学生的
          questionInfo.numInPaper = i + 1;
          //加入学生答案
          questionInfo.studentAnswer = this.info.studentList[i].answer;
          //questionInfo里不许要学生得分
          //加入老师的文字评价
          questionInfo.textComment = this.info.studentList[i].textComment
          //加入老师的图片评价
          questionInfo.pictureComment = this.info.studentList[i].pictureComment
          this.questionInfos.push(questionInfo);
        }
      } else {
        this.$toast.error(res.msg);
      }
    }).catch(err => {
      this.$toast.error(err);
    })
  },
  watch: {
    questionInfos: {
      handler(newVal, oldVal) {
        newVal.forEach(element => {
          this.info.studentList[element.numInPaper - 1].answer = element.studentAnswer;
          this.info.studentList[element.numInPaper - 1].textComment = element.textComment;
          this.info.studentList[element.numInPaper - 1].pictureComment = element.pictureComment;
        })
      },
      deep: true
    }
  },
  methods: {
    calButtonVariant(item) {
      if (this.onShowId === item) {
        if (this.info.studentList[item].mark !== null) {
          return 'outline-success'
        } else {
          return 'outline-secondary'
        }
      } else {
        if (this.info.studentList[item].mark !== null) {
          return 'success'
        } else {
          return 'secondary'
        }
      }
    },
    handleSelect(item) {
      this.onShowId = item
    }
  },
  computed: {
    indexItem: function () {
      let res = []
      for (let i = 0; i < this.info.studentList.length; i++) {
        res.push(i)
      }
      return res;
    },
    onShowStudentScore: function () {
      return this.info.studentList[this.onShowId].mark === null ? "未批改" : this.info.studentList[this.onShowId].mark
    },
    typeName: function () {
      if (this.info.questionInfo.type === 0)
        return "单选"
      else if (this.info.questionInfo.type === 1) {
        return "多选"
      } else if (this.info.questionInfo.type === 2) {
        return "填空"
      } else {
        return "大题"
      }
    }
  }
  // computed: {
  //   questionInfos: {
  //     cache: false,
  //     get: function () {
  //       let res = []
  //       for (let i = 0; i < this.info.studentList.length; i++) {
  //         let questionInfo = JSON.parse(JSON.stringify(this.info.questionInfo));
  //         //加入这道题是第几个学生的
  //         questionInfo.numInPaper = i + 1;
  //         //加入学生答案
  //         questionInfo.studentAnswer = this.info.studentList[i].answer;
  //         //questionInfo里不许要学生得分
  //         //加入老师的文字评价
  //         questionInfo.textComment = this.info.studentList[i].textComment
  //         //加入老师的图片评价
  //         questionInfo.pictureComment = this.info.studentList[i].pictureComment
  //         res.push(questionInfo);
  //       }
  //       return res
  //     },
  //     set: function (value) {
  //       console.log(123123)
  //       console.log(value)
  //     },
  //   }
  // },
}
</script>

<style scoped>

</style>