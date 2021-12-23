
<template>
  <div>
    <Navbar/>
    <Home/>
    <About/>
    <Login/>
    <Register/>
    </div>
</template>

<script>
import Navbar from "@/pages/Home/Navbar/Navbar";
import Home from "@/pages/Home/Home/Home";
import Typed from "typed.js";
import About from "@/pages/Home/About/About";
import Login from "@/pages/Home/Login/Login";
import Register from "@/pages/Home/Register/Register";

export default {
  name: "index",
  components: {Register, Login, About, Home, Navbar},
  mounted() {
    new Typed('.type1', {
      strings: ["考神", "学霸", "学神", "学王", "天才", "魁首"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
    new Typed('.type2', {
      strings: ["考神", "学霸", "学神", "学王", "天才", "魁首"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }
}
</script>

<style>
/* section styling */
section {
  height: 80vh;
  padding: 70px 0;
}
section .title-container{
  height: 20%;
}
section .info-container{
  height: 80%;
  padding: 0 10%;
}
section .title-container .title {
  position: relative;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  padding-bottom: 20px;
  /*margin-bottom: 50px;*/
  font-family: "Ubuntu", "Ma Shan Zheng", sans-serif;
}
section .title-container .title::before {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 50%;
  width: 330px;
  height: 3px;
  background-color: #111;
  transform: translateX(-50%);
}
section .title-container .title::after {
  position: absolute;
  bottom: -10px;
  left: 50%;
  font-size: 20px;
  color: crimson;
  padding: 2px;
  background: #fff;
  transform: translateX(-50%);
}

.about .signup,
footer {
  font-family: "Poppins", "ZCOOL KuaiLe", sans-serif;
}
.login,
.team {
  color: #fff;
  background: #111;
}
.login .title-container .title::before,
.team .title-container .title::before {
  background: #fff;
}
</style>