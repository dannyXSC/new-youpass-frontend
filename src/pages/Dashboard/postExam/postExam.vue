<template>
  <div v-if="courseId">
    <my-select-question-modal
        v-if="onOpenModal"
        :id="modalId"
        :init-question-list="examInfo.questionList"
        :all-question-info="allQuestionInfo"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <div class="main-card mb-3 card">
      <div class="card-body">
        <b-form>
          <b-form-group
              label-cols-lg="3"
              label="作业信息"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
          >
            <b-form-group
                label="作业名称:"
                label-for="examTitle"
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-input
                  id="examTitle"
                  v-model="examInfo.examName"
              ></b-form-input>
            </b-form-group>

<!--            <b-form-group-->
<!--                label="作业开始时间:"-->
<!--                label-cols-sm="3"-->
<!--                label-align-sm="right"-->
<!--            >-->
              <b-form-group
                  label="作业开始日期:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input
                    id="startDate"
                    type="date"
                    class="text-center"
                    v-model="examInfo.startDate"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  label="作业开始时间:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input
                    id="开始时间"
                    type="time"
                    class="text-center"
                    v-model="examInfo.startTime"
                ></b-form-input>
              </b-form-group>
<!--            </b-form-group>-->

<!--            <b-form-group-->
<!--                label="作业结束时间:"-->
<!--                label-cols-sm="3"-->
<!--                label-align-sm="right"-->
<!--            >-->
              <b-form-group
                  label="作业结束日期:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input
                    id="开始日期"
                    type="date"
                    class="text-center"
                    v-model="examInfo.endDate"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                  label="作业结束时间:"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-input
                    id="开始时间"
                    type="time"
                    class="text-center"
                    v-model="examInfo.endTime"
                ></b-form-input>
              </b-form-group>
            </b-form-group>

            <b-form-group
                label=""
                label-cols-sm="3"
                label-align-sm="right"
            >
              <b-form-group
                  label="单选题分数:"
                  label-for="singleScore"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    type="number"
                    name="number"
                    id="singleScore"
                    placeholder="输入分数..."
                    :min="0"
                    v-model="examInfo.singleScore"
                    class="mb-3"
                />
              </b-form-group>
              <b-form-group
                  label="多选题分数:"
                  label-for="multiScore"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    type="number"
                    name="number"
                    id="multiScore"
                    placeholder="输入分数..."
                    :min="0"
                    v-model="examInfo.multiScore"
                    class="mb-3"
                />
              </b-form-group>
              <b-form-group
                  label="填空题分数:"
                  label-for="fillScore"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    type="number"
                    name="number"
                    id="fillScore"
                    placeholder="输入分数..."
                    :min="0"
                    v-model="examInfo.fillScore"
                    class="mb-3"
                />
              </b-form-group>
              <b-form-group
                  label="大题分数:"
                  label-for="bigScore"
                  label-cols-sm="3"
                  label-align-sm="right"
              >
                <b-form-spinbutton
                    type="number"
                    name="number"
                    id="bigScore"
                    placeholder="输入分数..."
                    :min="0"
                    v-model="examInfo.bigScore"
                    class="mb-3"
                />
              </b-form-group>
<!--            </b-form-group>-->
          </b-form-group>
          <b-form-group
              label-cols-lg="2"
              label="选择题目"
              label-size="lg"
              label-class="font-weight-bold pt-0"

          >
            <b-button block class="mr-2 mb-3" pill variant="outline-primary" size="sm"
                      @click="handleSelectQuestion">添加题目
            </b-button>
            <my-draggable-table :fields="fields"
                                v-model="examInfo.questionList"
                                v-if="examInfo.questionList.length>0"/>
          </b-form-group>
          <b-row class="justify-content-end">
            <b-col cols="12" md="auto">
              <b-button pill variant="outline-danger" @click="submit"
              >提交
              </b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import {number} from "echarts";
import MyDraggableTable from "@/components/myDraggableTable";
import MySelectQuestionModal from "@/components/mySelectQuestionModal";
import {getQuestionsOfTeacher, teacherPublishExam} from "@/api";

export default {
  name: "postExam",
  components: {MySelectQuestionModal, MyDraggableTable, PageTitle},
  data() {
    return {
      heading: "发布作业",
      subheading: "您可以在此页面发布一次作业",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "发布作业",
          active: true,
        },
      ],
      typeOptions: ['单选题', '多选题', '填空题', '大题'],
      examInfo: {
        examName: "",
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        singleScore: null,
        multiScore: null,
        fillScore: null,
        bigScore: null,
        questionList: []
      },
      fields: [
        {
          key: "id",
          value: "Id"
        },
        {
          key: "type",
          value: "题目类型"
        },
        {
          key: "description",
          value: "题目描述"
        },
      ],
      modalId: "selectQuestionModal",
      onOpenModal: false,
      allQuestionInfo: []
    };
  },
  mounted() {
    if(this.courseId==null){
      this.$router.push({name: 'course'});
    }
    getQuestionsOfTeacher().then(res => {
      if (res.code === 100) {
        this.allQuestionInfo = res.data;
        this.allQuestionInfo.forEach((value, index) => {
          this.allQuestionInfo[index].type = this.typeOptions[value.type];
        })
      } else {
        this.$toast.error(res.msg)
      }
    }).catch(error => {
      this.$toast.error(error)
    })
  },
  methods: {
    submit() {
      if (
          this.courseId == null ||
          "" === this.examInfo.examName ||
          null ==
          this.examInfo.startDate + " " + this.examInfo.startTime + ":13" ||
          null == this.examInfo.endDate + " " + this.examInfo.endTime + ":13" ||
          this.examInfo.singleScore == null ||
          this.examInfo.multiScore == null ||
          this.examInfo.fillScore == null ||
          this.examInfo.bigScore == null
      ) {
        alert("输入缺失");
      } else {
        teacherPublishExam(this.examInfo, this.teacherId, this.courseId).then(res => {
          if (res.code === 100) {
            this.$router.push({
              name: "todo",
            });
            this.$toast.success("成功")
          } else {
            this.$toast.error(res.msg)
          }
        }).catch(error => {
          this.$toast.error(error.message)
        })
      }
    },
    handleSelectQuestion() {
      this.onOpenModal = true;
      this.$nextTick(() => {
        this.$bvModal.show(this.modalId)
      })
    },
    handleSubmit(selectedQuestionList) {
      this.examInfo.questionList = selectedQuestionList
      this.onOpenModal = false;
    },
    handleCancel() {
      this.onOpenModal = false;
    }
  },
  props: {
    courseId: Number,
  },
  computed: {
    teacherId() {
      return this.$store.state.global.id;
    },
  },
};
</script>

<style scoped></style>
