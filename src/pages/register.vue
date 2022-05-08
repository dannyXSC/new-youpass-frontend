<template>
  <div style="height: 100vh">
    <div class="h-100 bg-premium-dark">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3"/>

          <div class="modal-dialog w-100">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="modal-title">
                  <h4 class="mt-2">
                    <div>欢迎来到TJ-Cloud！</div>
                    <br>
                    <span
                    >创建用户只需要花费
                      <span class="text-success">几秒钟时间</span>
                      </span
                    >
                  </h4>
                </h5>
                <div class="divider"/>
                <b-form-group
                    id="exampleInputGroup1"
                    label-for="exampleInput1"
                    description="我们不会将您的邮箱泄露给任何其他人"
                >
                  <b-form-input
                      v-model="email"
                      id="exampleInput1"
                      type="email"
                      required
                      placeholder="请输入您的邮箱..."
                  >
                  </b-form-input>
                </b-form-group>
                <p v-show="isFormated == false" style="color: red">
                  邮箱格式不正确！
                </p>

                <b-form-group
                    id="exampleInputGroup12"
                    label-for="exampleInput12"
                >
                  <b-form-input
                      v-model="name"
                      id="exampleInput12"
                      type="text"
                      required
                      placeholder="请输入姓名"
                  >
                  </b-form-input>
                </b-form-group>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group
                        id="exampleInputGroup2"
                        label-for="exampleInput2"
                    >
                      <b-form-input
                          v-model="password1"
                          id="exampleInput2"
                          type="password"
                          required
                          placeholder="输入密码..."
                      >
                      </b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group
                        id="exampleInputGroup2"
                        label-for="exampleInput2"
                    >
                      <b-form-input
                          v-model="password2"
                          id="exampleInput3"
                          type="password"
                          required
                          placeholder="请再次输入密码..."
                      >
                      </b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <p v-show="isSame == false" style="color: red">
                  *两遍输入的密码不一致！
                </p>

                <b-form-checkbox
                    name="check"
                    id="isTeacher"
                    v-model="type"
                    class="mb-3"
                    :value="0"
                    :unchecked-value="1"
                >
                  您是否是老师
                </b-form-checkbox>


                <!--                <div class="divider"/>-->
                <!--                <h6 class="mb-0">-->
                <!--                  Already have an account?-->
                <!--                  <a href="javascript:void(0);" class="text-primary">-->
                <!--                    <router-link to="/login">Login now</router-link>-->
                <!--                  </a-->
                <!--                  >-->
                <!--                </h6>-->
              </div>
              <div class="modal-footer clearfix">
                <div class="float-left">
                  <b-button variant="warning" size="sl" @click="back()"
                  >前往登录
                  </b-button>
                </div>
                <div class="float-left">
                  <b-button variant="success" size="sl" @click="register()"
                  >创建账号
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center text-white opacity-8 mt-3">
            Copyright &copy; DannyXSC 2021
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>
<script>
import router from "@/router";
import {signUp} from "@/api";
import BootstrapToggle from 'vue-bootstrap-toggle'

export default {
  name: "Register",
  components: {BootstrapToggle},
  methods: {
    register() {
      console.log(123231231)
      if (
          this.password1 === this.password2 &&
          this.isFormated === true &&
          this.email !== ""
      ) {
        signUp({
          email: this.email,
          password: this.password1,
          name: this.name,
          //TODO: 需要选择是老师还是学生
          type: this.type,
        }).then(res => {
console.log(res)
          if (res.code === 100) {
            alert("注册成功！您的id为：" + res.data)
            router.push({name: "login"})
          } else {
            this.$toast.error(res.msg)
          }
        }).catch(err => {
          this.$toast.error(err)
        })
      }
    },
    back() {
      router.push({name: "login"});
    },
  },
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      name: "",
      type: 0,
      isSame: true,
      isChecked: false,
      isFormated: true,
    };
  },
  watch: {
    password2: {
      handler(newValue) {
        if (newValue !== this.password1) {
          this.isSame = false;
        } else {
          this.isSame = true;
        }
      },
    },
    password1: {
      handler(newValue) {
        if (newValue !== this.password2) {
          this.isSame = false;
        } else {
          this.isSame = true;
        }
      },
    },
    isChecked() {
      console.log("ischecked:" + this.isChecked);
    },
    email(newValue) {
      var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (reg.test(newValue) || newValue == "") {
        this.isFormated = true;
      } else {
        this.isFormated = false;
      }
    },
  },
};
</script>
