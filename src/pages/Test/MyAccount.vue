<template>
  <div>
      <PersonInfoCard></PersonInfoCard>
    <br/>
      <HomeWorkList></HomeWorkList>
  </div>

</template>

<script>
import HomeWorkList from "@/pages/Test/HomeWorkList";
import PersonInfoCard from "@/pages/Test/PersonInfoCard";
export default {
  name: "MyAccount",
  components: {PersonInfoCard, HomeWorkList},
}
</script>

<style scoped>

</style>
