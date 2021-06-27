<template>
  <div>
    <section class="content-header">
      <h1>Manage Slot</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/manageslot"><i class="fa fa-clock-o"></i>Slot</a>
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
          <a href="/#/manageslot" class="btn btn-default"
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
                      >from time<span style="color: red">{{
                        from_time_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      v-model="from_time"
                      @change="myFunction"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("from_time") }}
                  </p>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No"
                      >to time<span style="color: red">{{
                        to_time_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="time"
                      class="form-control"
                      @change="myFunction1"
                      v-model="to_time"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("to_time") }}
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
  name: "addslot",
  data() {
    return {
      from_time: "",
      to_time: "",
      hours: "",
      minutes: "",
      newformat: "",
      hours1: "",
      minutes1: "",
      newformat1: "",
      from_time_error: "",
      to_time_error: "",
    };
  },
  validators: {
    from_time: function (value) {
      this.from_time_error = "";
      return Validator.value(value).required();
    },
    to_time: function (value) {
      this.to_time_error = "";
      return Validator.value(value).required();
    },
  },
  methods: {
    submitData() {
      if (this.from_time == "" && this.to_time == "") {
        this.from_time_error = "*";
        this.to_time_error = "*";
      } else if (this.from_time == "") {
        this.from_time_error = "*";
      } else if (this.to_time == "") {
        this.from_time_error = "";
        this.to_time_error = "*";
      } else {
        this.from_time = this.hours + ":" + this.minutes + " " + this.newformat;
        this.to_time =
          this.hours1 + ":" + this.minutes1 + " " + this.newformat1;
        // console.log(this.$session.get('token'));
        const getData = {
          from_time: this.from_time,
          to_time: this.to_time,
        };
        // alert(getData.from_time);
        const header = { "x-access-token": this.$session.get("token") };

        axios
          .post("http://127.0.0.1:8000/api/slot/add", getData, {
            headers: header,
          })
          .then((res) => {
            console.log(res), this.$router.push("/manageslot");
          })
          .catch((error) => console.log(error));
      }
    },

    myFunction() {
      this.hours = this.from_time.split(":")[0];
      this.minutes = this.from_time.split(":", 2)[1];
      // Check whether AM or PM
      this.newformat = this.hours >= 12 ? "PM" : "AM";
      // Find current hour in AM-PM Format
      this.hours = this.hours % 12;
      // To display "0" as "12"
      this.hours = this.hours ? this.hours : 12;
      this.hours =
        this.hours < 10 && this.hours > 0 ? "0" + this.hours : this.hours;
      // alert(this.hours + " " + this.minutes + " " + this.newformat);
    },
    myFunction1() {
      this.hours1 = this.to_time.split(":")[0];
      this.minutes1 = this.to_time.split(":", 2)[1];
      // Check whether AM or PM
      this.newformat1 = this.hours1 >= 12 ? "PM" : "AM";
      // Find current hour in AM-PM Format
      this.hours1 = this.hours1 % 12;
      // To display "0" as "12"
      this.hours1 = this.hours1 ? this.hours1 : 12;
      this.hours1 =
        this.hours1 < 10 && this.hours1 > 0 ? "0" + this.hours1 : this.hours1;
      // alert(this.hours1 + " " + this.minutes1 + " " + this.newformat1);
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