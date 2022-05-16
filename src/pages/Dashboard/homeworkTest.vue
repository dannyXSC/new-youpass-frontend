<template>
  <div v-if="questionInfos.length">
    <page-title
        :heading="this.title"
        :subheading="this.starttime"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <b-container>
      <b-row>
        <b-col cols="8">
          <div
              class="main-card card"
              v-for="(questionInfo, index) in questionInfos"
          >
            <div v-show="onShowIndex=== index">
              <my-question v-model:value="questionInfos[index]"/>
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <my-count-bar-new
              :items="items"
          >
            <template v-slot:header>
              相关信息
            </template>

            <template v-slot:footer>
              <b-row class="justify-content-end">
                <b-button variant="danger" size="sl" @click="submitHomework"
                >提交作业
                </b-button>
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
import MyQuestion from "@/components/myQuestion";
import {getQuestions, submitHomework} from "@/api";
import PageTitle from "@/layout/Components/PageTitle.vue";
import TestNavbar from "@/layout/Components/PageTitle3.vue";
import MyCountBar from "@/components/myCountBar";
import MyEditModal from "@/components/myEditModal.vue";
import BootstrapToggle from "vue-bootstrap-toggle";
import {ContentLoader} from "vue-content-loader";
import parse from "@/utils/parseLatex";
import MyCountBarNew from "@/components/myCountBarNew";

export default {
  name: "homeworkTest",
  components: {
    MyCountBarNew,
    MyQuestion,
    PageTitle,
    TestNavbar,
    MyCountBar,
    MyEditModal,
    BootstrapToggle,
    ContentLoader,
  },
  props: ["homeworkId","courseId","title","starttime"],
  data() {
    return {
      per_page: 9,
      checked: true,
      testTitle1:
          "在生产管理信息系统中，下列操抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客作步骤能正确将工单推进流程的是（）",
      testTitle2:
          "在营销系统中查询客户有无欠费、余额及抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客户时应做到哪些最基本的礼仪？",
      testTitle3: "以下属于南方电网员工职业操守中明文规定的有（）",
      heading: "数学作业",
      subheading: "2022/05/08",
      icon: "pe-7s-drawer icon-gradient bg-tempting-azure",
      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "作业管理",
          href: "#/dashboard/homeworkList/"+this.courseId,
        },
        {
          text: this.title,
          active: true,
        },
      ],
      currentPage: 1,
      expanded: false,
      barStyle: {
        backgroundColor: "#69aa8a",
      },
      edit: true,
      editOwner: null,
      editIntiContent: "",
      //填空题
      questionInfos: [],
      onShowIndex: 0,
    };
  },
  mounted() {

    getQuestions(this.homeworkId)
        .then((res) => {
          console.log(res)
          if (res.code === 100) {
            res.data.sort((a, b) => {
              return a.numInPaper - b.numInPaper;
            });
            this.questionInfos = res.data;
            console.log(this.questionInfos)
          } else {
            this.$toast.error(res.msg);
          }
        })
        .catch((err) => {
          this.$toast.error(err);
        });
  },
  watch: {
    questionInfos: {
      handler(newVal, oldVal) {
        this.uploadQuestions();
      },
      deep: true,
    },
  },
  methods: {
    uploadQuestions() {
      submitHomework(
          this.$store.state.global.id,
          this.homeworkId,
          this.questionInfos
      )
          .then((res) => {
            if (res.code === 100) {
            } else {
              this.$toast.error(res.msg);
            }
          })
          .catch((err) => {
            this.$toast.error(err);
          });
    },
    sleep(delay) {
      let start = (new Date()).getTime();
      while ((new Date()).getTime() - start < delay) {
      }
    },
    submitHomework() {
      this.$toast.success("提交成功");
      this.sleep(1000)
      this.$router.push({name:"personInfo"})
    },
    judgeIsComplete(index) {

      if ((this.questionInfos[index].type === 0 || this.questionInfos[index].type === 1)
          && Array.isArray(this.questionInfos[index].studentAnswer)
          && this.questionInfos[index].studentAnswer.length > 0) {
        return true;
      } else if (this.questionInfos[index].type === 2 && this.questionInfos[index].studentAnswer.length > 0) {
        return true
      } else if (this.questionInfos[index].type === 3
          && (this.questionInfos[index].studentAnswer.length > 0 || this.questionInfos[index].studentPictureAnswers.length > 0)) {
        return true
      }
    },
    calButtonVariant(index) {
      console.log("123123" + index)
      if (this.onShowIndex === index) {
        if (this.judgeIsComplete(index)) {
          return 'outline-success'
        } else {
          return 'outline-secondary'
        }
      } else {
        if (this.judgeIsComplete(index)) {
          return 'success'
        } else {
          return 'secondary'
        }
      }
    },
    handleSelect(index) {
      this.onShowIndex = index;
    }
  },
  computed: {
    items: function () {
      return this.questionInfos.map((value, index) => {
        return index
      })
    }
  }
};
</script>

<style scoped></style>

<!--
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
      // ]-->
