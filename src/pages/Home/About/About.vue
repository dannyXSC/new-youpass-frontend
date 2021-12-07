<template>
  <section class="about" id="about">
    <div class="container">
      <div class="col header">
        <h2 class="title">About our project</h2>
      </div>
      <div class="row">
        <div class="col-5">
          <img src="@/assets/img/about.jpg" alt="">
        </div>
        <div class="col-7">
          1312
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "About"
}
</script>

<style scoped>
.about {
  height: 100vh;
  font-family: "Ubuntu", "Ma Shan Zheng", cursive, sans-serif;
}

.container{
  height: 100%;
}

.about .title::after {
  content: "what it's about";
}

.about .container img {
  height: 100%;
  width: 100%;
  /*object-fit: cover;*/
  border-radius: 6px;
}
</style>