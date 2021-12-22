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
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
            </b-tab>
            <b-tab title="图表">
              <div v-for="bar in bars" class="row mb-1">
                <div class="col-sm-2">{{ bar.variant }}:</div>
                <div class="col-sm-10 pt-1">
                  <b-progress
                    :value="bar.value"
                    :variant="bar.variant"
                    :key="bar.variant"
                  ></b-progress>
                </div>
              </div>
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
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

export default {
  components: { MyList, PageTitle },
  data() {
    return {
      heading: "Standard Buttons",
      subheading:
        "Wide selection of buttons that feature different styles for backgrounds, borders and hover options!",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",

      fields: ["Course_Id", "Course_Name"],
      items: [
        {
          isActive: true,
          age: 40,
          Course_Id: "Dickerson",
          Course_Name: "Macdonald",
          _showDetails: false,
          style: "cursor: pointer;",
        },
        {
          isActive: false,
          age: 21,
          Course_Id: "Larsen",
          Course_Name: "Shaw",
          _showDetails: false,
        },
        {
          isActive: false,
          age: 89,
          Course_Id: "Geneva",
          Course_Name: "Wilson",
          _showDetails: false,
        },
        {
          isActive: true,
          age: 38,
          Course_Id: "Jami",
          Course_Name: "Carney",
          _showDetails: false,
        },
      ],
      showChart: false,
      bars: [
        { variant: "success", value: 75 },
        { variant: "info", value: 75 },
        { variant: "warning", value: 75 },
        { variant: "danger", value: 75 },
        { variant: "primary", value: 75 },
        { variant: "secondary", value: 75 },
        { variant: "dark", value: 75 },
        { variant: "alternate", value: 75 },
        { variant: "focus", value: 75 },
      ],
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
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.bars.forEach((bar) => (bar.value = 25 + Math.random() * 75));
    }, 2000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped></style>
