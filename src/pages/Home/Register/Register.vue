<template>
  <section class="register" id="register">
    <div class="title-container">
      <h2 class="title">Sign Up</h2>
    </div>
    <div class="info-container">
      <div class="card">
        <a class="box"
        ><i class="fas fa-user-alt"></i>
          <div class="text">你是学生</div>
        </a>
      </div>

      <div class="card">
        <a class="box"
        ><i class="fas fa-user-graduate"></i>
          <div class="text">你是教师</div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Register"
}
</script>

<style scoped>
.register .title::after {
  background: #fff;
  content: "join us";
}

.info-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.register .info-container .card {
  width: calc(33% - 20px);
  background: #222;
  text-align: center;
  border-radius: 10px;
  padding: 20px 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: auto 10px;
}
.register .info-container .card:hover {
  background: crimson;
  transform: scale(1.05);
}
.register .info-container .card i {
  font-size: 50px;
  color: crimson;
}
.register .info-container .card:hover i {
  color: #fff;
}
.register .info-container .card .box {
  color: #fff;
  font-family: "Poppins", "ZCOOL KuaiLe", sans-serif;
  transition: all 0.3s ease;
}
.register .info-container .card .box:hover {
  transform: scale(1.05);
}
.register .info-container .card .text {
  font-size: 25px;
  font-weight: 500;
  margin: 10px 0 7px 0;
}
</style>