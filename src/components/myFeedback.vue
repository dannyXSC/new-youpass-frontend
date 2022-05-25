<template>
  <div>
    <!-- id与numInPaper有关的原因是会被批改的时候使用，
         所以，这个时候questionId都相同，但是numInPaper不同

       -->
    <my-edit-modal
        v-if="isEditing"
        :init-content="questionInfo.textComment"
        :id="'myModal'+this.questionInfo.numInPaper"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />

    <!--
    编辑图片的modal
    -->
    <my-image-editor
        v-if="isEditing"
        :path="initEditedImagePath"
        :name="initEditedImageName"
        :id="'myImageModal'+this.questionInfo.numInPaper"
        @onSubmit="handleImageSubmit"
        @onCancel="handleImageCancel"
    />

    <div class="card-body">
      <div class="per-question">
        <b-container fluid>
          <b-row>
            <b-col cols="1">
              <div class="left-question">
                <div>
                  <i>{{ questionInfo.numInPaper + 1 }}</i>
                </div>
                <div class="option-tag-position">
                  <div class="mb-2 mr-2 badge badge-dark">
                    {{ num2type[questionInfo.type] }}
                  </div>
                </div>
              </div>
            </b-col>
            <b-col>

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
                  <my-b-image :idList="questionInfo.pictureDescriptions">

                  </my-b-image>
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
                            disabled
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
                            disabled
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
                  <div
                      class="card-shadow-dark border card card-body border-dark"
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
              <div v-if="questionInfo.type === 3 " class="fillin">
                <div class="input-group">
                  <div
                      class="card-shadow-dark border card card-body border-dark mb-3"
                  >
                    <katex-element
                        :expression="parseLatex(questionInfo.studentAnswer)"
                        :throw-on-error="false"
                        :strict="false"
                    />
                  </div>
                </div>
                <my-b-image :idList="questionInfo.studentPictureAnswers">
                  <template v-if="editable">
                    <template slot-scope="src">
                      <div style="position: absolute">
                        <b-button size="sm" variant="primary" @click="handleImageEdit(src.src.id)">编辑</b-button>
                      </div>
                    </template>
                  </template>
                </my-b-image>
              </div>
            </b-col>
          </b-row>
          <!-- 正确答案 -->
          <b-row>
            <b-col cols="1">
              <div class="left-question">
                <div class="mb-2 mr-2 badge badge-primary">
                  正确答案
                </div>
              </div>
            </b-col>
            <b-col>
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
                            :variant="calStandardChoiceVariant(index)"
                            disabled
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
                            :variant="calStandardChoiceVariant(index)"
                            disabled
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
                  <div
                      class="card-shadow-success border card card-body border-success"
                  >
                    <katex-element
                        :expression="parseLatex(questionInfo.standardAnswer)"
                        :throw-on-error="false"
                        :strict="false"
                    />
                  </div>
                </div>
              </div>
              <!-- 大题 图片题-->
              <div v-if="questionInfo.type === 3 " class="fillin">
                <div class="input-group">
                  <div
                      class="card-shadow-success border card card-body border-success mb-3"
                  >
                    <katex-element
                        :expression="parseLatex(questionInfo.standardAnswer)"
                        :throw-on-error="false"
                        :strict="false"
                    />
                  </div>
                </div>
                <my-b-image :idList="questionInfo.standardPictureAnswers">
                </my-b-image>
              </div>
            </b-col>
          </b-row>
          <!-- 评论 -->
          <b-row>
            <b-col cols="1">
              <div class="left-question">
                <div class="mb-2 mr-2 badge badge-focus">
                  评论
                </div>
              </div>
            </b-col>
            <b-col>
              <hr/>
              <div class="input-group">
                <b-button v-if="editable"
                          block
                          class="mr-2 mb-3"
                          pill
                          variant="outline-focus"
                          size="sm"
                          @click="handleEdit()"
                >编辑
                </b-button>
                <div
                    class="card-shadow-focus border card card-body border-focus mb-3"
                >
                  <katex-element
                      :expression="parseLatex(questionInfo.textComment)"
                      :throw-on-error="false"
                      :strict="false"
                  />
                </div>
              </div>
              <b-button v-if="editable"
                        block
                        class="mr-2 mb-3"
                        pill
                        variant="outline-focus"
                        size="sm"
                        @click="handleImageEdit()"
              >添加图片评论
              </b-button>
              <my-b-image :idList="questionInfo.pictureComment">
                <template v-if="editable">
                  <template slot-scope="src">
                    <div style="position: absolute">
                      <b-button size="sm" variant="primary" @click="handleImageEdit(src.src.id)">编辑</b-button>
                    </div>
                    <div style="position: absolute;right: 0">
                      <b-button size="sm" variant="danger" @click="handleImageRemove(src.src.id)">删除</b-button>
                    </div>
                  </template>
                </template>

              </my-b-image>
            </b-col>
          </b-row>

          <!-- 得分 -->
          <b-row v-if="isTeacher==false">
            <b-col cols="1">
              <div class="left-question">
                <div class="mb-2 mr-2 badge badge-focus">
                  得分
                </div>
              </div>
            </b-col>
            <b-col>
              <hr/>
              <div class="input-group">
                <b-button v-if="editable"
                          block
                          class="mr-2 mb-3"
                          pill
                          variant="outline-focus"
                          size="sm"
                          @click="handleEdit()"
                >编辑
                </b-button>
                <div
                    class="card-shadow-focus border card card-body border-focus mb-3"
                >
                  {{ this.questionInfo.mark }}
                  <!--                  <katex-element-->
                  <!--                      :expression="parseLatex(this.questionInfo.mark)"-->
                  <!--                      :throw-on-error="false"-->
                  <!--                      :strict="false"-->
                  <!--                  />-->
                </div>
              </div>
              <b-button v-if="editable"
                        block
                        class="mr-2 mb-3"
                        pill
                        variant="outline-focus"
                        size="sm"
                        @click="handleImageEdit()"
              >添加图片评论
              </b-button>
              <my-b-image :idList="questionInfo.pictureComment">
                <template v-if="editable">
                  <template slot-scope="src">
                    <div style="position: absolute">
                      <b-button size="sm" variant="primary" @click="handleImageEdit(src.src.id)">编辑</b-button>
                    </div>
                    <div style="position: absolute;right: 0">
                      <b-button size="sm" variant="danger" @click="handleImageRemove(src.src.id)">删除</b-button>
                    </div>
                  </template>
                </template>

              </my-b-image>
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
import MyImageEditor from "@/components/myImageEditor";
import {getImageUrl, uploadImage} from "@/api";
import MyBImage from "@/components/myBImage";
import convertBase64UrlToImgFile from "@/utils/base64ToFile";
import requests from "@/utils/requests";

export default {
  name: "myFeedback",
  props: {
    value: Object,
    editable: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MyBImage,
    MyImageEditor,
    MyEditModal,
  },
  data() {
    return {
      //是否正在添加文本答案
      isEditing: false,
      initEditedImagePath: "",
      initEditedImageName: "",
      num2type: ["单选", "多选", "填空", "大题"],
      questionInfo: this.value,
      isTeacher: true,
      /*
      *
      * 公共
      * - type: 0 1 2 3 4 分别表示单选、多选、填空、大题
      * - questionId: 题目id(数据库中id)
      * - numInPaper: 每个题目的标号，从1开始（如果是批改，应该是学生的顺序号）
      * - description: 题目描述
      * - textComment: 老师的文字评论
      * - pictureComment: 老师图片评论
      *
      * 单选题 0
      * - options: 选项列表
      *     - optionId: 选项id(0/1/2....)
      *     - description: 选项描述
      * - standardAnswer: 正确答案，数组, 但是里面只有一个数
      * - studentAnswer: 学生答案，数组，但是里面只有一个数
      *
      * 多选题 1
      * - options: 选项列表
      *     - optionId: 选项id(0/1/2....)
      *     - description: 选项描述
      * - standardAnswer: 正确答案, 数组，对应optionId
      * - studentAnswer: 学生答案, 数组，对应optionId
      *
      * 填空题 2
      * - studentAnswer: 学生答案，文本
      * - standardAnswer: 正确答案，文本
      *
      * 大题 3
      * - pictureDescription: 列表，每一项是一个图片的id
      * - studentAnswer: 学生答案，文本
      * - standardAnswer: 正确答案，文本
      * - studentPictureAnswers: 学生答案，图片id的数组
      * - standardPictureAnswers: 正确答案，图片id的数组
      *
      * */
    }
  },
  mounted() {
    this.handleShow()
  },
  methods: {
    handleShow() {
      if (this.$store.state.global.accountType === 1) {
        this.isTeacher = false;
        console.log("isTeacher:", this.isTeacher)
      }
    },
    handleInput() {
      this.$emit('input', this.questionInfo)
    },
    parseLatex(content) {
      return parse(content)
    },
    calChoiceVariant(ans) {
      if (!this.questionInfo.studentAnswer) {
        return "outline-dark";
      } else {
        if (this.questionInfo.studentAnswer.includes(ans)) {
          return "dark";
        } else {
          return "outline-dark";
        }
      }
    },
    calStandardChoiceVariant(ans) {
      if (!this.questionInfo.standardAnswer) {
        return "outline-success";
      } else {
        if (this.questionInfo.standardAnswer.includes(ans)) {
          return "success";
        } else {
          return "outline-success";
        }
      }
    },
    transform(num) {
      return String.fromCharCode(num + 'A'.charCodeAt(0));
    },
    handleSubmit(content) {
      this.questionInfo.textComment = content;
      this.handleInput();
      this.isEditing = false;
    },
    handleCancel() {
      this.isEditing = false;
    },
    handleEdit() {
      this.isEditing = true;
      this.$nextTick(_ => this.$bvModal.show(`myModal${this.questionInfo.numInPaper}`))
    },
    async handleImageEdit(id) {
      this.initEditedImagePath = await this.calInitEditedImagePath(id)
      this.initEditedImageName = this.calInitEditedImageName()
      this.isEditing = true;
      this.$nextTick(_ => this.$bvModal.show(`myImageModal${this.questionInfo.numInPaper}`))
    },
    async handleImageSubmit(img) {
      let file = convertBase64UrlToImgFile(img)
      let formData = new FormData()
      formData.append('file', file)
      let res = await uploadImage(formData)
      if (res.code === 100) {
        this.questionInfo.pictureComment.push(res.data.id)
        this.handleInput();
      } else {
        this.$message.error(res.msg)
      }
      this.isEditing = false;
    },
    handleImageRemove(id) {
      this.questionInfo.pictureComment.splice(this.questionInfo.pictureComment.indexOf(id), 1)
    },
    handleImageCancel() {
      this.isEditing = false;
    },
    calInitEditedImagePath: async function (id) {
      if (id) {
        let res = await getImageUrl(id);
        return res.data.url
      } else {
        return ""
      }
    },
    calInitEditedImageName: function () {
      return this.questionInfo.questionId + "-" + this.questionInfo.numInPaper;
    },
  },
}
</script>

<style scoped>
.per-question {
  float: left;
  /*width: 1000px;*/
  width: 100%;
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
  /*width: 100%;*/
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