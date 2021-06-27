
<template>
  <div class="register-box">
    <div class="register-logo">
      <a href="/"><b>VHMS</b></a>
    </div>

    <div class="register-box-body">
      <p class="login-box-msg">Register a new membership</p>
      <form @submit.prevent="register">
        <div class="form-group has-feedback">
          <input
            type="text"
            class="form-control"
            placeholder="Full name"
            v-model="name"
          />
          <span class="glyphicon glyphicon-user form-control-feedback"
            ><span style="color: red">{{ name_error }}</span></span
          >
          <p style="color: red; text-align: right">
            {{ validation.firstError("name") }}
          </p>
        </div>
        <div class="form-group has-feedback">
          <input
            type="text"
            class="form-control"
            placeholder="Contact Number"
            v-model="contactno"
            @change="error('contactno')"
          />
          <span class="glyphicon glyphicon-phone form-control-feedback"
            ><span style="color: red">{{ contactno_error }}</span></span
          >
          <p style="color: red; text-align: right">
            {{ validation.firstError("contactno") }}
          </p>
        </div>
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
        <div class="form-group has-feedback">
          <input
            type="password"
            class="form-control"
            placeholder="Retype password"
            v-model="confirmpassword"
          />
          <span class="glyphicon glyphicon-log-in form-control-feedback"
            ><span style="color: red">{{ confirmpassword_error }}</span></span
          >
          <p style="color: red; text-align: right">
            {{ validation.firstError("confirmpassword") }}
          </p>
        </div>
        <div class="row">
          <button type="submit" class="btn btn-success btn-block btn-flat">
            Register
          </button>
        </div>
      </form>

      <a href="/#/auth/login" class="text-center"
        >I already have a membership</a
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import SimpleVueValidation from "simple-vue-validator";
const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);
export default {
  name: "registration",
  props: {
    msg: String,
  },
  data() {
    return {
      name: "",
      contactno: "",
      username: "",
      password: "",
      confirmpassword: "",
      role: "admin",
      name_error: "",
      contactno_error: "",
      username_error: "",
      password_error: "",
      confirmpassword_error: "",
    };
  },
  validators: {
    name: function (value) {
      this.name_error = "";
      return Validator.value(value)
        .required()
        .regex(
          "^[a-zA-z]{3,}[ ]{1}[a-zA-z]{1,}[ ]{1}[a-zA-z]{3,}$",
          "Invalid Full Name"
        );
    },
    contactno: function (value) {
      this.contactno_error = "";
      return Validator.value(value)
        .required()
        .regex("^[6789]{1}[0-9]{9}$", "Invalid Contact No");
    },
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
    "confirmpassword, password": function (repeat, password) {
      this.confirmpassword_error = "";
      if (this.submitted || this.validation.isTouched("confirmpassword")) {
        return Validator.value(repeat).required().match(password);
      }
    },
  },
  methods: {
    register() {
      if (
        this.name == "" &&
        this.contactno == "" &&
        this.username == "" &&
        this.password == "" &&
        this.confirmpassword == ""
      ) {
        this.name_error = "*";
        this.contactno_error = "*";
        this.username_error = "*";
        this.password_error = "*";
        this.confirmpassword_error = "*";
      } else if (this.name == "") {
        this.name_error = "*";
      } else if (this.contactno == "") {
        this.name_error = "";
        this.contactno_error = "*";
      } else if (this.username == "") {
        this.contactno_error = "";
        this.username_error = "*";
      } else if (this.password == "") {
        this.username_error = "";
        this.password_error = "*";
      } else if (this.confirmpassword == "") {
        this.password_error = "";
        this.confirmpassword_error = "*";
      } else {
        const getData = {
          name: this.name,
          contactno: this.contactno,
          username: this.username,
          password: this.password,
          role: this.role,
        };
        axios
          .post("http://127.0.0.1:8000/api/registration", getData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error));
        this.$router.push("/#/auth/login");
      }
    },
  },
};
</script>