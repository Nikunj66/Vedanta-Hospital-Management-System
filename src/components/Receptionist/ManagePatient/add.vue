<template>
  <div>
    <section class="content-header">
      <h1>Manage Patient</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/#/receptionist/dashboard"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/receptionist/managepatient"
            ><i class="fa fa-user"></i>Patient</a
          >
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
          <a href="/#/receptionist/managepatient" class="btn btn-default"
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
                      >Full Name<span style="color: red">{{ name_error }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter full name"
                      v-model="name"
                    />
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("name") }}
                    </p>
                  </div>
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
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("contactno") }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >Address<span style="color: red">{{
                        address_error
                      }}</span>
                      :
                    </label>
                    <textarea
                      class="form-control"
                      v-model="address"
                      placeholder="Enter Address"
                    ></textarea>
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("address") }}
                    </p>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label
                      >City<span style="color: red">{{ city_error }}</span> :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                      v-model="city"
                    />
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("city") }}
                    </p>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label>Other : </label>
                    <textarea
                      class="form-control"
                      v-model="other"
                      placeholder="Enter Other"
                    ></textarea>
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("other") }}
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
      address: "",
      city: "",
      other: "",
      name_error: "",
      contactno_error: "",
      address_error: "",
      city_error: "",
      other_error: "",
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
    address: function (value) {
      this.address_error = "";
      return Validator.value(value).required();
    },
    city: function (value) {
      this.city_error = "";
      return Validator.value(value)
        .required()
        .regex("^[a-zA-Z]{3,}$", "Invalid City.");
    },
    other: function (value) {
      this.other_error = "";
      return Validator.value(value).required();
    },
  },
  methods: {
    submitData() {
      if (
        this.name == "" &&
        this.contactno == "" &&
        this.address == "" &&
        this.city == ""
      ) {
        this.name_error = "*";
        this.contactno_error = "*";
        this.address_error = "*";
        this.city_error = "*";
      } else if (this.name == "") {
        this.name_error = "*";
      } else if (this.contactno == "") {
        this.contact_error = "*";
      } else if (this.address == "") {
        this.address_error = "*";
      } else if (this.city == "") {
        this.city_error = "*";
      } else {
        // console.log(this.$session.get('token'));
        const getData = {
          name: this.name,
          contactno: this.contactno,
          address: this.address,
          city: this.city,
          other: this.other,
        };
        const header = { "x-access-token": this.$session.get("token") };
        // alert(this.$session.get('token'));
        //alert(this.password)
        axios
          .post("http://127.0.0.1:8000/api/patient/add", getData, {
            headers: header,
          })
          .then((res) => {
            console.log(res), this.$router.push("/receptionist/managepatient");
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
    if (!(this.$session.get("role") == "Receptionist")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
  },
};
</script>