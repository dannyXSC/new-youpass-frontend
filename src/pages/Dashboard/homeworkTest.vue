<template>
<div>
    <my-edit-modal
      v-if="editOwner"
      :init-content="editIntiContent"
      @onSubmit="handleSubmit"
      @onCancel="handleCancel"
    />

    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>
  <div class="container">
    <div class="main-card mb-3 card" v-for="(questionInfo,index) in questionInfos">
      <my-question v-model:value="questionInfos[index]"/>
    </div>
  </div>
  <div class="card-shadow-danger border card card-body">
        <b-button variant="success" size="sl" @click="submitHomework"
        >提交作业
        </b-button>
  </div>
</div>


</template>

<script>
import MyQuestion from "@/components/myQuestion";
import {getQuestions} from "@/api";
import PageTitle from "@/layout/Components/PageTitle.vue";
import TestNavbar from "@/layout/Components/PageTitle3.vue";
import MyCountBar from "@/components/myCountBar";
import MyEditModal from "@/components/myEditModal.vue";
import BootstrapToggle from 'vue-bootstrap-toggle'
import parse from "@/utils/parseLatex";

export default {
  name: "homeworkTest",
  components: {MyQuestion,PageTitle,
    TestNavbar,
    MyCountBar,
    MyEditModal,
    BootstrapToggle},
  props: {
    studentId: Number,
    homeworkId: Number,
  },
  data() {
    return {
        per_page: 9,
    checked: true,
    testTitle1:
      "在生产管理信息系统中，下列操抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客作步骤能正确将工单推进流程的是（）",
    testTitle2:
      "在营销系统中查询客户有无欠费、余额及抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客户时应做到哪些最基本的礼仪？",
    testTitle3: "以下属于南方电网员工职业操守中明文规定的有（）",
    heading: "数学第一次月考",
    subheading: "2022/05/08",
    icon: "pe-7s-drawer icon-gradient bg-tempting-azure",
    breadcrumbItem: [
      {
        text: "数学第一次月考",
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
      // ]
    }
  },
  mounted() {
    getQuestions(1, 1).then(res => {
      this.questionInfos = res.data;
      console.log(res);
    })
  },
  watch: {
    questionInfos: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal)
      },
      deep: true
    },
    test: (newVal, oldVal) => {
      console.log(newVal, oldVal)
    }
  },
  methods: {
    submitHomework(){
        console.log(this.questionInfos)
        alert("作业已提交！");
      this.$store.state.global.isTesting = false;
      window.location.href = "/#/dashboard/homeworkListOfStudent";
    },
    handleClick() {
      console.log(this.questionInfos)
    }
  }
}
</script>

<style scoped>

</style>