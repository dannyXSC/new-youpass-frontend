<template>
  <div v-if="questionInfos.length">
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <div class="container">
      <div
        class="main-card mb-3 card"
        v-for="(questionInfo, index) in questionInfos"
      >
        <my-question v-model:value="questionInfos[index]" />
      </div>
      <div class="card-shadow-danger border card card-body mb-5">
        <b-button variant="success" size="sl" @click="submitHomework"
          >提交作业
        </b-button>
      </div>
    </div>
  </div>
  <div v-else>
    <content-loader
      viewBox="0 0 476 124"
      primaryColor="#f3f3f3"
      secondaryColor="#cccccc"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </content-loader>
  </div>
</template>

<script>
import MyQuestion from "@/components/myQuestion";
import { getQuestions, submitHomework } from "@/api";
import PageTitle from "@/layout/Components/PageTitle.vue";
import TestNavbar from "@/layout/Components/PageTitle3.vue";
import MyCountBar from "@/components/myCountBar";
import MyEditModal from "@/components/myEditModal.vue";
import BootstrapToggle from "vue-bootstrap-toggle";
import { ContentLoader } from "vue-content-loader";
import parse from "@/utils/parseLatex";

export default {
  name: "homeworkTest",
  components: {
    MyQuestion,
    PageTitle,
    TestNavbar,
    MyCountBar,
    MyEditModal,
    BootstrapToggle,
    ContentLoader,
  },
  props: ["homeworkId"],
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
          text: "",
          href: "#",
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
    };
  },
  mounted() {
    getQuestions(this.homeworkId)
      .then((res) => {
        if (res.code === 100) {
          res.data.sort((a, b) => {
            return a.numInPaper - b.numInPaper;
          });
          this.questionInfos = res.data;
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
    submitHomework() {},
  },
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
