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

    <b-container>
      <b-row>
        <b-col cols="8">
          <div
            v-for="question in questionList"
            :key="question.questionId"
            class="main-card mb-3 card"
          >
            <div class="card-body">
              <div class="per-question">
                <div class="left-question">
                  <div>
                    <i>{{ question.numInPaper }}</i>
                  </div>
                  <div class="option-tag-position">
                    <div class="mb-2 mr-2 badge badge-primary">
                      {{ typeTransform(question.type) }}
                    </div>
                  </div>
                </div>

                <div class="right-question">
                  <div class="question-title">
                    <h5 class="card-title">
                      <katex-element
                        :expression="parseLatex(question.description)"
                        :throw-on-error="false"
                        :strict="false"
                      />
                      <div v-if="question.type > 1" class="float-right">
                        <label>
                          <bootstrap-toggle v-model="question.checked" :options="{ on: '在线上传', off: '拍照上传' }" :disabled="false" />
                        </label>
                      </div>
                    </h5>
                  </div>
                  <hr />
                  <div v-if="question.type < 2" class="choice">
                    <div
                      v-for="(option, index) in question.options"
                      :key="index"
                      class="per-choice"
                    >
                      <div class="option-tag">
                        <h5>{{ transform(index) }}</h5>
                      </div>
                      <div v-if="question.type === 0" class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          :variant="calChoiceVariant(question, index)"
                          @click="
                            pickSingle(
                              question.numInPaper,
                              question.questionId,
                              index
                            )
                          "
                        >
                          <katex-element
                            :expression="parseLatex(option.content)"
                            :throw-on-error="false"
                            :strict="false"
                          />
                        </b-button>
                      </div>
                      <div v-if="question.type === 1" class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          :variant="calChoiceVariant(question, index)"
                          @click="
                            pickMulti(
                              question.numInPaper,
                              question.questionId,
                              index
                            )
                          "
                        >
                          <katex-element
                            :expression="parseLatex(option.content)"
                            :throw-on-error="false"
                            :strict="false"
                          />
                        </b-button>
                      </div>
                    </div>
                  </div>
                  <div v-if="question.type > 1 && question.checked" class="fillin">
                    <div class="input-group">
                      <b-button
                        block
                        class="mr-2 mb-3"
                        pill
                        variant="outline-primary"
                        size="sm"
                        @click="handleEdit(question.numInPaper)"
                        >编辑
                      </b-button>
                      <div
                        class="card-shadow-danger border card card-body border-danger"
                      >
                        <katex-element
                          :expression="
                            parseLatex(ansList[question.numInPaper - 1])
                          "
                          :throw-on-error="false"
                          :strict="false"
                        />
                      </div>

                      <!-- <textarea
                        v-model="ansList[question.numInPaper - 1]"
                        class="form-control"
                        placeholder="请在此输入答案..."
                        style="resize: none; width: 700px; height: 200px"
                        @keyup.enter="
                          saveInput(question.numInPaper, question.questionId)
                        "
                        @blur="
                          saveInput(question.numInPaper, question.questionId)
                        "
                      ></textarea> -->
                    </div>
                  </div>
                  <div v-if="question.type > 1 && !question.checked" class="fillin">
                    <div class="main-card mb-3 card">
                      <div class="card-body">
                        <div class="wrapper">
                          <croppa
                              :initial-image="img"
                              :height="300"
                              :width="500"
                              :show-remove-button="false"
                              class="resizable-croppa"></croppa>
                          <img v-if="draggable" src="../../assets/images/resize.png"
                              class="icon-resize"
                              @mousedown.stop.prevent="onResizeTouchStart">
                        </div>
                      </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-col>

        <b-col cols="4">
          <my-count-bar
            :currentPage_props="currentPage"
            :total_rows_props="questionList.length"
            :per_page_props="per_page"
            :items="questionList"
            @updatePage="updatePage"
            @onSelect="handleSelect"
          >
            <template v-slot:header> 题目导览</template>
            <template v-slot:footer>
              <b-row class="justify-content-between">
                <b-col cols="8" md="auto"></b-col>
                <b-col cols="4" md="auto">
                  <b-button pill variant="warning" @click="submitTest"
                    >提交作业
                  </b-button>
                </b-col>
              </b-row>
            </template>
            <template v-slot:button="item">
              <b-button
                pill
                :variant="calButtonVariant(item.item)"
                @click="handleSelect(item.item)"
              >
                {{ item.item.numInPaper }}
              </b-button>
            </template>
          </my-count-bar>
        </b-col>
      </b-row>
    </b-container>
    <div>
      {{ edit }}
    </div>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import TestNavbar from "@/layout/Components/PageTitle3.vue";
import MyCountBar from "@/components/myCountBar";
import MyEditModal from "@/components/myEditModal.vue";
import BootstrapToggle from 'vue-bootstrap-toggle'
import parse from "@/utils/parseLatex";

export default {
  name: "test997",
  components: {
    PageTitle,
    TestNavbar,
    MyCountBar,
    MyEditModal,
    BootstrapToggle
  },
  props: {
    msg: String,
  },
  data: () => ({
    per_page: 9,
    checked: true,
    testTitle1:
      "在生产管理信息系统中，下列操抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客作步骤能正确将工单推进流程的是（）",
    testTitle2:
      "在营销系统中查询客户有无欠费、余额及抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客户时应做到哪些最基本的礼仪？",
    testTitle3: "以下属于南方电网员工职业操守中明文规定的有（）",
    heading: "JavaEE 期中作业",
    subheading: "2021/12/24",
    icon: "pe-7s-drawer icon-gradient bg-tempting-azure",
    breadcrumbItem: [
      {
        text: "Java 期中作业",
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
  }),
  computed: {
    questionList() {
      var array = this.$store.state.global.questionList;
      array.forEach(item => {this.$set(item,'checked',true)})
      console.log(array)
      return array
    },  
    ansList() {
      return this.$store.state.global.ansList;
    },
  },
  mounted() {
    
    this.$store.dispatch("global/getExamQuestion");
  },
  methods: {
    typeTransform(type) {
      if (type === 0) {
        return "单选";
      } else if (type === 1) {
        return "多选";
      } else if (type === 2) {
        return "填空";
      } else if (type === 3) {
        return "大题";
      }
    },
    parseLatex(content) {
      return parse(content);
    },
    transform(num) {
      return String.fromCharCode(num + 65);
    },

    transferList(inputList) {
      let CharList = [];
      for (let a = 0; a < inputList.length; a++) {
        CharList[a] = this.transform(inputList[a]);
      }
      console.log(CharList);
      return CharList;
    },

    saveInput(numInPaper, questionId) {
      if (this.ansList[numInPaper - 1] != null) {
        this.$store.dispatch("global/postAnswer", {
          questionId: questionId,
          stuFillAnswer: this.ansList[numInPaper - 1],
        });
      }
    },

    pickMulti(numInPaper, questionId, ans) {
      if (this.ansList[numInPaper - 1].includes(ans)) {
        for (let i = 0; i < this.ansList[numInPaper - 1].length; i++) {
          if (this.ansList[numInPaper - 1][i] == ans) {
            if (i > -1) {
              this.ansList[numInPaper - 1].splice(i, 1);
            }
            break;
          }
        }
      } else {
        this.ansList[numInPaper - 1].unshift(ans);
      }
      console.log(numInPaper, questionId, ans, this.ansList[numInPaper - 1]);
      this.edit = !this.edit;

      this.$store.dispatch("global/postAnswer", {
        questionId: questionId,
        stuChoiceAnswer: this.transferList(this.ansList[numInPaper - 1]),
      });
    },

    pickSingle(numInPaper, questionId, ans) {
      this.test = 2;
      if (this.ansList[numInPaper - 1].includes(ans)) {
      } else {
        this.ansList[numInPaper - 1] = [];
        this.ansList[numInPaper - 1].unshift(ans);
      }
      console.log(numInPaper, questionId, ans, this.ansList[numInPaper - 1]);
      this.edit = !this.edit;

      this.$store.dispatch("global/postAnswer", {
        questionId: questionId,
        stuChoiceAnswer: this.transferList(this.ansList[numInPaper - 1]),
      });
    },

    calChoiceVariant(question, ans) {
      if (this.ansList[question.numInPaper - 1] == null) {
        return "outline-success";
      } else {
        if (this.ansList[question.numInPaper - 1].includes(ans)) {
          return "success";
        } else {
          return "outline-success";
        }
      }
    },

    submitTest() {
      alert("试卷已提交！");
      this.$store.state.global.isTesting = false;
      this.$store.dispatch("global/deleteSession");
      window.location.href = "/#/dashboard/course";
    },
    calButtonVariant(item) {
      console.log("123", this.ansList[item.numInPaper - 1]);
      if (
        this.ansList[item.numInPaper - 1] != "" &&
        this.ansList[item.numInPaper - 1] != null &&
        this.ansList[item.numInPaper - 1] != []
      ) {
        return "primary";
      } else {
        return "border-primary";
      }
    },
    updatePage() {},
    handleSubmit(content) {
      this.ansList[this.editOwner - 1] = content;
      let questionId = 0;
      this.questionList.forEach((value) => {
        if (value.numInPaper === this.editOwner) {
          questionId = value.questionId;
        }
      });
      this.edit = !this.edit;

      this.saveInput(this.editOwner, questionId);

      this.editOwner = null;
      this.editIntiContent = "";
    },
    handleCancel() {
      this.editOwner = null;
      this.editIntiContent = "";

      this.edit = !this.edit;
    },
    handleSelect() {},
    openEdit() {
      this.$bvModal.show("edit-modal");
    },
    handleEdit(numInPaper) {
      this.editOwner = numInPaper;
      if (
        this.ansList[numInPaper - 1] != "" &&
        this.ansList[numInPaper - 1] != null &&
        this.ansList[numInPaper - 1] != []
      ) {
        this.editIntiContent = this.ansList[numInPaper - 1];
      } else {
        this.editIntiContent = "";
      }
      this.$nextTick(this.openEdit);
    },
  },
};
</script>

<style>
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
.float-right{
  position: absolute;
  right: 30px;
  top: 30px;
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
