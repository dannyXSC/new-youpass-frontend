<template>
  <div class="overlay">
    <div class="outer-wrap">
      <form>
        <!--   con = Container  for items in the form-->
        <div class="con">
          <!--     Start  header Content  -->
          <header class="head-form">
            <h2>云课堂登录</h2>
            <!--     A welcome message or an explanation of the login form -->
            <br>
            <p>通过用户账号和密码来登录！</p>
          </header>
          <!--     End  header Content  -->
          <br>
          <div class="field-set">
            <!--   user name -->
            <span class="input-item">
           <i class="fa fa-user-circle"></i>
         </span>
            <!--   user name Input-->
            <input class="form-input" id="txt-input" type="text" placeholder="用户账号" v-model="userid" required>
            <br>
            <!--   Password -->
            <span class="input-item">
        <i class="fa fa-key"></i>
       </span>
            <!--   Password Input-->
            <input class="form-input" type="password" placeholder="密码" id="pwd" name="password" v-model="password"
                   required>
            <!--      Show/hide password  -->
            <span>
        <i class="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>
     </span>
            <br>
            <!--        buttons -->
            <!--      button LogIn -->
            <button class="log-in" @click.prevent="handleLogin"> 登录</button>
          </div>
          <!--   other buttons -->
          <div class="other">
            <!--      Forgot Password button-->
<!--            <button class="btn submits frgt-pass" >忘记密码</button>-->
            <!--     Sign Up button -->
            <b-button variant = "success" @click="handleSignUp">注册
              <!--         Sign Up font icon -->
              <i class="fa fa-user-plus" aria-hidden="true"></i>
            </b-button>
            <!--      End Other the Division -->
          </div>
          <!--   End Conrainer  -->
        </div>

        <!-- End Form -->
      </form>
    </div>
  </div>
  <!--  <div style="height: 100vh">-->
  <!--    <div class="h-100 bg-plum-plate bg-animation">-->
  <!--      <div class="d-flex h-100 justify-content-center align-items-center">-->
  <!--        <b-col md="8" class="mx-auto app-login-box">-->
  <!--          <div class="app-logo-inverse mx-auto mb-3"/>-->

  <!--          <div class="modal-dialog w-100 mx-auto">-->
  <!--            <div class="modal-content">-->
  <!--              <div class="modal-body">-->
  <!--                <div class="h5 modal-title text-center">-->
  <!--                  <h4 class="mt-2">-->
  <!--                    <div>Welcome back,</div>-->
  <!--                    <span>Please sign in to your account below.</span>-->
  <!--                  </h4>-->
  <!--                </div>-->
  <!--                <b-form-group id="exampleInputGroup1" label-for="exampleInput1">-->
  <!--                  <b-form-input-->
  <!--                      id="exampleInput1"-->
  <!--                      type="text"-->
  <!--                      required-->
  <!--                      placeholder="Enter account number..."-->
  <!--                      v-model="userid"-->
  <!--                  >-->
  <!--                  </b-form-input>-->
  <!--                </b-form-group>-->
  <!--                <b-form-group id="exampleInputGroup2" label-for="exampleInput2">-->
  <!--                  <b-form-input-->
  <!--                      id="exampleInput2"-->
  <!--                      type="password"-->
  <!--                      required-->
  <!--                      placeholder="Enter password..."-->
  <!--                      v-model="password"-->
  <!--                  >-->
  <!--                  </b-form-input>-->
  <!--                </b-form-group>-->
  <!--                <b-form-checkbox name="check" id="exampleCheck">-->
  <!--                  Keep me logged in-->
  <!--                </b-form-checkbox>-->
  <!--                <div class="divider"/>-->
  <!--                <h6 class="mb-0">-->
  <!--                  No account?-->
  <!--                  <a href="javascript:void(0);" class="text-primary"-->
  <!--                  >-->
  <!--                    <router-link to="/register">Sign up now</router-link>-->
  <!--                  </a-->
  <!--                  >-->
  <!--                </h6>-->
  <!--              </div>-->
  <!--              <div class="modal-footer clearfix">-->
  <!--                <div class="float-left">-->
  <!--                  <b-button variant="warning" size="sl" @click="back"-->
  <!--                  >Back to Home-->
  <!--                  </b-button>-->
  <!--                </div>-->
  <!--                <div class="float-right">-->
  <!--                  <b-button variant="success" size="sl" @click="handleLogin"-->
  <!--                  >Login to YouPass-->
  <!--                  </b-button>-->
  <!--                </div>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--          <div class="text-center text-white opacity-8 mt-3">-->
  <!--            Copyright &copy; YouPass-->
  <!--          </div>-->
  <!--        </b-col>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<script>
import router from "@/router";
import {login} from "@/api";

export default {
  name: "login",
  data() {
    return {
      userid: "",
      password: "",
    };
  },
  mounted() {
    function show() {
      let p = document.getElementById('pwd');
      p.setAttribute('type', 'text');
    }

    function hide() {
      let p = document.getElementById('pwd');
      p.setAttribute('type', 'password');
    }

    let pwShown = 0;

    document.getElementById("eye").addEventListener("click", function () {
      if (pwShown == 0) {
        pwShown = 1;
        show();
      } else {
        pwShown = 0;
        hide();
      }
    }, false);
  },
  methods: {
    handleLogin() {
      let id = Number(this.userid)
      //错误处理
      if (isNaN(id)) {
        // this.userid = "";
        // this.password = "";

        this.$toast.open({
          message: 'Id is not number!',
          type: 'error',
          position: 'top'
        })
      } else {
        //发送请求
        this.$store.dispatch("global/login", {id: this.userid, password: this.password}).then(res => {
          if (res.code === 100) {
            router.push({name: "personInfo"});
          } else {
            this.$toast.open({
              message: res.msg,
              type: 'error',
              position: 'top'
            })
          }
        }).catch(err => {
          // this.userid = "";
          // this.password = "";

          this.$toast.open({
            message: err.message,
            type: 'error',
            position: 'top'
          })
        })
      }
    },
    back() {
      router.push({name: "HomeIndex"});
    },
    handleSignUp() {
      router.push({name: "register"});
    },
  },
};
</script>

<style scoped>

/* Fonts Form Google Font ::- https://fonts.google.com/  -:: */
@import url('https://fonts.googleapis.com/css?family=Abel|Abril+Fatface|Alegreya|Arima+Madurai|Dancing+Script|Dosis|Merriweather|Oleo+Script|Overlock|PT+Serif|Pacifico|Playball|Playfair+Display|Share|Unica+One|Vibur');
/* End Fonts */
/* Start Global rules */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

/* End Global rules */

/* Start body rules */
body {
  margin: 0;
}

.overlay {
  /*padding-top: 2%;*/
  height: 100vh;
  background-image: linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%);
  background-image: linear-gradient(to top, #a8edea 0%, #fed6e3 100%);
  background-attachment: fixed;
  background-repeat: no-repeat;
  font-family: 'Vibur', cursive;
  /*   the main font */
  font-family: 'Abel', sans-serif;
  opacity: .95;
  /* background-image: linear-gradient(to top, #d9afd9 0%, #97d9e1 100%); */
}


/* |||||||||||||||||||||||||||||||||||||||||||||*/
/* //////////////////////////////////////////// */

.outer-wrap {
  /*只有同时为html和body设置height: 100%时，这里的height才生效，
  并且随浏览器窗口变化始终保持和浏览器视窗等高*/
  height: 100%;
  position: relative;
}

.login-panel {
  /*width: 400px;*/
  /*height: 300px;*/
  /*background-color: orange;*/
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: -200px;
}


/* End body rules */

/* Start form  attributes */
form {
  width: 450px;
  min-height: 500px;
  position: absolute;
  height: 500px;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -225px;
  border-radius: 5px;
  /*margin: 0% auto;*/
  box-shadow: 0 9px 50px hsla(20, 67%, 75%, 0.31);
  padding: 2%;
  background-image: linear-gradient(-225deg, #E3FDF5 50%, #FFE6FA 50%);
}

/* form Container */
form .con {
  display: -webkit-flex;
  display: flex;

  -webkit-justify-content: space-around;
  justify-content: space-around;

  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;

  margin: 0 auto;
}

/* the header form form */
header {
  margin: 2% auto 10% auto;
  text-align: center;
}

/* Login title form form */
header h2 {
  font-size: 250%;
  font-family: 'Playfair Display', serif;
  color: #3e403f;
}

/*  A welcome message or an explanation of the login form */
header p {
  letter-spacing: 0.05em;
}


/* //////////////////////////////////////////// */
/* //////////////////////////////////////////// */


.input-item {
  background: #fff;
  color: #333;
  padding: 14.5px 0px 15px 9px;
  border-radius: 5px 0px 0px 5px;
}


/* Show/hide password Font Icon */
#eye {
  background: #fff;
  color: #333;

  margin: 5.9px 0 0 0;
  margin-left: -20px;
  padding: 15px 9px 19px 0px;
  border-radius: 0px 5px 5px 0px;

  float: right;
  position: relative;
  right: 1%;
  top: -.2%;
  z-index: 5;

  cursor: pointer;
}

/* inputs form  */
input[class="form-input"] {
  width: 240px;
  height: 50px;

  margin-top: 2%;
  padding: 15px;

  font-size: 16px;
  font-family: 'Abel', sans-serif;
  color: #5E6472;

  outline: none;
  border: none;

  border-radius: 0px 5px 5px 0px;
  transition: 0.2s linear;

}

input[id="txt-input"] {
  width: 250px;
}

/* focus  */
input:focus {
  transform: translateX(-2px);
  border-radius: 5px;
}

/* //////////////////////////////////////////// */
/* //////////////////////////////////////////// */

/* input[type="text"] {min-width: 250px;} */
/* buttons  */
button {
  display: inline-block;
  color: #252537;

  width: 280px;
  height: 50px;

  padding: 0 20px;
  background: #fff;
  border-radius: 5px;

  outline: none;
  border: none;

  cursor: pointer;
  text-align: center;
  transition: all 0.2s linear;

  margin: 7% auto;
  letter-spacing: 0.05em;
}

/* Submits */
.submits {
  width: 48%;
  display: inline-block;
  float: left;
  margin-left: 2%;
}

/*       Forgot Password button FAF3DD  */
.frgt-pass {
  background: transparent;
}

/*     Sign Up button  */
.sign-up {
  background: #B8F2E6;
}


/* buttons hover */
button:hover {
  transform: translatey(3px);
  box-shadow: none;
}

/* buttons hover Animation */
button:hover {
  animation: ani9 0.4s ease-in-out infinite alternate;
}

@keyframes ani9 {
  0% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(5px);
  }
}
</style>
