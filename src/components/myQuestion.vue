<template>
  <div>
    <my-edit-modal
        v-if="isEditing"
        :init-content="questionInfo.studentAnswer"
        :id="'modal'+this.questionInfo.questionId"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />

    <div class="card-body">
      <div class="per-question">
        <b-container>
          <b-row>
            <b-col cols="1">
              <div class="left-question">
                <div>
                  <i>{{ questionInfo.numInPaper }}</i>
                </div>
                <div class="option-tag-position">
                  <div class="mb-2 mr-2 badge badge-primary">
                    {{ num2type[questionInfo.type] }}
                  </div>
                </div>
              </div>
            </b-col>
            <b-col>
              <div class="right-question">
                <div class="question-title">
                  <h5 class="card-title">
                    <katex-element
                        :expression="parseLatex(questionInfo.description)"
                        :throw-on-error="false"
                        :strict="false"
                    />
                  </h5>
                  <template v-if="questionInfo.type>=3">
                    <!-- 大题图片题有图片 -->
                    <div
                        v-for="picture in questionInfo.pictureDescriptions" :key="picture"
                        class="mb-3"
                    >
                      <b-img :src="picture" fluid></b-img>
                    </div>
                  </template>

                </div>
                <hr/>
                <div v-if="questionInfo.type < 2" class="choice">
                  <div
                      v-for="(option, index) in questionInfo.options"
                      :key="index"
                      class="per-choice"
                  >
                    <b-row>
                      <b-col cols="1">
                        <div class="option-tag">
                          <h5>{{ transform(index) }}</h5>
                        </div>
                      </b-col>
                      <b-col>
                        <!-- 单选题 -->
                        <div v-if="questionInfo.type === 0" class="option-button">
                          <b-button
                              block
                              class="btn-md mr-2 mb-2 text-left"
                              :variant="calChoiceVariant(index)"
                              @click="pickSingle(index)"
                          >
                            <katex-element
                                :expression="parseLatex(option.description)"
                                :throw-on-error="false"
                                :strict="false"
                            />
                          </b-button>
                        </div>

                        <!-- 多选题 -->
                        <div v-if="questionInfo.type === 1" class="option-button">
                          <b-button
                              block
                              class="btn-md mr-2 mb-2 text-left"
                              :variant="calChoiceVariant(index)"
                              @click="pickMulti(index)"
                          >
                            <katex-element
                                :expression="parseLatex(option.description)"
                                :throw-on-error="false"
                                :strict="false"
                            />
                          </b-button>
                        </div>
                      </b-col>

                    </b-row>
                  </div>
                </div>
                <div v-if="questionInfo.type === 2 " class="fillin">
                  <div class="input-group">
                    <b-button
                        block
                        class="mr-2 mb-3"
                        pill
                        variant="outline-primary"
                        size="sm"
                        @click="handleEdit()"
                    >编辑
                    </b-button>
                    <div
                        class="card-shadow-danger border card card-body border-danger"
                    >
                      <katex-element
                          :expression="parseLatex(questionInfo.studentAnswer)"
                          :throw-on-error="false"
                          :strict="false"
                      />
                    </div>
                  </div>
                </div>
                <!-- 大题 图片题-->
                <div v-if="questionInfo.type >= 3 " class="fillin">
                  <div class="input-group">
                    <b-button
                        block
                        class="mr-2 mb-3"
                        pill
                        variant="outline-primary"
                        size="sm"
                        @click="handleEdit()"
                    >编辑
                    </b-button>
                    <div
                        class="card-shadow-danger border card card-body border-danger mb-3"
                    >
                      <katex-element
                          :expression="parseLatex(questionInfo.studentAnswer)"
                          :throw-on-error="false"
                          :strict="false"
                      />
                    </div>
                  </div>
                  <vue-dropzone
                      ref="myVueDropzone"
                      :id="'dropzone'+questionInfo.questionId"
                      :options="dropzoneOptions"
                      @vdropzone-removed-file='removeThisFile'
                  ></vue-dropzone>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import parse from "@/utils/parseLatex";
import MyEditModal from "@/components/myEditModal.vue";
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {deleteImageByName} from "@/api";

export default {
  name: "myQuestion",
  props: {
    value: Object,
    isRead: {
      default: false,
      type: Boolean
    },
  },
  components: {
    MyEditModal,
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: '/api/testUploadImage',
        thumbnailWidth: 150,
        maxFilesize: 2,
        addRemoveLinks: true,
      },
      //是否正在添加文本答案
      isEditing: false,
      num2type: ["单选", "多选", "填空", "大题","图片题"],
      questionInfo: this.value
      /*
      *
      * 公共
      * - type: 0 1 2 3 4 分别表示单选、多选、填空、大题、图片题
      * - questionId: 题目id(数据库中id)
      * - numInPaper: 在试卷中的序号
      * - description: 题目描述
      * - textComment: 老师的文字评论 (当isRead==true有效)
      * - pictureComment: 老师图片评论 (当isRead==true有效)
      *
      * 单选题 0
      * - options: 选项列表
      *     - optionId: 选项id(A/B/C....)
      *     - description: 选项描述
      * - standardAnswer: 正确答案，数组, 但是里面只有一个数(当isRead==true有效)
      * - studentAnswer: 学生答案，数组，但是里面只有一个数
      *
      * 多选题 1
      * - options: 选项列表
      *     - optionId: 选项id(A/B/C....)
      *     - description: 选项描述
      * - standardAnswer: 正确答案, 数组，对应optionId (当isRead==true有效)
      * - studentAnswer: 学生答案, 数组，对应optionId
      *
      * 填空题 2
      * - studentAnswer: 学生答案，文本
      * - standardAnswer: 正确答案，文本 (当isRead==true有效)
      *
      * 大题 3
      * - pictureDescription: 列表，每一项是一个图片的url
      * - studentAnswer: 学生答案，文本
      * - standardAnswer: 正确答案，文本 (当isRead)
      * - studentPictureAnswers: 学生答案，图片
      * - standardPictureAnswers: 正确答案，图片 (当isRead==true有效)
      *
      * */
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', this.questionInfo)
    },
    parseLatex(content) {
      return parse(content)
    },
    calChoiceVariant(ans) {
      if (!this.questionInfo.studentAnswer) {
        return "outline-success";
      } else {
        if (this.questionInfo.studentAnswer.includes(ans)) {
          return "success";
        } else {
          return "outline-success";
        }
      }
    },
    pickSingle(index) {
      this.questionInfo.studentAnswer = [index];
      this.handleInput();
    },
    pickMulti(index) {
      if (this.questionInfo.studentAnswer.includes(index)) {
        this.questionInfo.studentAnswer.splice(this.questionInfo.studentAnswer.indexOf(index), 1);
      } else {
        this.questionInfo.studentAnswer.push(index);
      }
      console.log(index);
      this.handleInput();
    },
    transform(num) {
      return String.fromCharCode(num + 'A'.charCodeAt(0));
    },
    handleEdit() {
      this.isEditing = true;
      this.$nextTick(_ => this.$bvModal.show(`modal${this.questionInfo.questionId}`))
    },
    handleSubmit(content) {
      this.questionInfo.studentAnswer = content;
      this.handleInput();
      this.isEditing = false;
    },
    handleCancel() {
      this.isEditing = false;
    },
    removeThisFile(file, error, xhr) {
      deleteImageByName(file.name);
    },
  }
}
</script>

<style scoped>
.per-question {
  float: left;
  /*width: 1000px;*/
  padding-bottom: 30px;
}

.per-question .left-question {
  float: left;
  /*width: 10%;*/
}

.per-question .right-question {
  /*float: left;*/
  /*width: 600px;*/
  /*width: 90%;*/
  width: 100%;
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
  /*float: left;*/
  /*width: 1000px;*/
  /*vertical-align: middle;*/
  width: 100%;
}

.choice .per-choice .option-tag {
  float: left;
  width: 10%;
  margin-top: 3px;
}

.choice .per-choice .option-button {
  float: left;
  width: 90%;
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