<template>
  <div>
    <section class="content-header">
      <h1>Manage Treatment</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/managetreatment"><i class="fa fa-medkit"></i>Treatment</a>
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
          <a href="/#/managetreatment" class="btn btn-default"
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
                    <label for="id-Full_Name"
                      >Treatment Name<span style="color: red">{{
                        name_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter treatment name"
                      v-model="item.name"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Price"
                      >Price<span style="color: red">{{ price_error }}</span> :
                    </label>
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
      name_error: "",
      price_error: "",
    };
  },
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.id = this.$router.history.current.params.id;
    const header = { "x-access-token": this.$session.get("token") };

    axios
      .put("http://127.0.0.1:8000/api/treatment/get/" + this.id, this.id, {
        headers: header,
      })
      .then((response) => {
        this.item = response.data.result;
      });
  },
  methods: {
    submitData() {
      if (this.item.name == "" && this.item.price == "") {
        this.name_error = "*";
        this.price_error = "*";
      } else if (this.item.name == "") {
        this.name_error = "*";
      } else if (this.item.price == "") {
        this.price_error = "*";
      } else {
        const getData = {
          name: this.item.name,
          price: this.item.price,
        };
        const header = { "x-access-token": this.$session.get("token") };
        axios
          .patch(
            "http://127.0.0.1:8000/api/treatment/update/" + this.item._id,
            getData,
            { headers: header }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));
        this.$router.push("/managetreatment");
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