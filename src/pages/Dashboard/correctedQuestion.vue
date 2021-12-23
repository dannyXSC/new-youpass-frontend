<template>
  <div>
    <page-title
        :heading="heading"
        :subheading="subheading"
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
              <b-button class="mr-2 mb-2" variant="info"
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
import {autoCorrect, getUnmarkedQuestion} from "@/api";
import router from "@/router";

export default {
  name: "correctedQuestion",
  components: {
    myList,
    PageTitle,
  },
  props: {
    courseId: Number,
    examId: Number,
  },
  mounted() {
    getUnmarkedQuestion({
      courseId: this.courseId,
      examId: this.examId,
      // courseId: 1000,
      // examId: 1
    })
        .then((res) => {
          console.log(res);
          if (res.code === 100) {
            if (Array.isArray(res.data)) {
              res.data.forEach((value, index) => {
                value._showDetails = false;
                value.isActive = false;
                this.items.push(JSON.parse(JSON.stringify(value)));
              });
              console.log(this.items);
            } else {
              alert("已经批改完成");
              router.push("/dashboard");
            }
          } else {
            alert("error");
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          alert(error);
        });
  },
  data() {
    return {
      heading: "Standard Buttons",
      subheading:
          "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
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
          text: "Library",
          active: true,
        },
      ],
      fields: [
        {label: "题目id", key: "questionId"},
        {label: "题干", key: "description"},
        {
          label: "未批改人数",
          key: "restNumber",
        },
      ],
      items: [],
    };
  },
  methods: {
    handleManualCorrect(item) {
      this.$router.push({
        name: "correctPaper",
        params: {
          courseId: this.courseId,
          examId: this.examId,
          // courseId:1000,
          // examId:1,
          questionId: item.questionId,
        },
      });
    },
    handleAutoCorrect(item) {
      autoCorrect({
        courseId: this.courseId,
        examId: this.examId,
        // courseId:1000,
        // examId:1,
        questionId: item.questionId,
      }).then(res => {
        if (res.code === 100) {
          alert("成功")
          this.items = this.items.filter((value) => {
            return value.questionId != item.questionId
          })
        } else {
          alert(res.msg)
        }
      }).catch(error => {
        alert(error)
      })
    }
  },
};
</script>

<style scoped></style>
