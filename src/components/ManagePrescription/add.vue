<template>
  <div>
    <section class="content-header">
      <h1>Manage Prescription</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/managepatient"><i class="fa fa-user"></i>Patient</a>
        </li>
        <li>
          <a :href="'/#/manageprescription/' + pid"
            ><i class="fa fa-book"></i>Prescription</a
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
          <a :href="'/#/manageprescription/' + pid" class="btn btn-default"
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
                      >Start Date<span style="color: red">{{
                        startdate_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="startdate"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("startdate") }}
                  </p>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No"
                      >Days<span style="color: red">{{ days_error }}</span> :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Days"
                      v-model="days"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("days") }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >Treatment Description<span style="color: red">{{
                        treatment_description_error
                      }}</span>
                      :
                    </label>
                    <textarea
                      class="form-control"
                      v-model="treatment_description"
                      placeholder="Enter Treatment Description"
                    ></textarea>
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("treatment_description") }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label
                      >Diagnosis Details<span style="color: red">{{
                        diagnosis_details_error
                      }}</span>
                      :
                    </label>
                    <textarea
                      class="form-control"
                      v-model="diagnosis_details"
                      placeholder="Enter Diagnosis Details"
                    ></textarea>
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("diagnosis_details") }}
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
      startdate: "",
      treatment_description: "",
      diagnosis_details: "",
      days: "",
      startdate_error: "",
      treatment_description_error: "",
      diagnosis_details_error: "",
      days_error: "",
      pid: null,
    };
  },
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.pid = this.$router.history.current.params.pid;
  },
  validators: {
    startdate: function (value) {
      this.startdate_error = "";
      return Validator.value(value).required();
    },
    days: function (value) {
      this.days_error = "";
      return Validator.value(value)
        .required()
        .regex("^[0-9]+$", "Invalid Days");
    },
    treatment_description: function (value) {
      this.treatment_description_error = "";
      return Validator.value(value).required();
    },
    diagnosis_details: function (value) {
      this.diagnosis_details_error = "";
      return Validator.value(value).required();
    },
  },
  methods: {
    submitData() {
      if (
        this.startdate == "" &&
        this.treatment_description == "" &&
        this.diagnosis_details == "" &&
        this.days == ""
      ) {
        this.startdate_error = "*";
        this.days_error = "*";
        this.treatment_description_error = "*";
        this.diagnosis_details_error = "*";
      } else if (this.startdate == "") {
        this.startdate_error = "*";
      } else if (this.days == "") {
        this.startdate_error = "";
        this.days_error = "*";
      } else if (this.treatment_description == "") {
        this.days_error = "";
        this.treatment_description_error = "*";
      } else if (this.diagnosis_details == "") {
        this.treatment_description_error = "";
        this.diagnosis_details_error = "*";
      } else {
        // console.log(this.$session.get('token'));
        const getData = {
          startdate: this.startdate,
          days: this.days,
          treatment_description: this.treatment_description,
          diagnosis_details: this.diagnosis_details,
        };
        const header = { "x-access-token": this.$session.get("token") };
        // alert(this.$session.get('token'));
        //alert(this.password)

        axios
          .post(
            "http://127.0.0.1:8000/api/prescription/add/" + this.pid,
            getData,
            { headers: header }
          )
          .then((res) => {
            console.log(res),
              this.$router.push("/manageprescription/" + this.pid);
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
};
</script>