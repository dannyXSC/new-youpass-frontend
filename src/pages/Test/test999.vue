<template>
  <div>
    <my-edit-modal
        v-if="editOwner"
        :init-content="editIntiContent"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
    <my-select
        v-if="onShowAnswer!==0&&questionList[onShowId]"
        :init-option-list="questionList[onShowId].option"
        :onShowAnswer="onShowAnswer"
        @onSubmit="handleSubmitOption"
        @onCancel="handleCancelOption"
    />
    <page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <b-container fluid v-if="questionList[onShowId]">
      <b-row>
        <b-col cols="8">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <b-form>
                <b-form-group
                    label-cols-lg="3"
                    :label="'编辑题目'+(onShowId+1)+'信息'"
                    label-size="lg"
                    label-class="font-weight-bold pt-0"
                    class="mb-0"
                >
                  
                  <b-form-group
                      label="题目种类:"
                      label-cols-sm="3"
                      label-align-sm="right"
                  >
                    <b-form-select v-model="questionList[onShowId].type" :options="typeOptions"
                                   @change="handleChangeType"></b-form-select>
                  </b-form-group>

                  <template v-if="questionList[onShowId].type !=null">

                    <b-form-group
                        label="学科:"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                      <b-form-input v-model="questionList[onShowId].subject" placeholder="输入学科"></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="是否私有:"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                      <b-form-select v-model="questionList[onShowId].isPrivate"
                                     :options="isPrivateOptions"></b-form-select>
                    </b-form-group>
                    <template v-if="questionList[onShowId].type === 4">
                      <b-form-group
                        label="题目说明:"
                        label-cols-sm="3"
                        label-align-sm="right"
                        aria-placeholder="无"
                      >
                      <b-button block
                                class="mr-2 mb-3"
                                pill
                                variant="outline-primary"
                                size="sm"
                                @click="handleEditDescription"
                      >
                        编辑
                      </b-button>
                      <div class="card-shadow-success border card card-body border-success">
                        <katex-element
                            :expression="parseLatex(questionList[onShowId].description)"
                            :throw-on-error="false"
                            :strict="false"
                        />
                      </div>
                    </b-form-group>
                      <b-form-group
                        label="题目:"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                      <vue-dropzone
                      ref="myVueDropzone"
                      :id="'dropzoneQue'+onShowId"
                      :options="dropzoneOptions"
                      @vdropzone-removed-file='removeThisFile'
                      @vdropzone-success='queUploadSuccess'
                      ></vue-dropzone>
                      </b-form-group>
                      
                      <b-form-group
                        label="答案:"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                      <vue-dropzone
                      ref="myVueDropzone"
                      :id="'dropzoneAns'+onShowId"
                      :options="dropzoneOptions"
                      @vdropzone-removed-file='removeThisFile'
                      @vdropzone-success='ansUploadSuccess'
                      ></vue-dropzone>
                      </b-form-group>
                    </template>

                    <template v-if="questionList[onShowId].type != 4">
                      <b-form-group
                        label="题干:"
                        label-cols-sm="3"
                        label-align-sm="right"
                      >
                      <b-button block
                                class="mr-2 mb-3"
                                pill
                                variant="outline-primary"
                                size="sm"
                                @click="handleEditDescription"
                      >
                        编辑
                      </b-button>
                      <div class="card-shadow-success border card card-body border-success">
                        <katex-element
                            :expression="parseLatex(questionList[onShowId].description)"
                            :throw-on-error="false"
                            :strict="false"
                        />
                      </div>
                    </b-form-group>
                    </template>

                    <template v-if="questionList[onShowId].type===1||questionList[onShowId].type===0">
                      <b-form-group
                          label="选项:"
                          label-cols-sm="3"
                          label-align-sm="right"
                      >
                        <b-button block
                                  class="mr-2 mb-3"
                                  pill
                                  variant="outline-primary"
                                  size="sm"
                                  @click="handleAddOption"
                        >
                          添加
                        </b-button>
                        <b-button v-for="option in questionList[onShowId].option"
                                  :key="option.id"
                                  block
                                  class="mr-2 mb-1 text-left"
                                  variant="outline-info"
                                  size="sm"
                                  @click="handleClickOption(option.id)"
                        >
                          <katex-element
                              :expression="parseLatex(option.description)"
                              :throw-on-error="false"
                              :strict="false"
                          />
                        </b-button>
                      </b-form-group>
                    </template>

                    <b-form-group v-if="questionList[onShowId].type != 4"
                        label="答案:"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                      <template v-if="questionList[onShowId].type===0">
                        <b-button block
                                  class="mr-2 mb-3"
                                  pill
                                  variant="outline-primary"
                                  size="sm"
                                  @click="handleSelectOptionStandAnswer"
                        >
                          选择
                        </b-button>
                        <template v-for="option in questionList[onShowId].option">
                          <div :key="option.id"
                               v-if="option.isAnswer"
                               class="card-shadow-danger border card card-body border-danger mr-2 mb-1">
                            <katex-element
                                :expression="parseLatex(option.description)"
                                :throw-on-error="false"
                                :strict="false"
                            />
                          </div>
                        </template>
                      </template>

                      <template v-else-if="questionList[onShowId].type===1">
                        <b-button block
                                  class="mr-2 mb-3"
                                  pill
                                  variant="outline-primary"
                                  size="sm"
                                  @click="handleSelectMultiOptionStandAnswer"
                        >
                          选择
                        </b-button>
                        <template v-for="option in questionList[onShowId].option">
                          <div :key="option.id"
                               v-if="option.isAnswer"
                               class="card-shadow-danger border card card-body border-danger mr-2 mb-1">
                            <katex-element
                                :expression="parseLatex(option.description)"
                                :throw-on-error="false"
                                :strict="false"
                            />
                          </div>
                        </template>
                      </template>

                      <template v-else-if="questionList[onShowId].type===2||questionList[onShowId].type===3">
                        <b-button block class="mr-2 mb-3" pill variant="outline-primary" size="sm"
                                  @click="handleEditStandAnswer">编辑
                        </b-button>
                        <div class="card-shadow-danger border card card-body border-danger">
                          <katex-element
                              :expression="parseLatex(questionList[onShowId].standAnswer)"
                              :throw-on-error="false"
                              :strict="false"
                          />
                        </div>
                      </template>

                    </b-form-group>
                  </template>


                </b-form-group>

              </b-form>

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
                {{ item.item.id + 1 }}
              </b-button>
            </template>

          </my-count-bar>

        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import $ from 'jquery'
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyEditModal from "@/components/myEditModal";
import MyCountBar from "@/components/myCountBar";
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {deleteImageByName} from "@/api";
import {questionImageUpload} from "@/api"
import parseLatex from "@/utils/parseLatex";
import MySelect from "@/components/mySelect";
import 'vue-croppa/dist/vue-croppa.css'
import Vue from 'vue'
import Croppa from 'vue-croppa'

Vue.use(Croppa)  
export default {
  name: "test999",
  components: {MySelect, MyCountBar, MyEditModal, PageTitle,vueDropzone:vue2Dropzone,questionImageUpload},
  data() {
    return {
      dropzoneOptions: {
        url: '/api/testUploadImage',
        thumbnailWidth: 150,
        maxFilesize: 2,
        addRemoveLinks: true,
      },
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

      questionList: [],

      currentPage: 1,

    
      typeOptions: [
        {value: null, text: 'Please select an option'},
        {value: 0, text: '单择题'},
        {value: 1, text: '多选题'},
        {value: 2, text: '填空题'},
        {value: 3, text: '大题'},
        {value: 4, text: '图片题'}
      ],
      isPrivateOptions: [
        {value: null, text: 'Please select an option'},
        {value: 1, text: '私有'},
        {value: 0, text: '公有'},
      ],
      text: "",


      per_page: 9,
      onShowId: 0,
      editOwner: null,
      editIntiContent: "",
      editContent: "",
      onEditOptionId: -1,
      //用于判断点击几次
      optionClickId: null,
      onShowAnswer: 0
    }
  },
  computed: {},
  mounted() {
    this.addQuestion()
    // for (var i = 0; i < 30; i++) {
    //
    //   this.questionList.push({
    //     id: i,
    //     type: Math.floor(Math.random() * 4),
    //     description: "填空题f(x,y) = \\sqrt[n]{{x^2}{y^3}}",
    //     standAnswer: "填空题答案",
    //     subject: "数学",
    //     createTime: "123",
    //     isPrivate: 1,
    //     option: [{description: "content", id: 0, isAnswer: false}],
    //     pool: 0,
    //     courseId: 123
    //   })
     //   this.questionList.push({
    //     id: i,
    //     type: 4,
    //     description: "填空题f(x,y) = \\sqrt[n]{{x^2}{y^3}}",

    //   })
    // }
  },
  methods: {
    removeThisFile(file, error, xhr) {
      deleteImageByName(file.name);
    },
    queUploadSuccess(file, response){
      questionImageUpload(file.name)
      this.questionList[this.onShowId].questionImage.push(file.name)
    },
    ansUploadSuccess(file, response){
      questionImageUpload(file.name)
      this.questionList[this.onShowId].answerImage.push(file.name)
    },
    openEdit() {
      this.$bvModal.show('edit-modal')
    },
    openSelect() {
      this.$bvModal.show('select-modal')
    },
    updatePage(page) {
      this.currentPage = page
    },
    handleSelect(item) {
      this.onShowId = item.id
    },
    handleEditDescription() {
      this.editOwner = "description"
      this.editIntiContent = this.questionList[this.onShowId].description
      this.$nextTick(this.openEdit)
    },
    handleAddOption() {
      this.editOwner = "option-add"
      this.editIntiContent = ""
      this.$nextTick(this.openEdit)
    },
    handleDeleteOption(id) {
      this.questionList[this.onShowId].option = this.questionList[this.onShowId].option.filter((value) => {
        return value.id !== id
      })
      this.updateId()
    },
    handleEditOption(id) {
      this.editOwner = "option-edit"
      let text = ""
      this.questionList[this.onShowId].option.forEach((value) => {
        if (value.id === id) {
          text = value.description
        }
      })
      this.editIntiContent = text
      this.onEditOptionId = id
      this.$nextTick(this.openEdit)
    },
    handleEditStandAnswer() {
      this.editOwner = "standAnswer"
      this.editIntiContent = this.questionList[this.onShowId].standAnswer
      this.$nextTick(this.openEdit)
    },
    handleSelectOptionStandAnswer() {
      this.onShowAnswer = 1
      this.$nextTick(this.openSelect)
    },
    handleSelectMultiOptionStandAnswer() {
      this.onShowAnswer = 2
      this.$nextTick(this.openSelect)
    },
    handleSubmit(content) {
      switch (this.editOwner) {
        case "description": {
          this.questionList[this.onShowId].description = content
          break
        }
        case "standAnswer": {
          this.questionList[this.onShowId].standAnswer = content
          break
        }
        case "option-add": {
          let maxId = this.getMaxOptionId()
          this.questionList[this.onShowId].option.push({description: content, id: maxId, isAnswer: false})
          break
        }
        case "option-edit": {
          this.questionList[this.onShowId].option.forEach((value, index) => {
            if (value.id === this.onEditOptionId) {
              this.questionList[this.onShowId].option[index].description = content
            }
          })
          this.onEditOptionId = -1;
          break
        }
      }
      this.editOwner = null
      this.editContent = content
    },
    handleCancel() {
      this.editOwner = null
      this.editContent = ""
    },
    getMaxOptionId() {
      let id = 0;
      if (this.questionList[this.onShowId].option.length > 0) {
        this.questionList[this.onShowId].option.forEach((value) => {
          id = Math.max(id, value.id + 1);
        });
      }
      return id;
    },
    parseLatex(content) {
      return parseLatex(content)
    },
    handleClickOption(id) {
      if (this.optionClickId === id) {
        // optionClickTimes++;
        clearTimeout(this.optionTimer);
        // optionClickTimes = 0;
        this.optionClickId = null;
        this.handleDeleteOption(id);
      } else {
        // optionClickTimes = 1;
        this.optionClickId = id;
        if (this.optionTimer != null) {
          clearTimeout(this.optionTimer);
        }
        this.optionTimer = setTimeout(() => {
          // optionClickTimes = 0;
          this.optionClickId = null;
          this.handleEditOption(id);
        }, 300);
      }
    },
    updateId() {
      const optionCompare = (a, b) => {
        return a.id > b.id ? 1 : -1;
      };
      // 首先对option进行排序
      this.questionList[this.onShowId].option.sort(optionCompare);
      let cnt = 0;
      this.questionList[this.onShowId].option.forEach((value, index) => {
        this.questionList[this.onShowId].option[index].id = cnt;
        cnt += 1;
      });

    },
    handleSubmitOption(optionList) {
      console.log("submit")
      this.questionList[this.onShowId].option = [...optionList]
      this.onShowAnswer = 0
    },
    handleCancelOption() {
      console.log("cancel")
      this.onShowAnswer = 0
    },
    handleChangeType() {
      this.questionList[this.onShowId].option = []
      this.questionList[this.onShowId].standAnswer = ""
    },
    addQuestion() {
      this.onShowId = this.questionList.length
      if (this.currentPage != Math.floor(this.questionList.length / this.per_page) + 1) {
        this.currentPage = Math.floor(this.questionList.length / this.per_page) + 1
        // console.log(this.questionList.length, Math.floor(this.questionList.length / this.per_page) + 1, this.currentPage)
      }
      console.log(this.currentPage)
      this.questionList.push({
        uploadType: null,
        id: this.questionList.length,
        type: null,
        description: "",
        questionImage:[],
        answerImage:[],
        standAnswer: "",
        subject: "",
        createTime: "",
        isPrivate: null,
        option: [],
        pool: 0,
      })
    },
    subtractionQuestion() {
      if (this.questionList.length > 1) {
        this.questionList = this.questionList.filter((value) => {
          return value.id != this.onShowId
        })
        console.log(this.questionList, this.onShowId)
        this.questionList = this.questionList.map((value) => {
          if (value.id >= this.onShowId) {
            value.id--
            return value
          } else {
            return value
          }
        })
        if (this.onShowId >= 1) {
          this.onShowId--
          this.currentPage = Math.floor((this.onShowId - 1) / this.per_page) + 1
        } else {
          this.onShowId = 0
        }
      }
    },
    calButtonVariant(item) {
      if (item.id === this.onShowId) {
        return 'secondary'
      } else {
        if (this.judgeQuestionIsComplete(item.id)) {
          return 'success'
        } else {
          return 'outline-success'
        }
      }
    },
    judgeQuestionIsComplete(id) {
      if (id < this.questionList.length) {
        if(this.questionList[id].type === 4){
            if(this.questionList[id].questionImage.length > 0 && this.questionList[id].answerImage.length >0){
              return true
            }
            else{
              return false
            }
          }
        else if (this.questionList[id].type !== null
            && this.questionList[id].description !== ""
            && this.questionList[id].isPrivate !== null
            && this.questionList[id].subject !== "") {
          if (this.questionList[id].type === 0 || this.questionList[id].type === 1) {
            if (this.questionList[id].option.length > 0) {
              let flag = false
              this.questionList[id].option.forEach((value) => {
                if (value.isAnswer) {
                  flag = true
                }
              })
              if (flag)
                return true
            }
          } else {
            if (this.questionList[id].standAnswer !== "") {
              return true
            }
          }
        }
      }
      return false
    },
    submitQuestionList() {
      let cnt = 0
      this.questionList.forEach((value) => {
        if (this.judgeQuestionIsComplete(value.id) === false) {
          cnt += 1
        }
      })
      if(cnt>0){
        alert("你必须完成所题目信息的填写")
      }else{
        //发送信息
        let postData = []
        let curTime = new Date()
        this.questionList.forEach((value, index) => {
          let dataItem = {}
          dataItem.questionId = value.id
          dataItem.courseId = this.courseId
          dataItem.description = value.description
          dataItem.type = value.type
          dataItem.standardAnswer = ""
          if(value.type === 4){
            dataItem.questionImage = value.questionImage
            dataItem.answerImage = value.answerImage
          }
          if (value.type === 0 || value.type === 1) {
            dataItem.optionInfoList = []
            value.option.forEach((value) => {
              dataItem.standardAnswer += value.isAnswer === true ? "1" : "0"
              dataItem.optionInfoList.push({optionId: value.id, content: value.description})
            })
          } else {
            dataItem.standardAnswer = value.standAnswer
          }
          dataItem.subject = value.subject
          dataItem.createTime = curTime
          postData.push(dataItem)
        })
        this.$store.dispatch("global/uploadQuestions", postData);
      }
    },
    test(){
      //上传
      file;
      res = api;
      if(res.state= gogod){

      }
    }
  }
}
</script>

<style scoped>

</style>

