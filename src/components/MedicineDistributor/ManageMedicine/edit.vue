<template>
  <div>
    <section class="content-header">
      <h1>Manage Medicine</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/#/medicinedistributor/dashboard"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/medicinedistributor/managemedicine"
            ><i class="fa fa-plus-circle"></i>Medicine</a
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
          <a
            href="/#/medicinedistributor/managemedicine"
            class="btn btn-default"
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
                    <label for="id-Full_Name">Medicine Name : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter medicine name"
                      v-model="item.name"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No">Price : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter price"
                      v-model="item.price"
                    />
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
  name: "addstaff",
  data() {
    return {
      id: "",
      item: null,
    };
  },
  mounted() {
    if (!(this.$session.get("role") == "Medicine distributor")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.id = this.$router.history.current.params.id;
    const header = { "x-access-token": this.$session.get("token") };

    axios
      .put("http://127.0.0.1:8000/api/medicine/get/" + this.id, this.id, {
        headers: header,
      })
      .then((response) => {
        this.item = response.data.result;
      });
  },
  methods: {
    submitData() {
      // console.log(this.$session.get('token'));
      const getData = {
        name: this.item.name,
        price: this.item.price,
      };
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .patch(
          "http://127.0.0.1:8000/api/medicine/update/" + this.item._id,
          getData,
          { headers: header }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
      this.$router.push("/medicinedistributor/managemedicine");
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
};
</script>