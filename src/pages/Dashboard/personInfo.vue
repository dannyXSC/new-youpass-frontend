<template>
  <div>
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
export default {
  name: "personInfo",
  components: {PersonInfoCard, HomeWorkList, todo},
  computed:{
    getType(){
      return this.$store.state.global.accountType === 1;
    }
  }
}
</script>

<style scoped>

</style>
