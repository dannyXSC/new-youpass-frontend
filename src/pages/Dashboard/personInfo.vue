<template>
  <div>
    <page-title
      :heading="heading"
      :subheading="subheading"
      :icon="icon"
    ></page-title>
    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="main-card mb-3 card">
            <div class="card-body">
              <h5 class="card-title">个人基本信息</h5>
              <ul class="list-group">
                <li class="list-group-item">
                  <h5>姓名：{{ personInfo.name }}</h5>
                </li>
                <li class="list-group-item">
                  <h5>学号：{{ personInfo.id }}</h5>
                </li>
                <li class="list-group-item">
                  <h5>邮箱：{{ personInfo.email }}</h5>
                </li>
                <li class="list-group-item">
                  <h5>家庭住址：{{ personInfo.location }}</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../layout/Components/PageTitle.vue";

// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrashAlt, faCheck);

export default {
  components: {
    PageTitle,
    "font-awesome-icon": FontAwesomeIcon,
  },
  data() {
    return {
      heading: "我的个人信息",
      subheading: "",
      icon: "pe-7s-paint icon-gradient bg-sunny-morning",
      personInfo: {
        id: this.$store.state.global.id,
        name: this.$store.state.global.name,
        email: this.$store.state.global.email,
        location: this.$store.state.global.location,
      },
    };
  },
  methods: {},
};
</script>
