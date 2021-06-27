
<template>
  <div class="login-box">
    <div class="login-logo">
      <a href="/"><b>VHMS</b></a>
    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
      <p class="login-box-msg">Sign in to start your session</p>
      <form @submit.prevent="login">
        <div class="form-group has-feedback">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            v-model="username"
          />
          <span class="glyphicon glyphicon-envelope form-control-feedback"
            ><span style="color: red">{{ username_error }}</span></span
          >
          <p style="color: red; text-align: right">
            {{ validation.firstError("username") }}
          </p>
        </div>
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <span class="glyphicon glyphicon-lock form-control-feedback"
            ><span style="color: red">{{ password_error }}</span></span
          >
          <p style="color: red; text-align: right">
            {{ validation.firstError("password") }}
          </p>
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary btn-block btn-flat">
            Sign In
          </button>
        </div>
      </form>
      <a href="#">I forgot my password</a><br />
      <a href="/#/auth/register" class="text-center"
        >Register a new membership</a
      >
    </div>
    <!-- /.login-box-body -->
  </div>
  <!-- /.login-box -->
</template>
<script>
import Vue from "vue";
import axios from "axios";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;
Vue.use(SimpleVueValidation);
export default {
  name: "login",
  props: {
    msg: String,
  },
  data() {
    return {
      username: "",
      password: "",
      username_error: "",
      password_error: "",
    };
  },
  validators: {
    username: function (value) {
      this.username_error = "";
      return Validator.value(value).required().email();
    },
    password: function (value) {
      this.password_error = "";
      return Validator.value(value)
        .required()
        .regex(
          '^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!#$%&?@ "]).*$',
          "Minimum 8 character,Must contain one uppercase & one lowercase alphabetic & special characters."
        );
    },
  },
  methods: {
    login() {
      if (this.username == "" && this.password == "") {
        this.username_error = "*";
        this.password_error = "*";
        this.confirmpassword_error = "*";
      } else if (this.username == "") {
        this.contactno_error = "";
        this.username_error = "*";
      } else if (this.password == "") {
        this.username_error = "";
        this.password_error = "*";
      } else {
        const getData = {
          username: this.username,
          password: this.password,
        };
        axios
          .post("http://127.0.0.1:8000/api/login", getData)
          .then((response) => {
            if (response.status == 200 && "token" in response.data) {
              this.$session.start();
              this.$session.set("token", response.data.token);
              this.$session.set("username", this.username);
              this.$session.set("role", response.data.result.role);
              if (response.data.result.role == "Admin") {
                window.location.href = "/";
              } else if (response.data.result.role == "Doctor") {
                window.location.href = "/#/doctor/dashboard";
              } else if (response.data.result.role == "Receptionist") {
                window.location.href = "/#/receptionist/dashboard";
              } else if (response.data.result.role == "Medicine distributor") {
                window.location.href = "/#/medicinedistributor/dashboard";
              }

              // window.location.href = "/";
            }
          })
          .catch((error) => console.log(error));
      }
    },
  },
};
</script>