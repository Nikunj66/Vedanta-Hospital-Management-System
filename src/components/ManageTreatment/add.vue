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
          <a href="/#/managemedicine" class="btn btn-default"
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
                      >Treatment Name<span style="color: red">{{
                        name_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter medicine name"
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
                      >Price<span style="color: red">{{ price_error }}</span> :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter price"
                      v-model="price"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("price") }}
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
      price: "",
      name_error: "",
      price_error: "",
    };
  },
  validators: {
    name: function (value) {
      this.name_error = "";
      return Validator.value(value).required();
    },
    price: function (value) {
      this.price_error = "";
      return Validator.value(value)
        .required()
        .regex("^[0-9]+$", "Invalid Price");
    },
  },
  methods: {
    submitData() {
      if (this.name == "" && this.price == "") {
        this.name_error = "*";
        this.price_error = "*";
      } else if (this.name == "") {
        this.name_error = "*";
      } else if (this.price == "") {
        this.price_error = "*";
      } else {
        // console.log(this.$session.get('token'));
        const getData = {
          name: this.name,
          price: this.price,
        };
        const header = { "x-access-token": this.$session.get("token") };
        // alert(this.$session.get('token'));
        //alert(this.password)
        axios
          .post("http://127.0.0.1:8000/api/treatment/add", getData, {
            headers: header,
          })
          .then((res) => {
            console.log(res), this.$router.push("/managetreatment");
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