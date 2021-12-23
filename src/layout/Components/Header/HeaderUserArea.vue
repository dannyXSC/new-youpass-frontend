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
                    :src="ImageURL"
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
                查看个人信息
              </button>
              <!-- <button type="button" tabindex="0" class="dropdown-item">
                修改头像
                <input
                  id="categoryPic"
                  accept="image/*"
                  type="file"
                  name="image"
                  @change="getFile($event)"
                />
              </button> -->
              <div tabindex="-1" class="dropdown-divider"></div>
              <button
                type="button"
                tabindex="0"
                class="dropdown-item"
                @click="logout"
              >
                退出登录
              </button>
            </b-dropdown>
          </div>
          <div class="widget-content-left ml-3 header-user-info">
            <div class="widget-heading" v-if="name">{{ name }}</div>
            <div class="widget-subheading" v-if="id">{{ id }}</div>
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
      ImageURL: "http://localhost:5050/api/account/getImage/",
      file: "",
    };
  },
  computed: {
    name() {
      return this.$store.state.global.name;
    },
    id() {
      return this.$store.state.global.id;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("global/logout");
    },
    checkPersonalInfo() {
      router.push("/personInfo");
    },

    update: function () {
      var url = this.uri + "/" + this.bean.id;
      var formdata = new FormData();

      formdata.append("name", this.bean.name);
      formdata.append("image", this.file);

      axios.put(url, formdata).then(function (response) {
        location.href = vue.listURL;
      });
    },
    getFile: function (event) {
      this.file = event.target.files[0];
      console.log(this.file);
    },
  },
};
</script>
