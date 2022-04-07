<template>
  <div>
    <input type="text" v-model="test.b" @input="handleInput">
  </div>
</template>

<script>
export default {
  name: "test5",
  props: ["value"],
  data() {
    return {
      test: this.value
    }
  },
  methods:{
    handleInput(e){
      console.log(this.test)
      this.$emit('input', this.test)
    }
  }

}
</script>

<style scoped>
</style>