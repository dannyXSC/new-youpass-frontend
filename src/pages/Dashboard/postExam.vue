<template>
  <div>
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
            label="发布考试"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="考试名称:"
              label-for="examTitle"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="examTitle"
                v-model="examInfo.examName"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="考试开始时间:"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-group
                label="date:"
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
                label="time:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  id="startTime"
                  type="time"
                  class="text-center"
                  v-model="examInfo.startTime"
                ></b-form-input>
              </b-form-group>
            </b-form-group>

            <b-form-group
              label="考试结束时间:"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-group
                label="date:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  id="startDate"
                  type="date"
                  class="text-center"
                  v-model="examInfo.endDate"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="time:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-input
                  id="startTime"
                  type="time"
                  class="text-center"
                  v-model="examInfo.endTime"
                ></b-form-input>
              </b-form-group>
            </b-form-group>

            <b-form-group
              label="单选题信息:"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-group
                label="题目数量:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="selectNum"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.singleChoiceNum"
                />
              </b-form-group>
              <b-form-group
                label="题目分值:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="selectScore"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.singleChoiceValue"
                />
              </b-form-group>
            </b-form-group>

            <!--多选-->
            <b-form-group
              label="多选题信息:"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-group
                label="题目数量:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="multiSelectNum"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.multiChoiceNum"
                />
              </b-form-group>
              <b-form-group
                label="题目分值:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="multiSelectScore"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.multiChoiceValue"
                />
              </b-form-group>
            </b-form-group>

            <!--填空-->
            <b-form-group
              label="填空信息:"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-group
                label="题目数量:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="fillNum"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.fillingNum"
                />
              </b-form-group>
              <b-form-group
                label="题目分值:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="fillScore"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.fillingValue"
                />
              </b-form-group>
            </b-form-group>

            <!--大题-->
            <b-form-group
              label="大题信息:"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-group
                label="题目数量:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="compilationNum"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.comprehensiveNum"
                />
              </b-form-group>
              <b-form-group
                label="题目分值:"
                label-cols-sm="3"
                label-align-sm="right"
              >
                <b-form-spinbutton
                  id="compilationScore"
                  placeholder="--"
                  wrap
                  min="1"
                  max="25"
                  class="text-center"
                  v-model="examInfo.comprehensiveValue"
                />
              </b-form-group>
            </b-form-group>
          </b-form-group>

          <b-row class="justify-content-end">
            <b-col cols="12" md="auto">
              <b-button pill variant="outline-danger" @click="submit"
                >提交</b-button
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
import { number } from "echarts";

export default {
  name: "postExam",
  components: { PageTitle },
  data() {
    return {
      heading: "发布考试",
      subheading: "您可以在此页面发布一场考试",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "Admin",
          href: "#",
        },
        {
          text: "Manage",
          href: "#",
        },
        {
          text: "Test1",
          href: "#",
        },
        {
          text: "Library",
          active: true,
        },
      ],
      examInfo: {
        examName: "",
        startDate: null,
        startTime: null,
        endDate: null,
        endTime: null,
        singleChoiceNum: null,
        singleChoiceValue: null,
        multiChoiceNum: null,
        multiChoiceValue: null,
        fillingNum: null,
        fillingValue: null,
        comprehensiveNum: null,
        comprehensiveValue: null,
      },
      test: [{ id: 1 }, { id: 2 }],
    };
  },
  methods: {
    submit() {
      if (
        this.courseId == null ||
        "" == this.examInfo.examName ||
        null ==
          this.examInfo.startDate + " " + this.examInfo.startTime + ":13" ||
        null == this.examInfo.endDate + " " + this.examInfo.endTime + ":13" ||
        null == this.examInfo.singleChoiceNum ||
        null == this.examInfo.singleChoiceValue ||
        null == this.examInfo.multiChoiceNum ||
        null == this.examInfo.multiChoiceValue ||
        null == this.examInfo.fillingNum ||
        null == this.examInfo.fillingValue ||
        null == this.examInfo.comprehensiveNum ||
        null == this.examInfo.comprehensiveValue
      ) {
        alert("输入缺失");
      } else {
        this.$store.dispatch("global/submitExam", {
          courseId: this.courseId,
          title: this.examInfo.examName,
          start_time:
            this.examInfo.startDate + " " + this.examInfo.startTime + ":13",
          end_time: this.examInfo.endDate + " " + this.examInfo.endTime + ":13",
          choice_num: this.examInfo.singleChoiceNum,
          choice_value: this.examInfo.singleChoiceValue,
          multi_choice_num: this.examInfo.multiChoiceNum,
          multi_choice_value: this.examInfo.multiChoiceValue,
          completion_num: this.examInfo.fillingNum,
          completion_value: this.examInfo.fillingValue,
          filled_num: this.examInfo.comprehensiveNum,
          filled_value: this.examInfo.comprehensiveValue,
        });
      }
    },
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
