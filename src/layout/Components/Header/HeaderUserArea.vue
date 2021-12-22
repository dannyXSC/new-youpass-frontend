<template>
  <div class="d-flex">
    <div class="header-btn-lg pr-0">
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <b-dropdown
              toggle-class="p-0 mr-2"
              menu-class="dropdown-menu-lg"
              variant="link"
              right
            >
              <span slot="button-content">
                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <img
                    width="40"
                    class="rounded-circle"
                    src="@/assets/images/avatars/1.jpg"
                    alt=""
                  />
                </div>
              </span>
              <button
                type="button"
                tabindex="0"
                class="dropdown-item"
                @click="checkPersonalInfo"
              >
                Check Personal Info
              </button>
              <div tabindex="-1" class="dropdown-divider"></div>
              <button
                type="button"
                tabindex="0"
                class="dropdown-item"
                @click="logout"
              >
                Log out
              </button>
            </b-dropdown>
          </div>
          <div class="widget-content-left ml-3 header-user-info">
            <div class="widget-heading">{{ name }}</div>
            <div class="widget-subheading">{{ id }}</div>
          </div>
          <div class="widget-content-right header-user-info ml-3">
            <!-- <b-btn
              v-b-tooltip.hover
              title="Tooltip Example"
              class="btn-shadow p-1"
              size="sm"
              variant="info"
            >
              <font-awesome-icon icon="calendar-alt" class="mr-1 ml-1" />
            </b-btn> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import router from "@/router";

library.add(
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
);

export default {
  components: {
    VuePerfectScrollbar,
    "font-awesome-icon": FontAwesomeIcon,
  },
  data() {
    return {
      name: this.$store.state.global.name,
      id: this.$store.state.global.id,
    };
  },
  mounted() {
    // console.log("in user", this.$store.state);
    // console.log("接下来调用赋值函数");
    this.setProperty();
  },

  methods: {
    setProperty() {
      //   console.log("调用赋值函数");
      this.name = this.$store.state.global.name;
      this.id = this.$store.state.global.id;
      //   console.log("in user", this.$store.state.global.name);
      //   console.log("in user", this.name);
    },
    logout() {
      this.$store.dispatch("global/logout");
    },
    checkPersonalInfo() {
      router.push("/personInfo");
    },
  },
};
</script>
