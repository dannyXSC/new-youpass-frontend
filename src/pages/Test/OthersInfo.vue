<template>
  <b-card border-variant="success">
    <b-row>
      <b-col>
        <b-card-img-lazy
            left
            :src="userInfo.avater"
            height="200"
            width="200"
        ></b-card-img-lazy>
      </b-col>
      <b-col cols="8">
        <b-row>
          <div class="nameHeader">{{ userInfo.name }}</div>
        </b-row>
        <b-row>
          <b-col>
            <b-card-text>性别:{{ userInfo.sex }}</b-card-text>
            <b-card-text>联系电话:{{ userInfo.tel }}</b-card-text>
          </b-col>
          <b-col>
            <b-card-text>学校:{{ userInfo.school }}</b-card-text>
            <b-card-text>邮箱:{{ userInfo.email }}</b-card-text>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { number } from "echarts";
import { getHisInfo } from "@/api";
export default {
  name: "OthersInfo",
  props: {
    userId: number,
  },
  data() {
    return {
      userInfo: {},
      mainProps: { blank: true, width: 75, height: 350, class: "m1" },
    };
  },
  mounted() {
    getHisInfo(this.userId)
      .then((res) => {
        if(res.code===100) {
          this.userInfo = res.data[0];
        }
        else{
          this.$bvToast.toast("获取该用户信息失败", {
            title: "提示",
            variant: "danger",
            solid: true,
            autoHideDelay: 2000
          });
        }
      })
  },
};
</script>

<style scoped>
.nameHeader {
  font-size: 2.5em;
  margin-bottom: 0.5em;
  margin-top: 0.5em;
}
</style>
