<template>
  <div>
    <section class="content-header">
      <h1>Manage Patient</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/#/receptionist/dashboard"
            ><i class="fa fa-dashboard"></i> Home</a
          >
        </li>
        <li>
          <a href="/#/receptionist/managepatient"
            ><i class="fa fa-user"></i>Patient</a
          >
        </li>
        <li class="active">
          <a href=""><i class="fa fa-pencil"></i>Edit</a>
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
            <h3 class="box-title">Edit Form</h3>
          </div>
          <div class="box-body">
            <form @submit.prevent="submitData" id="form1">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Full_Name">Full Name : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter full name"
                      v-model="item.name"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No">Contact No : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter contact no"
                      v-model="item.contactno"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="id-Full_Name">Address : </label>
                    <textarea
                      class="form-control"
                      v-model="item.address"
                      placeholder="Enter Address"
                    ></textarea>
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label>City : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                      v-model="item.city"
                    />
                  </div>
                </div>
                <div class="col-sm-4">
                  <div class="form-group">
                    <label>Other : </label>
                    <textarea
                      class="form-control"
                      v-model="item.other"
                      placeholder="Enter Other"
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
      item: null,
    };
  },
  mounted() {
    if (!(this.$session.get("role") == "Receptionist")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.id = this.$router.history.current.params.id;
    const header = { "x-access-token": this.$session.get("token") };

    axios
      .put("http://127.0.0.1:8000/api/patient/get/" + this.id, this.id, {
        headers: header,
      })
      .then((response) => {
        this.item = response.data.result;
      });
  },
  methods: {
    submitData() {
      const getData = {
        name: this.item.name,
        contactno: this.item.contactno,
        address: this.item.address,
        city: this.item.city,
        other: this.item.other,
      };

      const header = { "x-access-token": this.$session.get("token") };
      axios
        .patch(
          "http://127.0.0.1:8000/api/patient/update/" + this.item._id,
          getData,
          { headers: header }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
      this.$router.push("/receptionist/managepatient");
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
};
</script>