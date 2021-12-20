<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
      :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <b-container>
      <b-row>
        <b-col cols="8">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <div class="per-question">
                <div class="left-question">
                  <i>1</i>
                </div>

                <div class="right-question">
                  <div class="question-title">
                    <h5 class="card-title">{{ testTitle1 }}</h5>
                  </div>
                  <hr />
                  <div class="choice">
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>A</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在工具栏中点击“workflow”标签
                        </b-button>
                      </div>
                    </div>

                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>B</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在缺陷单界面中点击“推进流程”按钮
                        </b-button>
                      </div>
                    </div>
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>C</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在缺陷单界面中点击“提交”按钮
                        </b-button>
                      </div>
                    </div>
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>D</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          后台启动流程推进
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <div class="per-question">
                <div class="left-question">
                  <i>2</i>
                </div>

                <div class="right-question">
                  <div class="question-title">
                    <h5 class="card-title">{{ testTitle2 }}</h5>
                  </div>
                  <hr />
                  <div class="choice">
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>A</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在工具栏中点击“workflow”标签
                        </b-button>
                      </div>
                    </div>

                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>B</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在缺陷单界面中点击“推进流程”按钮
                        </b-button>
                      </div>
                    </div>
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>C</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在缺陷单界面中点击“提交”按钮
                        </b-button>
                      </div>
                    </div>
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>D</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          后台启动流程推进
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="main-card mb-3 card">
            <div class="card-body">
              <div class="per-question">
                <div class="left-question">
                  <i>3</i>
                </div>

                <div class="right-question">
                  <div class="question-title">
                    <h5 class="card-title">{{ testTitle3 }}</h5>
                  </div>
                  <hr />
                  <div class="choice">
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>A</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在工具栏中点击“workflow”标签
                        </b-button>
                      </div>
                    </div>

                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>B</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在缺陷单界面中点击“推进流程”按钮
                        </b-button>
                      </div>
                    </div>
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>C</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          在缺陷单界面中点击“提交”按钮
                        </b-button>
                      </div>
                    </div>
                    <div class="per-choice">
                      <div class="option-tag">
                        <h5>D</h5>
                      </div>
                      <div class="option-button">
                        <b-button
                          block
                          class="btn-md mr-2 mb-2 text-left"
                          variant="primary"
                        >
                          后台启动流程推进
                        </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-card mb-3 card">
            <div class="card-body">
              <div class="per-question">
                <div class="left-question">
                  <i>4</i>
                </div>

                <div class="right-question">
                    <div class="question-title">
                      <h5 class="card-title">{{ testTitle3 }}</h5>
                    </div>
                    <hr />
                    <div class="fillin">
                      <div class="input-group">
                        <textarea
                          class="form-control"
                          placeholder="请在此输入答案..."
                          style="resize: none; width: 700px; height: 200px"
                        ></textarea>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </b-col>

        <b-col cols="4">
          <b-card body-class="text-center">
            <template #header> 题目总览 </template>

            <b-card-body>
              <b-container>
                <b-row>
                  <b-col cols="4"
                    ><b-button pill variant="success">1</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">2</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">3</b-button></b-col
                  >
                </b-row>
                <br />
                <b-row>
                  <b-col cols="4"
                    ><b-button pill variant="success">4</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">5</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">6</b-button></b-col
                  >
                </b-row>
                <br />
                <b-row>
                  <b-col cols="4"
                    ><b-button pill variant="success">7</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">8</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">9</b-button></b-col
                  >
                </b-row>
                <br />
                <b-row>
                  <b-col cols="4"
                    ><b-button pill variant="success">10</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">11</b-button></b-col
                  >
                  <b-col cols="4"
                    ><b-button pill variant="success">12</b-button></b-col
                  >
                </b-row>
                <br />
              </b-container>
            </b-card-body>

            <b-pagination
              v-model="currentPage"
              :total-rows="20"
              :per-page="1"
              pills
              size="sm"
            ></b-pagination>

            <b-card-footer>
              <b-row class="justify-content-between">
                <b-col cols="8" md="auto">
                </b-col>
                <b-col cols="4" md="auto">
                  <b-button pill variant="warning">提交测验</b-button>
                </b-col>
              </b-row>
            </b-card-footer>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import TestNavbar from "@/layout/Components/PageTitle3.vue";

export default {
  name: "examTest",
  components: {
    PageTitle,
    TestNavbar,
  },
  props: {
    msg: String,
  },
  data: () => ({
    testTitle1:
      "在生产管理信息系统中，下列操抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客作步骤能正确将工单推进流程的是（）",
    testTitle2:
      "在营销系统中查询客户有无欠费、余额及抄表数据接待客余额及抄表数据接待客余额及抄表数据接待客户时应做到哪些最基本的礼仪？",
    testTitle3: "以下属于南方电网员工职业操守中明文规定的有（）",
    heading: "JavaEE 期中测验",
    subheading: "2021/12/18",
    icon: "pe-7s-drawer icon-gradient bg-tempting-azure",

    fields: ["first_name", "last_name", "age"],
    items: [
      { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
      { age: 21, first_name: "Larsen", last_name: "Shaw" },
      { age: 89, first_name: "Geneva", last_name: "Wilson" },
    ],
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: false,
    dark: false,
    fixed: false,
    footClone: false,

    breadcrumbItem: [
      {
        text: "Java 期中测验",
        href: "#",
      }
    ],

    items: [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
    ],

    currentPage: 1,
    expanded: false,
    barStyle: {
      backgroundColor: "#69aa8a",
    },
  }),
  methods: {
    pick(event) {
      console.log(12312);
      console.log(event);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    onSidebarChanged() {},
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
.paper-area {
}
</style>

