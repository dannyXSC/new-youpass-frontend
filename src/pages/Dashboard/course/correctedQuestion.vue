<template>
  <div>
    <page-title
        :heading="this.title"
        :subheading="this.starttime"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>

    <my-list title="课程信息" :items="items" :fields="fields">
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="其他功能" active>
              <b-button
                  class="mr-2 mb-2"
                  variant="primary"
                  @click="handleManualCorrect(row.row.item)"
              >
                手动批改
              </b-button>
              <b-button
                  class="mr-2 mb-2"
                  variant="info"
                  @click="handleAutoCorrect(row.row.item)"
              >
                自动批改
              </b-button>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import myList from "@/components/myList";
import PageTitle from "@/layout/Components/PageTitle.vue";
import {autoCorrect, getUnmarkedQuestion, updateGrade} from "@/api";
import router from "@/router";

export default {
  name: "correctedQuestion",
  components: {
    myList,
    PageTitle,
  },
  props: ["homeworkId","courseId","title","starttime"],
  mounted() {
    this.init();
  },
  data() {
    return {
      heading: "Standard Buttons",
      subheading:
          "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "作业管理",
          href: "#/dashboard/homeworkList/"+this.courseId,
        },
        {
          text: this.title,
          active: true,
        },
      ],
      fields: [
        {label: "题目id", key: "questionId"},
        {label: "类型", key: "type"},
        {label: "题干", key: "description"},
        {
          label: "未批改人数",
          key: "restNumber",
        },
        {
          label: "总人数",
          key: "totalNumber"
        }
      ],
      items: [],
    };
  },
  methods: {
    init(){
      getUnmarkedQuestion(this.homeworkId).then((res) => {
        if (res.code === 100) {
          if (Array.isArray(res.data)) {
            this.items = []
            res.data.forEach((value, index) => {
              value._showDetails = false;
              value.isActive = false;
              this.items.push(JSON.parse(JSON.stringify(value)));
            });
          } else {
            alert("已经批改完成");
            router.push("/dashboard");
          }
        } else {
          alert("error");
          router.push("/dashboard");
        }
      }).catch((error) => {
        alert(error);
        router.push("/dashboard");
      });
    },
    handleManualCorrect(item) {
      this.$router.push({
        name: "correctPaper",
        params: {
          homeworkId: this.homeworkId,
          questionId: item.questionId,
        },
      });
    },
    handleAutoCorrect(item) {
      autoCorrect(this.homeworkId,item.questionId)
          .then((res) => {
            if (res.code === 100) {
              this.init()
            } else {
              alert(res.msg);
            }
          })
          .catch((error) => {
            alert(error);
          });
      updateGrade().then(res=>{
        if(res.code!==100){
          this.$toast.error("成绩更新失败！")
        }
      })
    },
  },
};
</script>

<style scoped></style>
