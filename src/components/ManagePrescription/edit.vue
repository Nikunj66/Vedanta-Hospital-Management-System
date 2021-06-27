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
          <a href=""><i class="fa fa-Edit"></i>Edit</a>
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
            <h3 class="box-title">Edit Form</h3>
          </div>
          <div class="box-body">
            <form @submit.prevent="submitData" id="form1">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Full_Name">Start Date : </label>
                    <input
                      type="date"
                      class="form-control"
                      v-model="item.startdate"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No">Days : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter Days"
                      v-model="item.days"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="id-Full_Name">Treatment Description : </label>
                    <textarea
                      class="form-control"
                      v-model="item.treatment_description"
                      placeholder="Enter Treatment Description"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Diagnosis Details : </label>
                    <textarea
                      class="form-control"
                      v-model="item.diagnosis_details"
                      placeholder="Enter Diagnosis Details"
                    ></textarea>
                  </div>
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
import axios from "axios";
export default {
  name: "edit",
  data() {
    return {
      id: "",
      pid: "",
      item: null,
    };
  },
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.pid = this.$router.history.current.params.pid;
    this.id = this.$router.history.current.params.id;
    const header = { "x-access-token": this.$session.get("token") };

    axios
      .put(
        "http://127.0.0.1:8000/api/prescription/get/" +
          this.pid +
          "/" +
          this.id,
        this.id,
        {
          headers: header,
        }
      )
      .then((response) => {
        this.item = response.data.result;
        this.item.startdate = this.item.startdate.split("T")[0];
      });
  },
  methods: {
    submitData() {
      const getData = {
        // startdate: this.item.startdate,
        days: this.item.days,
        treatment_description: this.item.treatment_description,
        diagnosis_details: this.item.diagnosis_details,
      };
      console.log(getData);
      // alert(
      //   getData.startdate +
      //     " " +
      //     getData.days +
      //     " " +
      //     getData.treatment_description +
      //     " " +
      //     getData.diagnosis_details
      // );
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .patch(
          "http://127.0.0.1:8000/api/prescription/update/" +
            this.pid +
            "/" +
            this.item._id,
          getData,
          { headers: header }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
      this.$router.push("/manageprescription/" + this.pid);
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
};
</script>