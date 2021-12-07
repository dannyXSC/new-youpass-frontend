<template>
  <div>
    <button @click="handleClick">click me</button>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    handleClick() {
      this.$toast.open({
        message: "hello",
        type: "info",
        position: "top",
        duration: 500,
        queue: false
      })
    }
  }
}
</script>

<style scoped>

</style>