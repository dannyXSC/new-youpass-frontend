<template>
  <div v-if="questionInfos!==null">
    <page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <div>
      <b-container fluid>
        <b-row>
          <b-col cols="8">
            <div class="main-card mb-3 card"
                 v-for="(questionInfo,index) in questionInfos"
                 :key="questionInfo.id"
                 v-if="questionInfo.id === onShowId">
              <my-add-question v-model:value="questionInfos[index]"/>
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
                <b-row class="justify-content-between">
                  <b-col cols="8" md="auto">
                    <div>
                      <b-button pill variant="outline-primary" @click="addQuestion">添加</b-button>
                      <b-button pill variant="outline-danger" style="margin-left: 5px" @click="subtractionQuestion">删除
                      </b-button>
                    </div>
                  </b-col>
                  <b-col cols="4" md="auto">
                    <b-button pill variant="warning" @click="submitQuestionList">提交</b-button>
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
  </div>
</template>

<script>
import MyAddQuestion from "@/pages/Dashboard/addQuestion/questions/myAddQuestion";
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyCountBarNew from "@/components/myCountBarNew";
import {addQuestions} from "@/api";

export default {
  name: "testAddQuestion",
  components: {MyCountBarNew, MyAddQuestion, PageTitle,},
  data() {
    return {
      heading: '上传题目',
      subheading: '您可以在此页面上传题目',
      icon: 'pe-7s-plane icon-gradient bg-tempting-azure',
      breadcrumbItem: [
        {
          text: 'Admin',
          href: '#'
        },
        {
          text: 'Manage',
          href: '#'
        },
        {
          text: 'Test1',
          href: '#'
        },
        {
          text: 'Test2',
          active: true
        }
      ],


      onShowId: 0,
      questionInfos: []
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
    };
  },
  mounted() {
    this.addQuestion()
  },
  methods: {
    addQuestion() {
      this.questionInfos.push({
        id: this.questionInfos.length,
        type: null,
        description: null,
        option: null,
        standardAnswer: null,
        imageDescription: [],
        imageStandardAnswer: [],
      })
    },
    subtractionQuestion() {
      if (this.questionInfos.length > 1) {
        this.questionInfos = this.questionInfos.filter((value) => {
          return value.id !== this.onShowId
        })
        this.questionInfos = this.questionInfos.map((value) => {
          if (value.id >= this.onShowId) {
            value.id--
            return value
          } else {
            return value
          }
        })
        if (this.onShowId >= 1) {
          this.onShowId--
        } else {
          this.onShowId = 0
        }
      }
    },
    judgeQuestionIsComplete(id) {
      if (id >= this.questionInfos.length) {
        return false
      }
      if (this.questionInfos[id].type === 3
          && (this.questionInfos[id].description !== "" || this.questionInfos[id].imageDescription.length > 0)
          && (this.questionInfos[id].standardAnswer !== "" || this.questionInfos[id].imageStandardAnswer.length > 0)
      ) {
        return true
      } else if (this.questionInfos[id].type === 0
          && this.questionInfos[id].description !== ""
          && this.questionInfos[id].option !== null
          && this.questionInfos[id].standardAnswer !== null
          && this.questionInfos[id].option.length > 0
          && this.questionInfos[id].standardAnswer.length > 0
      ) {
        return true
      } else if (this.questionInfos[id].type === 1
          && this.questionInfos[id].description !== ""
          && this.questionInfos[id].option !== null
          && this.questionInfos[id].standardAnswer !== null
          && this.questionInfos[id].option.length > 0
          && this.questionInfos[id].standardAnswer.length > 0
      ) {
        return true
      } else if (this.questionInfos[id].type === 2
          && this.questionInfos[id].description !== ""
          && this.questionInfos[id].standardAnswer !== ""
      ) {
        return true
      } else {
        return false
      }
    },
    submitQuestionList() {
      let cnt = 0;
      this.questionInfos.forEach((value) => {
        if (this.judgeQuestionIsComplete(value.id) === false) {
          cnt++
        }
      })
      if (cnt > 0) {
        this.$toast.error("你必须完成所有题目的填写！")
        return
      }
      addQuestions(this.questionInfos).then(res => {
        if (res.code === 100) {
          this.$toast.success("添加成功！")
          this.$router.push({name: "Dashboard"})
        } else {
          this.$toast.error(res.msg)
        }
      })
    },
    calButtonVariant(item) {
      if (this.onShowId === item) {
        if (this.judgeQuestionIsComplete(item)) {
          return 'outline-success'
        } else {
          return 'outline-secondary'
        }
      } else {
        if (this.judgeQuestionIsComplete(item)) {
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
      for (let i = 0; i < this.questionInfos.length; i++) {
        res.push(this.questionInfos[i].id)
      }
      return res
    }
  }
}
</script>

<style scoped>

</style>