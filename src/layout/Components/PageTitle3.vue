<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4 text-center">
        <div class="logo">
          <a href="#">You<span>Pass</span></a>
        </div>
      </div>
      <div class="col-7 offset-1 d-flex align-items-center">
        <div class="container">
          <div class="row">
            <li class="col"><a href="#home">Home</a></li>
            <li class="col"><a href="#about">About</a></li>
            <li class="col"><a href="#signup">SignUp</a></li>
            <li class="col"><a href="#login">LogIn</a></li>
            <li class="col"><a href="#team">Team</a></li>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {debounce} from "lodash";

export default {
  name: "TestNavbar",
  methods: {
    handleScroll() {
      if (window.scrollY > 20) {
        this.isTop = false;
      } else {
        this.isTop = true;
      }
    }
  },
  mounted() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleScroll);
  },

  beforeDestroy() {
    // I switched the example from `destroyed` to `beforeDestroy`
    // to exercise your mind a bit. This lifecycle method works too.
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>

<style scoped>
.container-fluid {
  font-family: "Ubuntu", sans-serif;
  position: fixed;
  z-index: 3;
  background: #ABB2B9;
  height: 60px;
}



.logo {
  transition: all 0.3s ease;
}

.logo a {
  font-size: 50px;
  color: #fff;
  font-weight: 600;
}

.logo a span {
  color: crimson;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.2);
}

.logo a:hover {
  color: crimson;
}

.sticky .logo a:hover {
  color: #fff;
}

.sticky .logo a span {
  color: #fff;
}

li {
  list-style: none;
  display: inline-block;
  transition: all 0.3s ease;
  text-align: center;
}

li:hover {
  transform: scale(1.2);
}

li a {
  color: #fff;
  font-size: 25px;
  font-weight: 500;
}

li a:hover {
  color: crimson;
}

.sticky li a:hover {
  color: #fff;
}
</style>
