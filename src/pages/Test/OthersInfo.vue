<template>
    <b-card border-variant="success">
      <b-row>
        <b-col>
      <b-card-img-lazy left src="https://picsum.photos/125/125/?image=58" height="200"
                       width="200"></b-card-img-lazy>
        </b-col>
        <b-col cols="8">
          <div class="nameHeader">{{ userInfo.name }}</div>
          <b-card-text>邮箱:{{ userInfo.email }}</b-card-text>
          <b-card-text>家庭住址:{{ userInfo.location }}</b-card-text>
        </b-col>
      </b-row>
      <b-row>
        <b-img v-bind="mainProps" alt="Transparent image"></b-img>
      </b-row>
    </b-card>
</template>

<script>
import {number} from "echarts";
import {getHisInfo} from "@/api";
export default {
  name: "OthersInfo",
  props:{
    userId:number
  },
  data(){
    return{
      userInfo:{},
      mainProps: { blank: true, width: 75, height: 350, class: 'm1' }
    }
  },
  mounted() {
    getHisInfo(this.userId).then(res=>{
      console.log(this.userId)
      this.userInfo=res.data
    }).catch(e=>{
      console.log(e)
    })
  }
}
</script>

<style scoped>
.nameHeader{
  font-size: 3em;
  margin-bottom: 1em;
}
</style>
