<template>
  <div>
    <PersonInfoCard></PersonInfoCard>
    <br/>
    <b-row>
      <b-col>
        <HomeWorkList></HomeWorkList>
      </b-col>
      <b-col>
        <Todo></Todo>
      </b-col>
    </b-row>
  </div>

</template>

<script>
import HomeWorkList from "@/pages/Test/HomeWorkList";
import PersonInfoCard from "@/pages/Test/PersonInfoCard";
import Todo from "@/pages/Test/Todo";
export default {
  name: "personInfo",
  components: {PersonInfoCard, HomeWorkList, Todo},
}
</script>

<style scoped>

</style>
