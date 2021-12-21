<template>
  <div style="height: 100vh">
    <div class="h-100 bg-plum-plate bg-animation">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <b-col md="8" class="mx-auto app-login-box">
          <div class="app-logo-inverse mx-auto mb-3" />

          <div class="modal-dialog w-100 mx-auto">
            <div class="modal-content">
              <div class="modal-body">
                <div class="h5 modal-title text-center">
                  <h4 class="mt-2">
                    <div>Welcome back,</div>
                    <span>Please sign in to your account below.</span>
                  </h4>
                </div>
                <b-form-group id="exampleInputGroup1" label-for="exampleInput1">
                  <b-form-input
                    id="exampleInput1"
                    type="text"
                    required
                    placeholder="Enter account number..."
                    v-model="userid"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2" label-for="exampleInput2">
                  <b-form-input
                    id="exampleInput2"
                    type="password"
                    required
                    placeholder="Enter password..."
                    v-model="password"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-checkbox name="check" id="exampleCheck">
                  Keep me logged in
                </b-form-checkbox>
                <div class="divider" />
                <h6 class="mb-0">
                  No account?
                  <a href="javascript:void(0);" class="text-primary"
                    >Sign up now</a
                  >
                </h6>
              </div>
              <div class="modal-footer clearfix">
                <div class="float-right">
                  <b-button variant="success" size="lg" @click="login"
                    ><router-link to="todo"
                      ><p style="color: black">Login to YouPass</p></router-link
                    >
                  </b-button>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center text-white opacity-8 mt-3">
            Copyright &copy; YouPass
          </div>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "login",
  data() {
    return {
      userid: "",
      password: "",
    };
  },
  methods: {
    checkState() {
      this.$store.dispatch("global/checkState");
      console.log(this.$store.state.global.isLogin);
      if (this.$store.state.global.isLogin == true) {
        router.push("/todo");
      }
    },
    login() {
      this.$store.dispatch("global/login", {
        id: this.userid,
        password: this.password,
      });
      if (this.$store.state.global.loginSuccess == true) {
        router.push("./todo");
      }
    },
  },
  mounted() {
    console.log("mounted");
    this.checkState();
  },
};
</script>

<style scoped></style>
