<template>
  <div>
    <section class="content-header">
      <h1>Dashboard</h1>
      <ol class="breadcrumb">
        <li>
          <a href="#"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li class="active">Dashboard</li>
      </ol>
    </section>
    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>{{ this.appointment.length }}</h3>
              <p>Today's Total Appointments</p>
            </div>
            <div class="icon">
              <i class="ion ion-clipboard"></i>
            </div>
            <a
              href="/#/medicinedistributor/viewappointment"
              class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{ this.medicine.length }}</h3>
              <p>Total Medicine</p>
            </div>
            <div class="icon">
              <i class="ion ion-person"></i>
            </div>
            <a
              href="/#/medicinedistributor/managemedicine"
              class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dashboard",
  data() {
    return {
      appointment: [],
      medicine: [],
      current_Date: "",
    };
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
  methods: {
    getData() {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth() + 1;
      var y = date.getFullYear();

      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      this.current_Date = y + "-" + m + "-" + d;

      const header = { "x-access-token": this.$session.get("token") };
      var getData = {
        date: this.current_Date,
      };
      axios
        .get("http://127.0.0.1:8000/api/medicine/list", {
          headers: header,
        })
        .then((res) => {
          this.medicine = res.data.result;
        });
      axios
        .post("http://127.0.0.1:8000/api/doctorpatientlist/list", getData, {
          headers: header,
        })
        .then((res) => {
          this.appointment = res.data.result;
        });
    },
  },
  mounted() {
    if (!(this.$session.get("role") == "Medicine distributor")) {
      this.$router.push("/auth/login");
    }

    this.getData();
  },
};
</script>