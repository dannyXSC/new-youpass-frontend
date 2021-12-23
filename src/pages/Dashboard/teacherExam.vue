<template>
  <div>
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
        :breadcrumb-item="breadcrumbItem"
    ></page-title>

<!--    <my-list title="课程信息" :items="items" :fields="fields">-->
<!--      <template slot-scope="row">-->
<!--        <b-card class="mb-3 nav-justified" no-body>-->
<!--          <b-tabs pills card>-->
<!--            <b-tab title="其他功能" active>-->
<!--              <b-button class="mr-2 mb-2" variant="primary"-->
<!--                        @click="handleManualCorrect(row.row.item)">-->
<!--                手动批改-->
<!--              </b-button >-->
<!--              <b-button class="mr-2 mb-2" variant="info">-->
<!--                自动批改-->
<!--              </b-button >-->
<!--            </b-tab>-->
<!--          </b-tabs>-->
<!--        </b-card>-->
<!--      </template>-->
<!--    </my-list>-->
  </div>
</template>

<script>
import myList from "@/components/myList";
import PageTitle from "@/layout/Components/PageTitle.vue";

export default {
  name: "teacherExam",
  components:{
    myList,
    PageTitle
  },
  props:{
    courseId:Number
  },
  data(){
    return {
      heading: "考试管理",
      subheading:
          "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      breadcrumbItem: [
        {
          text: "课程信息",
          href: "#/dashboard/course",
        },
        {
          text: "考试管理",
          active: true,
        },
      ],
    }
  }
}
</script>

<style scoped>

</style>