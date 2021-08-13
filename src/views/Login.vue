<template>
  <div class="md-layout md-alignment-top-center">
    <div class="md-layout-item md-size-50">
      <div class="row">
        <div class="container-img d-flex w-100">
          <div class="col-md-6">
            <div class="text-center mb-5">
              <img
                src="../assets/indo-kargo-logo.png"
                class="logo-height"
                alt=""
              />
            </div>
          </div>
          <div class="col-md-6">
            <form class="pb-3">
              <md-field>
                <md-icon class="text-danger">email</md-icon>
                <label
                  >Email Address or Phone Number
                  <sup class="text-danger">*</sup></label
                >
                <md-input v-model="loginForm.username"></md-input>
              </md-field>
              <md-field>
                <md-icon class="text-danger">vpn_key</md-icon>
                <label>Password <sup class="text-danger">*</sup></label>
                <md-input
                  v-model="loginForm.password"
                  @keyup.enter.native="handleLogin"
                  type="password"
                ></md-input>
              </md-field>
              <button
                mat-raised-button
                class="btn d-flex ml-auto mr-auto btn-danger"
                @click="onLogin()"
              >
                Login <i class="fa fa-spinner fa-spin"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginService } from "../services/authService";
import { showSnackbar } from "../globalActions";

export default {
  name: "Login",
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "dinesh.rawat@crownstack.com",
        password: "password",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur" }],
        password: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.loading = true;
      //     console.log("hi");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    onLogin() {
      if (
        this.loginForm.username != "" &&
        this.loginForm.password != "" &&
        this.loginForm.password.length >= 6
      ) {
        loginService(this.loginForm).then((res) => {
          if (res.status === "Success") {
            showSnackbar("Logged in successfully");
            this.$emit("authenticated", true);
          } else {
            console.log(res);
          }
        });
      } else {
        console.log("The username and / or password is incorrect");
      }
    },
  },
};
</script>

<style>
.container-img {
  align-items: center;
  height: 370px;
  background: url("../assets/login-bg.svg") left bottom/90% no-repeat #fff;
  border-radius: 10px;
  margin-top: 10%;
}
.fa {
  top: 30px;
  right: 10px;
  position: absolute;
}
.logo-height {
  height: 45px !important;
}
</style>