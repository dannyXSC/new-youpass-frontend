<template>
  <div>
    <page-title
        :heading="heading"
        :subheading="subheading"
        :icon="icon"
        NoBar
    ></page-title>
    <PersonInfoCard></PersonInfoCard>
    <br/>
    <b-row>
      <b-col  v-if="getType">
        <HomeWorkList></HomeWorkList>
      </b-col>
      <b-col>
        <b-card border-variant="warning">  <todo></todo> </b-card>

      </b-col>
    </b-row>
  </div>

</template>

<script>
import HomeWorkList from "@/pages/Test/HomeWorkList";
import PersonInfoCard from "@/pages/Test/PersonInfoCard";
import todo from "@/pages/Dashboard/todo";
import PageTitle from "@/layout/Components/PageTitle.vue";
export default {
  name: "personInfo",
  components: {PersonInfoCard, HomeWorkList, todo, PageTitle},
  data(){
    return{
      heading: "个人信息",
      subheading:
          "这里记录着你的全部信息",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
    }
  },
  computed:{
    getType(){
      return this.$store.state.global.accountType === 1;
    }
  }
}
</script>

<style scoped>

</style>
