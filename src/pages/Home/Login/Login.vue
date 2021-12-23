<template>
  <section class="login" id="login">
    <div class="title-container">
      <h2 class="title">Log In</h2>
    </div>
    <div class="info-container">
      <button>
        <router-link active-class="active" to="/login">GO</router-link>
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style scoped>
.login {
  background: #111;
  background-size: cover;
}
.login .title::after {
  content: "let's go";
  background: #111;
}
.login .info-container {
  /*background: crimson;*/
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  display: inline-block;
  background: crimson;
  color: #fff;
  font-size: 25px;
  height: 130px;
  width: 200px;
  border-radius: 20%;
  transition: all 0.3s ease;
}

button:hover {
  color: crimson;
  background:#fff;
}
</style>
