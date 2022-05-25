<template>
  <div
      class="app-sidebar sidebar-shadow"
      @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
      @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
  >
    <div class="app-header__logo">
      <div class="logo-src"/>
      <div class="header__pane ml-auto">
        <button
            type="button"
            class="hamburger close-sidebar-btn hamburger--elastic"
            v-bind:class="{ 'is-active': isOpen }"
            @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <div
        class="app-sidebar-content"
        v-if="this.$store.state.global.accountType == 1"
    >
      <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
        <sidebar-menu showOneChild :menu="StudentMenu"/>
      </VuePerfectScrollbar>
    </div>
    <div
        class="app-sidebar-content"
        v-else
    >
      <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
        <sidebar-menu showOneChild :menu="TeacherMenu"/>
      </VuePerfectScrollbar>
    </div>
  </div>
</template>

<script>
import {SidebarMenu} from "vue-sidebar-menu";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    SidebarMenu,
    VuePerfectScrollbar,
  },
  data() {
    return {
      isOpen: true,
      sidebarActive: false,

      StudentMenu: [
        {
          header: true,
          title: "导航栏",
        },
        {
          title: "基本功能栏",
          icon: "pe-7s-rocket",
          child: [
            {
              href: "/dashboard/personInfo",
              title: "查看个人信息",
            },
            // {
            //   href: "/dashboard",
            //   title: "待办事项",
            // },
            {
              href: "/dashboard/course",
              title: "查看我的课程",
            },
            {
              href: "/dashboard/homeworkListOfStudent",
              title: "查看我的作业",
            },
            {
              href: "/dashboard/message",
              title: "查看消息",
            },
            {
              href: "/dashboard/pick",
              title: "搜索课程",
            },
          ],
        },
        // {
        //   title: "Pages",
        //   icon: "pe-7s-browser",
        //   child: [
        //     {
        //       href: "/pages/login-boxed",
        //       title: "Login Boxed",
        //     },
        //     {
        //       href: "/pages/register-boxed",
        //       title: "Register Boxed",
        //     },
        //     {
        //       href: "/pages/forgot-password-boxed",
        //       title: "Forgot Password Boxed",
        //     },
        //   ],
        // },
        // {
        //   header: true,
        //   title: "UI Components",
        // },
        // {
        //   icon: "pe-7s-diamond",
        //   title: "Elements",
        //   child: [
        //     {
        //       title: "Buttons",
        //       child: [
        //         {
        //           title: "Standard",
        //           href: "/elements/buttons-standard",
        //         },
        //       ],
        //     },
        //     {
        //       title: "Dropdowns",
        //       href: "/elements/dropdowns",
        //     },
        //     {
        //       title: "Icons",
        //       href: "/elements/icons",
        //     },
        //     {
        //       title: "Badges",
        //       href: "/elements/badges-labels",
        //     },
        //     {
        //       title: "Cards",
        //       href: "/elements/cards",
        //     },
        //     {
        //       title: "List Groups",
        //       href: "/elements/list-group",
        //     },
        //     {
        //       title: "Timeline",
        //       href: "/elements/timelines",
        //     },
        //     {
        //       title: "Utilities",
        //       href: "/elements/utilities",
        //     },
        //   ],
        // },
        // {
        //   icon: "pe-7s-car",
        //   title: "Components",
        //   child: [
        //     {
        //       title: "Tabs",
        //       href: "/components/tabs",
        //     },
        //     {
        //       title: "Accordions",
        //       href: "/components/accordions",
        //     },
        //     {
        //       title: "Modals",
        //       href: "/components/modals",
        //     },
        //     {
        //       title: "Progress Bar",
        //       href: "/components/progress-bar",
        //     },
        //     {
        //       title: "Tooltips & Popovers",
        //       href: "/components/tooltips-popovers",
        //     },
        //     {
        //       title: "Carousel",
        //       href: "/components/carousel",
        //     },
        //     {
        //       title: "Pagination",
        //       href: "/components/pagination",
        //     },
        //     {
        //       title: "Maps",
        //       href: "/components/maps",
        //     },
        //   ],
        // },
        // {
        //   icon: "pe-7s-display2",
        //   title: "Tables",
        //   child: [
        //     {
        //       title: "Regular Tables",
        //       href: "/tables/regular-tables",
        //     },
        //   ],
        // },
        // {
        //   header: true,
        //   title: "Dashboard Boxes",
        // },
        // {
        //   icon: "pe-7s-graph2",
        //   title: "Chart Boxes",
        //   href: "/widgets/chart-boxes-3",
        // },
        // {
        //   header: true,
        //   title: "Forms",
        // },
        // {
        //   icon: "pe-7s-light",
        //   title: "Elements",
        //   child: [
        //     {
        //       title: "Controls",
        //       href: "/forms/controls",
        //     },
        //     {
        //       title: "Layouts",
        //       href: "/forms/layouts",
        //     },
        //   ],
        // },
        // {
        //   header: true,
        //   title: "Charts",
        // },
        // {
        //   icon: "pe-7s-graph2",
        //   title: "ChartJS",
        //   href: "/charts/chartjs",
        // },
      ],
      TeacherMenu: [
        {
          header: true,
          title: "导航栏",
        },
        {
          title: "基本功能栏",
          icon: "pe-7s-rocket",
          child: [
            {
              href: "/dashboard/personInfo",
              title: "查看个人信息",
            },
            // {
            //   href: "/dashboard/todo",
            //   title: "待办事项",
            // },
            {
              href: "/dashboard/course",
              title: "查看我的课程",
            },
            {
              href: "/dashboard/addQuestion",
              title: "上传题目"
            }
          ],
        },
      ],
      collapsed: true,

      windowWidth: 0,
    };
  },
  props: {
    sidebarbg: String,
  },
  methods: {
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1350") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
};
</script>
