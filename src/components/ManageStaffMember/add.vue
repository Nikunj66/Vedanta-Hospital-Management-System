<template>
  <div>
    <section class="content-header">
      <h1>Manage Staff Member</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/managestaff"><i class="fa fa-users"></i>StaffMember</a>
        </li>
        <li class="active">
          <a href=""><i class="fa fa-plus"></i>Add</a>
        </li>
      </ol>
    </section>
    <br />
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-right">
          <button type="submit" class="btn btn-primary" form="form1">
            <i class="fa fa-save"></i>
          </button>
          <button type="reset" class="btn btn-default" form="form1">
            <i class="fa fa-refresh"></i>
          </button>
          <a href="/#/managestaff" class="btn btn-default"
            ><i class="fa fa-reply"></i
          ></a>
        </div>
      </div>
    </div>
    <br />

    <div class="row">
      <div class="col-xs-12">
        <div class="box box-success">
          <div class="box-header">
            <h3 class="box-title">Add Form</h3>
          </div>
          <div class="box-body">
            <form @submit.prevent="submitData" id="form1">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >Full Name<span style="color: red">{{ name_error }}</span
                      >:
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter full name"
                      v-model="name"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("name") }}
                  </p>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No"
                      >Contact No<span style="color: red">{{
                        contactno_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter contact no"
                      v-model="contactno"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("contactno") }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >Username<span style="color: red">{{
                        username_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter username"
                      v-model="username"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("username") }}
                  </p>
                </div>

                <div class="col-sm-4">
                  <div class="form-group">
                    <label
                      >Role<span style="color: red">{{ role_error }}</span
                      >:
                    </label>
                    <select class="form-control" v-model="role">
                      <option value="Admin">Admin</option>
                      <option value="Receptionist">Receptionist</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Assistant">Assistant</option>
                      <option value="Medicine distributor">
                        Medicine Distributor
                      </option>
                    </select>
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("role") }}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
  name: "addstaff",
  data() {
    return {
      name: "",
      contactno: "",
      username: "",
      password: "",
      role: "",
      name_error: "",
      contactno_error: "",
      username_error: "",
      role_error: "",
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

    role: function (value) {
      this.role_error = "";
      return Validator.value(value).required();
    },
  },
  methods: {
    submitData() {
      // console.log(this.$session.get('token'));
      if (
        this.name == "" &&
        this.contactno == "" &&
        this.username == "" &&
        this.role == ""
      ) {
        this.name_error = "*";
        this.contactno_error = "*";
        this.username_error = "*";
        this.role_error = "*";
      } else if (this.name == "") {
        this.name_error = "*";
      } else if (this.contactno == "") {
        this.name_error = "";
        this.contactno_error = "*";
      } else if (this.username == "") {
        this.contactno_error = "";
        this.username_error = "*";
      } else if (this.role == "") {
        this.password_error = "";
        this.role_error = "*";
      } else {
        const getData = {
          name: this.name,
          contactno: this.contactno,
          username: this.username,
          password: this.name.split(" ")[0] + "@123",
          role: this.role,
        };
        const header = { "x-access-token": this.$session.get("token") };
        // alert(this.$session.get('token'));
        //alert(this.password)
        axios
          .post("http://127.0.0.1:8000/api/staffmember/add", getData, {
            headers: header,
          })
          .then((res) => {
            console.log(res), this.$router.push("/managestaff");
          })
          .catch((error) => console.log(error));
      }
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
  },
};
</script>