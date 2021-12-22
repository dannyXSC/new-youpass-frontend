<template>
  <div style="height: 100vh">
    <div class="h-100 bg-premium-dark">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />

          <div class="modal-dialog w-100">
            <div class="modal-content">
              <div class="modal-body">
                <h5 class="modal-title">
                  <h4 class="mt-2">
                    <div>Welcome,</div>
                    <span
                      >It only takes a
                      <span class="text-success">few seconds</span>
                      to create your account</span
                    >
                  </h4>
                </h5>
                <div class="divider" />
                <b-form-group
                  id="exampleInputGroup1"
                  label-for="exampleInput1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    v-model="email"
                    id="exampleInput1"
                    type="email"
                    required
                    placeholder="Enter email..."
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
                    placeholder="Enter your name..."
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
                        placeholder="Enter password..."
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
                        placeholder="Repeat password..."
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
                  id="exampleCheck"
                  v-model="isChecked"
                >
                  Accept our
                  <a href="javascript:void(0);">Terms and Conditions</a>.
                </b-form-checkbox>
                <p v-if="isChecked === false" style="color: red">
                  请勾选此协议！
                </p>
                <div class="divider" />
                <h6 class="mb-0">
                  Already have an account?
                  <a href="javascript:void(0);" class="text-primary">Sign in</a>
                  |
                  <a href="javascript:void(0);" class="text-primary"
                    >Recover Password</a
                  >
                </h6>
              </div>
              <div class="modal-footer d-block text-center">
                <b-button
                  @click="register()"
                  color="primary"
                  class="btn-wide btn-pill btn-shadow btn-hover-shine"
                  size="lg"
                  >Create Account
                </b-button>
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
export default {
  name: "Register",
  methods: {
    register() {
      if (
        this.password1 == this.password2 &&
        this.isChecked == true &&
        this.isFormated == true &&
        this.email != ""
      ) {
        this.$store.dispatch("global/register", {
          email: this.email,
          password: this.password1,
          name: this.name,
          type: this.$store.state.global.type,
        });
      }
    },
  },
  data() {
    return {
      email: "",
      password1: "",
      password2: "",
      name: "",
      type: "",
      isSame: true,
      isChecked: false,
      isFormated: true,
    };
  },
  watch: {
    password2: {
      handler(newValue) {
        if (newValue != this.password1) {
          this.isSame = false;
        } else {
          this.isSame = true;
        }
      },
    },
    password1: {
      handler(newValue) {
        if (newValue != this.password2) {
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
