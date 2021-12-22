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
            <b-tab title="课程信息" active>
              <li class="list-group-item">
                <div class="widget-content p-0">
                  <div class="widget-content-wrapper">

                  </div>
                </div>
              </li>
            </b-tab>
            <b-tab title="题目信息" active>

            </b-tab>
            <b-tab title="其他功能">
              <template
                  v-for="variant in [
                  'primary',
                  'secondary',
                  'success',
                  'info',
                  'warning',
                  'danger',
                  'focus',
                  'alternate',
                  'light',
                  'dark',
                  'link',
                ]"
              >
                <b-button class="mr-2 mb-2" :variant="variant" :key="variant">
                  {{ variant }}
                </b-button>
              </template>
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

export default {
  name: "correctedQuestion",
  components: {
    myList, PageTitle
  },
  props: {
    courseId: Number,
    examId: Number
  },
  mounted() {

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
      fields: ["题目id", "题干"],
      items: []
    }
  }
}
</script>

<style scoped>

</style>