<template>
  <div>
    <h1>Manage Appointment</h1>
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
            <h3 class="box-title">Edit Form</h3>
          </div>
          <div class="box-body">
            <form @submit.prevent="submitData" id="form1">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="id-Full_Name">Date : </label>
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Enter medicine name"
                      v-model="item.date"
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
                        <th class="text-center">Time Slot</th>
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
                          v-for="d in doctor"
                          :key="d._id"
                        >
                          <input
                            v-if="slot == slot_time && d._id == item.staff_id"
                            type="checkbox"
                            checked
                            @change="getData(slot, d._id)"
                          />

                          <input
                            v-else
                            type="checkbox"
                            @change="getData(slot, d._id)"
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
      from_time: "",
      to_time: "",
      item: "",
      hours: "",
      minutes: "",
      newformat: "",
      hours1: "",
      minutes1: "",
      newformat1: "",
      staff_id: "",
      pid: "",
      staffs: "",
      id: "",
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
      slot_time: "",
    };
  },
  validators: {
    from_time: function (value) {
      return Validator.value(value).required();
    },
    to_time: function (value) {
      return Validator.value(value).required();
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
  methods: {
    getId(id) {
      this.staff_id = id;
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

    getStaffMemberData() {
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .get("http://127.0.0.1:8000/api/staffmember/list", { headers: header })
        .then((response) => {
          this.staffs = response.data.result;
          for (var i = 0; i < this.staffs.length; i++) {
            if (this.staffs[i].role == "Doctor") {
              this.doctor.push(this.staffs[i]);
            }
          }
        });
    },
    submitData() {
      const getData = {
        from_time: this.from_time,
        to_time: this.to_time,
        staff_id: this.staff_id,
        date: this.item.date,
      };

      const header = { "x-access-token": this.$session.get("token") };
      axios
        .patch(
          "http://127.0.0.1:8000/api/appointment/update/" +
            this.pid +
            "/" +
            this.id,
          getData,
          {
            headers: header,
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
      this.$router.push("/manageappointment/" + this.pid);
    },
  },
  mounted() {
    if (!(this.$session.get("role") == "Receptionist")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.pid = this.$router.history.current.params.pid;
    this.getStaffMemberData();
    this.getslot();
    this.id = this.$router.history.current.params.id;
    const header = { "x-access-token": this.$session.get("token") };

    axios
      .put(
        "http://127.0.0.1:8000/api/appointment/get/" + this.pid + "/" + this.id,
        this.id,
        {
          headers: header,
        }
      )
      .then((response) => {
        this.item = response.data.result;
        this.item.date = this.item.date.split("T")[0];
        this.slot_time = this.item.from_time + "-" + this.item.to_time;
      });
  },
};
</script>