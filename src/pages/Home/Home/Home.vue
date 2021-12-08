<template>
  <section class="home" id="home">
    <div class="container d-flex align-items-center justify-content-center text-center">
      <div class="w-50">
        <div class="text1">Fighting,</div>
        <div class="text2">
          成为
          <span class="type2"></span>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <button>Join us</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  mounted() {
  }
}
</script>

<style scoped>
.home {
  display: flex;
  background: url("~@/assets/img/background.jpg") no-repeat center;
  background-size: cover;
  height: 100vh;
  color: #fff;
  font-family: "Ubuntu", "Ma Shan Zheng", cursive, sans-serif;
}

.home div {
  margin-top: 10px;
}

.home .text1 {
  font-size: 40px;
  margin: 5px 0;
}

.home .text2 {
  font-size: 65px;
}

.home .text2 span{
  color: crimson;
}

.home button {
  display: inline-block;
  background: crimson;
  color: #fff;
  font-size: 25px;
  padding: 10px 20px;
  border-radius: 6px;
  border: 2px solid crimson;
  transition: all 0.3s ease;
}

.home button:hover {
  color: crimson;
  background: rgba(255, 255, 255, 0.5);
}
</style>