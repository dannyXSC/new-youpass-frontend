<template>
<div>
    <my-choose-modal
        v-if="isEditing"
        :initArray="choosen"
        :initContent="this.heading"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
    />
<page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <div>
        <vue-good-table
        ref="my-table"
        @on-selected-rows-change="selectionChanged"
        :columns="columns"
        :rows="rows"
        :select-options="{
            selectOnCheckboxOnly: true, 
            enabled: true,
        }"
        :search-options="{ enabled: true }">
        <div slot="selected-row-actions">
            <b-button pill variant="outline-success" @click="test">选择完毕</b-button>
        </div>
        </vue-good-table>
    </div>
</div>
</template>

<script>
import MyChooseModal from "@/components/myChooseModal";
import PageTitle from "@/layout/Components/PageTitle.vue";

export default {
  name: 'my-component',

  components: {PageTitle,MyChooseModal,},
  props:{
    courseId: Number,
    title: String,
    start_time: String,
    end_time: String,  
  },
  created(){
      console.log(this.questionInfos)
      this.initRow();
  },
  data(){
    return {
        choosen:[],
        isEditing: false,
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
      heading: '选择题目',
      subheading: '您可以在此页面选择题目',
      icon: 'pe-7s-plane icon-gradient bg-tempting-azure',
      columns: [
        {
          label: '题号',
          field: 'id',
        },
        {
          label: '题目类型',
          field: 'type',
        },
        {
          label: '题目简介',
          field: 'description',
        },
        {
          label: '创建时间',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'yyyy-MM-dd',
        },
        {
          label: '分数',
          field: 'score',
        },
      ],
      questionInfos: [
        {
          type: 0,
          questionId: 1,
          numInPaper: 1,
          questionScore: 4,
          createdAt:'2011-10-31',
          description: "第一题xxxx 1_321",
          options: [
            {
              optionId: 1,
              description: "答案1",
            },
            {
              optionId: 2,
              description: "答案2",
            },
            {
              optionId: 3,
              description: "答案3",
            },
            {
              optionId: 4,
              description: "答案4",
            }
          ],
          studentAnswer: []
        },
        {
          type: 1,
          questionId: 2,
          numInPaper: 2,
          questionScore: 4,
          createdAt:'2011-10-31',
          description: "第一题xxxx 1_321",
          options: [
            {
              optionId: 1,
              description: "答案1",
            },
            {
              optionId: 2,
              description: "答案2",
            },
            {
              optionId: 3,
              description: "答案3",
            },
            {
              optionId: 4,
              description: "答案4",
            }
          ],
          studentAnswer: []
        },
        {
          type: 2,
          questionId: 3,
          numInPaper: 3,
          questionScore: 4,
          createdAt:'2011-10-31',
          description: "第一题xxxx 1_321",
          studentAnswer: ""
        },
        {
          type: 3,
          questionId: 4,
          numInPaper: 4,
          questionScore: 4,
          createdAt:'2011-10-31',
          description: "第一题xxxx 1_321",
          pictureDescriptions: ["https://picsum.photos/1024/400/?image=41"],
          studentAnswer: "",
          studentPictureAnswers: ["https://picsum.photos/1024/400/?image=41"]
        }
      ],
      rows: [],
    };
  },
  methods:{
    initRow() {
      this.questionInfos.forEach((questionInfo, index) => {
          this.rows.push({id:0,type:"",description:"",createdAt:"",score:0})
            if (questionInfo.type === 0) {
                this.rows[index].type = "单选题"
            }
            else if (questionInfo.type === 1) {
                this.rows[index].type ="多选题"
            }
            else if (questionInfo.type === 2) {
                this.rows[index].type = "填空题"
            }
            else if (questionInfo.type === 3) {
                this.rows[index].type = "大题"
            }
            else{
                this.rows[index].type = "图片题"
            }
            this.rows[index].id = questionInfo.questionId
            this.rows[index].description = questionInfo.description
            this.rows[index].score = questionInfo.questionScore
            this.rows[index].createdAt = questionInfo.createdAt
          })
    },
    handleSubmit(content){
      content.title = this.title
      content.start_time = this.start_time
      content.end_time = this.end_time
      content.courseId = this.courseId
        console.log(content)
        // this.$store.dispatch("global/uploadQuestions", content);
        this.$store.dispatch("global/submitExam", content);
        this.isEditing = false
    },
    handleCancel(){
        this.isEditing = false
    },
      test(){
          console.log(this.$refs['my-table'].selectedRows)
          let postData = []
          let curTime = new Date()
          this.$refs['my-table'].selectedRows.forEach((value, index) => {
          let dataItem = {}
          dataItem.questionId = value.id
          dataItem.description = value.description
          dataItem.type = value.type
          dataItem.score = value.score
          postData.push(dataItem)
        })
        console.log(postData)
        this.choosen = postData
        this.isEditing = true
        this.$nextTick(this.openEdit)
      },
      openEdit() {
      this.$bvModal.show('choose-modal')
    },
      selectionChanged(){
          console.log(this.$refs['my-table'].selectedRows)
      }
  }
};
</script>