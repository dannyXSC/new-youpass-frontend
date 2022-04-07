<template>
  <div>
    <input type="checkbox" checked data-toggle="toggle" data-onstyle="danger">
<!--    <bootstrap-toggle v-model="checked" :options="{ on: 'Yes', off: 'No' }" :disabled="false" datatype="btn-danger"/>-->
  </div>
</template>

<script>
import BootstrapToggle from 'vue-bootstrap-toggle'
export default {
  name: "test5",
  components: { BootstrapToggle },
  data() {
    return {
      checked: true
    }
  }
}
</script>

<style scoped>
</style>