<template>
  <div>
    <section class="content-header">
      <h1>Manage Slot</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/manageslot"><i class="fa fa-clock-o"></i>slot</a>
        </li>
        <li class="active">
          <a href=""><i class="fa fa-pencil"></i>edit</a>
        </li>
      </ol>
    </section>
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
            <h3 class="box-title">Edit Form</h3>
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
                      v-model="item.from_time"
                      @change="myFunction"
                    />
                  </div>
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
                      v-model="item.to_time"
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
      item: "",
      id: "",
      from_time_error: "",
      to_time_error: "",
    };
  },
  methods: {
    submitData() {
      this.myFunction();
      this.myFunction1();
      this.item.from_time =
        this.hours + ":" + this.minutes + " " + this.newformat;
      this.item.to_time =
        this.hours1 + ":" + this.minutes1 + " " + this.newformat1;

      // console.log(this.$session.get('token'));
      const getData = {
        from_time: this.item.from_time,
        to_time: this.item.to_time,
      };
      //   alert(getData.from_time);
      const header = { "x-access-token": this.$session.get("token") };

      axios
        .patch("http://127.0.0.1:8000/api/slot/update/" + this.id, getData, {
          headers: header,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
      this.$router.push("/manageslot");
    },
    myFunction() {
      this.hours = this.item.from_time.split(":")[0];
      this.minutes = this.item.from_time.split(":", 2)[1];
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
      this.hours1 = this.item.to_time.split(":")[0];
      this.minutes1 = this.item.to_time.split(":", 2)[1];
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
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.id = this.$router.history.current.params.id;
    const header = { "x-access-token": this.$session.get("token") };

    axios
      .put("http://127.0.0.1:8000/api/slot/get/" + this.id, this.id, {
        headers: header,
      })
      .then((response) => {
        this.item = response.data.result;
        this.item.from_time = this.item.from_time.split(" ")[0];
        this.item.to_time = this.item.to_time.split(" ")[0];

        // alert(this.item.to_time);
      });
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
};
</script>