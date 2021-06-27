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
            <a href="#" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>{{ this.staff.length }}</h3>
              <p>Total Users</p>
            </div>
            <div class="icon">
              <i class="ion ion-person"></i>
            </div>
            <a href="/#/managestaff" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>{{ doctor.length }}</h3>
              <p>Total Doctors</p>
            </div>
            <div class="icon">
              <i class="ion ion-medkit"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>{{ assistant.length }}</h3>
              <p>Total Assistants</p>
            </div>
            <div class="icon">
              <i class="ion ion-pie-graph"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <h3>Doctors</h3>

      <div class="row">
        <div class="col-lg-3 col-xs-6" v-for="d in doctorapp" :key="d">
          <!-- small box -->
          <div class="small-box bg-blue">
            <div class="inner">
              <h3>{{ d.split(",")[2] }}</h3>
              <p>{{ d.split(",")[1] }}</p>
            </div>
            <div class="icon">
              <i class="ion ion-clock"></i>
            </div>
            <a href="#" class="small-box-footer"
              >More info <i class="fa fa-arrow-circle-right"></i
            ></a>
          </div>
        </div>
      </div>
      <h3>Assitants</h3>
      <div class="row">
        <div class="col-lg-3 col-xs-6" v-for="a in assistantapp" :key="a">
          <!-- small box -->
          <div class="small-box bg-purple">
            <div class="inner">
              <h3>{{ a.split(",")[2] }}</h3>
              <p>{{ a.split(",")[1] }}</p>
            </div>
            <div class="icon">
              <i class="ion ion-clock"></i>
            </div>
            <a href="#" class="small-box-footer"
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
      staff: [],
      current_Date: "",
      doctor: [],
      assistant: [],
      doctorapp: [],
      count: 0,
      assistantapp: [],
      count1: 0,
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
        .get("http://127.0.0.1:8000/api/staffmember/list/remove-pagination", {
          headers: header,
        })
        .then((res) => {
          this.staff = res.data.result;
          for (var i = 0; i < this.staff.length; i++) {
            if (this.staff[i].role == "Doctor") {
              this.doctor.push(this.staff[i]._id + "," + this.staff[i].name);
            }
            if (this.staff[i].role == "Assistant") {
              this.assistant.push(this.staff[i]._id + "," + this.staff[i].name);
            }
          }
        });
      axios
        .post("http://127.0.0.1:8000/api/doctorpatientlist/list", getData, {
          headers: header,
        })
        .then((res) => {
          this.appointment = res.data.result;
          console.log(this.appointment);
          for (var i = 0; i < this.doctor.length; i++) {
            for (var j = 0; j < this.appointment.length; j++) {
              if (
                this.doctor[i].split(",")[0] == this.appointment[j].staff_id
              ) {
                this.count = this.count + 1;
              }
            }
            this.doctorapp.push(this.doctor[i] + "," + this.count);
            this.count = 0;
          }
          for (var i1 = 0; i1 < this.assistant.length; i1++) {
            for (var j1 = 0; j1 < this.appointment.length; j1++) {
              if (
                this.assistant[i1].split(",")[0] ==
                this.appointment[j1].staff_id
              ) {
                this.count1 = this.count1 + 1;
              }
            }
            this.assistantapp.push(this.assistant[i1] + "," + this.count1);
            this.count1 = 0;
          }
        });
    },
  },
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$router.push("/auth/login");
    }

    this.getData();
  },
};
</script>