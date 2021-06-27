<template>
  <div>
    <section class="content-header">
      <h1>Manage Appointment</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/managepatient"><i class="fa fa-user"></i>Patient</a>
        </li>
        <li>
          <a :href="'/#/manageprescription/' + this.$session.get('patient_id')"
            ><i class="fa fa-book"></i>Prescription</a
          >
        </li>
        <li>
          <a :href="'/#/manageappointment/' + pid"
            ><i class="fa fa-clock-o"></i>Appointment</a
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
          <a :href="'/#/manageappointment/' + pid" class="btn btn-default"
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
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >Date<span style="color: red">{{ date_error }}</span> :
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Enter medicine name"
                      v-model="date"
                    />
                  </div>
                  <p style="color: red; text-align: right">
                    {{ validation.firstError("date") }}
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <table id="table1" class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th class="text-center">Time</th>
                        <th class="text-center" :colspan="doctor_count">
                          Doctor
                        </th>
                        <th class="text-center" :colspan="assistant_count">
                          Assistant
                        </th>
                      </tr>
                      <tr>
                        <th class="text-center">Slot</th>
                        <th
                          class="text-center"
                          v-for="item in doctor"
                          :key="item._id"
                        >
                          <b>{{ item.name }}</b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="slot in all_slot" :key="slot">
                        <h5 class="text-center">{{ slot }}</h5>
                        <th
                          class="text-center"
                          v-for="item in doctor"
                          :key="item._id"
                        >
                          <input
                            type="checkbox"
                            @change="getData(slot, item._id)"
                          />
                        </th>
                      </tr>
                    </tbody>
                  </table>
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
      from_time: [],
      to_time: [],
      items: "",
      hours: "",
      minutes: "",
      newformat: "",
      hours1: "",
      minutes1: "",
      newformat1: "",
      staff_id: "",
      pid: "",
      date: "",
      from_time_error: "",
      to_time_error: "",
      date_error: "",
      staff_id_error: "",
      start_hours: 0,
      start_mins: 0,
      end_hours: 0,
      end_mins: 0,
      start: "",
      end: "",
      slot_data: [],
      current: "",
      next: "",
      total_slot: 0,
      all_slot: [],
      doctor: [],
      doctor_count: 0,
      assistant_count: 0,
    };
  },
  validators: {
    date: function (value) {
      this.date_error = "";
      return Validator.value(value).required();
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
  methods: {
    getData(timeslot, did) {
      this.from_time = timeslot.split("-")[0];
      this.to_time = timeslot.split("-")[1];
      this.staff_id = did;
      if (parseInt(this.from_time.split(":")[0]) <= 9) {
        this.from_time = "0" + timeslot.split("-")[0];
      }
      if (parseInt(this.to_time.split(":")[0]) <= 9) {
        this.to_time = "0" + timeslot.split("-")[1];
      }
    },
    slotcalculation(hour, min) {
      var ampm = hour >= 12 ? "PM" : "AM";
      var minutesToAdd = 15;
      var currentTime = new Date();
      currentTime.setHours(hour, min);
      var nextTime = new Date(currentTime.getTime() + minutesToAdd * 60000);
      this.current = currentTime.toString();
      this.next = nextTime.toString();
      this.start = ampm;
    },
    getId(id) {
      this.staff_id = id;
      this.staff_id_error = "";
    },
    getStaffMemberData() {
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .get("http://127.0.0.1:8000/api/staffmember/list/remove-pagination", {
          headers: header,
        })
        .then((response) => {
          this.items = response.data.result;
          for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].role == "Doctor") {
              this.doctor.push(this.items[i]);
            }
          }

          for (var j = 0; j < this.items.length; j++) {
            if (this.items[j].role == "Doctor") {
              this.doctor_count++;
            }
            if (this.items[j].role == "Assistant") {
              this.assistant_count++;
              this.doctor.push(this.items[j]);
            }
          }
        });
    },
    getslot() {
      this.pid = this.$router.history.current.params.pid;
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .get("http://127.0.0.1:8000/api/slot/list", {
          headers: header,
        })
        .then((res) => {
          this.slot_data = res.data.result;
          this.start = this.slot_data[0].from_time.split(" ")[1];
          this.start_hours = this.slot_data[0].from_time
            .split(" ")[0]
            .split(":")[0];
          this.start_mins = this.slot_data[0].from_time
            .split(" ")[0]
            .split(":")[1];
          this.end = this.slot_data[0].to_time.split(" ")[1];
          this.end_hours = this.slot_data[0].to_time
            .split(" ")[0]
            .split(":")[0];
          var hour = 12 - parseInt(this.start_hours) + parseInt(this.end_hours);
          this.total_slot = parseInt(hour) * 4;

          for (var i = 1; i <= this.total_slot; i++) {
            if (i == 1) {
              var ampm = this.start_hours >= 12 ? "PM" : "AM";
              this.start = ampm;
              var minutesToAdd = 15;
              var currentTime = new Date();
              currentTime.setHours(this.start_hours, this.start_mins);
              var nextTime = new Date(
                currentTime.getTime() + minutesToAdd * 60000
              );
              this.current = currentTime.toString();
              this.next = nextTime.toString();
              this.all_slot.push(
                parseInt(this.current.split(" ")[4].split(":")[0]) +
                  ":" +
                  this.current.split(" ")[4].split(":")[1] +
                  " " +
                  this.start +
                  "-" +
                  parseInt(this.next.split(" ")[4].split(":")[0]) +
                  ":" +
                  this.next.split(" ")[4].split(":")[1] +
                  " " +
                  this.start
              );
              this.slotcalculation(
                this.next.split(" ")[4].split(":")[0],
                this.next.split(" ")[4].split(":")[1]
              );
            } else {
              this.slotcalculation(
                this.next.split(" ")[4].split(":")[0],
                this.next.split(" ")[4].split(":")[1]
              );
              if (
                parseInt(this.current.split(" ")[4].split(":")[0]) <= 12 &&
                parseInt(this.next.split(" ")[4].split(":")[0]) >= 13
              ) {
                this.all_slot.push(
                  this.current.split(" ")[4].split(":")[0] +
                    ":" +
                    this.current.split(" ")[4].split(":")[1] +
                    " " +
                    this.start +
                    "-" +
                    (parseInt(this.next.split(" ")[4].split(":")[0]) - 12) +
                    ":" +
                    this.next.split(" ")[4].split(":")[1] +
                    " " +
                    this.start
                );
              } else if (
                parseInt(this.current.split(" ")[4].split(":")[0]) >= 13
              ) {
                this.all_slot.push(
                  parseInt(this.current.split(" ")[4].split(":")[0]) -
                    12 +
                    ":" +
                    this.current.split(" ")[4].split(":")[1] +
                    " " +
                    this.start +
                    "-" +
                    (parseInt(this.next.split(" ")[4].split(":")[0]) - 12) +
                    ":" +
                    this.next.split(" ")[4].split(":")[1] +
                    " " +
                    this.start
                );
              }
            }
            if (
              parseInt(this.current.split(" ")[4].split(":")[0]) <= 12 &&
              parseInt(this.next.split(" ")[4].split(":")[0]) <= 12
            ) {
              this.all_slot.push(
                parseInt(this.current.split(" ")[4].split(":")[0]) +
                  ":" +
                  this.current.split(" ")[4].split(":")[1] +
                  " " +
                  this.start +
                  "-" +
                  parseInt(this.next.split(" ")[4].split(":")[0]) +
                  ":" +
                  this.next.split(" ")[4].split(":")[1] +
                  " " +
                  this.start
              );
            }
          }
        });
    },
    submitData() {
      if (this.date == "") {
        this.date_error = "*";
      } else {
        // console.log(this.$session.get('token'));
        this.pid = this.$router.history.current.params.pid;

        const getData = {
          from_time: this.from_time,
          to_time: this.to_time,
          staff_id: this.staff_id,
          date: this.date,
        };

        // alert(getData.from_time + "" + getData.to_time + " " + getData.date);
        const header = { "x-access-token": this.$session.get("token") };
        axios
          .post(
            "http://127.0.0.1:8000/api/appointment/add/" + this.pid,
            getData,
            {
              headers: header,
            }
          )
          .then((res) => {
            console.log(res),
              this.$router.push("/manageappointment/" + this.pid);
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
  mounted() {
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.getStaffMemberData();
    this.getslot();
  },
};
</script>