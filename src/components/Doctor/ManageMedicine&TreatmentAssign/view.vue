<template>
  <div>
    <section class="content-header">
      <h1>Manage Medicine & Treatment Assign</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/doctor/viewappointment"
            ><i class="fa fa-clock-o"></i>Appointment</a
          >
        </li>
        <li>
          <a class="active" href=""
            ><i class="fa fa-plus"></i>Medicine&TreatmentAssign</a
          >
        </li>
      </ol>
    </section>
    <br />
    <div class="row">
      <div class="col-xs-12">
        <div class="pull-right">
          <button
            type="submit"
            class="btn btn-primary"
            :form="form1 ? 'form1' : form2 ? 'form2' : 'form3'"
          >
            <i class="fa fa-save"></i>
          </button>
          <button
            class="btn btn-danger"
            @click="deleteData(del)"
            style="margin-left: 2px"
          >
            <i class="fa fa-trash"></i>
          </button>
          <a
            href="/#/doctor/viewappointment"
            class="btn btn-default"
            style="margin-left: 2px"
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
            <h3 class="box-title">Medicine Assign</h3>
            <br />
            <form @submit.prevent="submitData" id="form1">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label
                      >Medicine<span style="color: red">{{
                        medicine_error
                      }}</span>
                      :
                    </label>
                    <select
                      v-model="medicine"
                      class="form-control"
                      @change="formstatus(true)"
                    >
                      <option
                        v-for="medicine in medicines"
                        :key="medicine._id"
                        :value="medicine._id"
                      >
                        {{ medicine.name }}
                      </option>
                    </select>
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("medicine") }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label
                      >Fraction<span style="color: red">{{
                        fraction_error
                      }}</span>
                      :
                    </label>
                    <select class="form-control" v-model="fraction">
                      <option
                        v-for="fraction in fraction_list"
                        :key="fraction._id"
                        :value="fraction._id"
                      >
                        {{ fraction.is_morning ? "1" : "0" }} -
                        {{ fraction.is_afternoon ? "1" : "0" }} -
                        {{ fraction.is_evening ? "1" : "0" }} -
                        {{ fraction.is_night ? "1" : "0" }}
                      </option>
                    </select>
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("fraction") }}
                    </p>
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >Supportive<span style="color: red">{{
                        supportive_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter supportive"
                      v-model="supportive"
                    />
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("supportive") }}
                    </p>
                  </div>
                </div>
              </div>
            </form>
            <br />
            <h3 class="box-title">Treatment Assign</h3>
            <br />
            <form @submit.prevent="submitData1()" id="form2">
              <div class="row">
                <div class="col-sm-7">
                  <div class="form-group">
                    <label
                      >Treatment<span style="color: red">{{
                        treatment_error
                      }}</span>
                      :
                    </label>
                    <select
                      class="form-control"
                      v-model="treatment"
                      @change="formstatus(false)"
                    >
                      <option
                        v-for="treatment in treatments"
                        :key="treatment._id"
                        :value="treatment._id"
                      >
                        {{ treatment.name }}
                      </option>
                    </select>
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("treatment") }}
                    </p>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="form-group">
                    <label for="id-Full_Name"
                      >No of Times<span style="color: red">{{
                        nooftimes_error
                      }}</span>
                      :
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter number of times"
                      v-model="nooftimes"
                    />
                    <p style="color: red; text-align: right">
                      {{ validation.firstError("nooftimes") }}
                    </p>
                  </div>
                </div>
              </div>
            </form>
            <br />

            <h3 class="box-title">Prescription Assign</h3>
            <br />
            <form @submit.prevent="submitData2()" id="form3">
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="id-Full_Name">Treatment Description : </label>
                    <textarea
                      class="form-control"
                      v-model="treatment_description"
                      placeholder="Enter Treatment Description"
                      @click="form1status(false)"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label>Diagnosis Details : </label>
                    <textarea
                      class="form-control"
                      v-model="diagnosis_details"
                      placeholder="Enter Diagnosis Details"
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
            <h3 class="box-title">Medicine Assign List</h3>
            <div class="row">
              <div class="col-xs-12">
                <table id="table1" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 1px">
                        <input
                          type="checkbox"
                          @click="checkAll()"
                          v-model="isCheckAll"
                        />
                      </th>
                      <th class="text-center">No</th>
                      <th class="text-center">Medicine Name</th>
                      <th class="text-center">Fraction</th>
                      <th class="text-center">Supportive</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(medicine_assign, index) in medicine_assign_list"
                      :key="medicine_assign"
                    >
                      <td style="width: 1px">
                        <input
                          name="selected"
                          type="checkbox"
                          :value="medicine_assign._id"
                          v-model="selected"
                          @change="updateCheckall()"
                        />
                      </td>
                      <th class="text-center">
                        {{ index + 1 }}
                      </th>
                      <th class="text-center">
                        <h5
                          v-for="medicine in medicine_list"
                          :key="medicine._id"
                        >
                          <b
                            v-if="medicine._id == medicine_assign.medicine_id"
                            >{{ medicine.name }}</b
                          >
                        </h5>
                      </th>
                      <th class="text-center">
                        <h5
                          v-for="fraction in fraction_list"
                          :key="fraction._id"
                        >
                          <b v-if="fraction._id == medicine_assign.fraction_id"
                            >{{ fraction.is_morning ? "1" : "0" }} -
                            {{ fraction.is_afternoon ? "1" : "0" }} -
                            {{ fraction.is_evening ? "1" : "0" }} -
                            {{ fraction.is_night ? "1" : "0" }}
                          </b>
                        </h5>
                      </th>
                      <th class="text-center">
                        {{ medicine_assign.supportive }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <h3 class="box-title">Treatment Assign List</h3>
            <div class="row">
              <div class="col-xs-12">
                <table id="table1" class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th class="text-center" style="width: 1px">
                        <input
                          type="checkbox"
                          @click="checkAll1()"
                          v-model="isCheckAll1"
                        />
                      </th>
                      <th class="text-center">No</th>
                      <th class="text-center">Treatment Name</th>
                      <th class="text-center">Number of Times</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(treatment_assign, index) in treatment_assign_list"
                      :key="treatment_assign"
                    >
                      <td style="width: 1px">
                        <input
                          name="selected1"
                          type="checkbox"
                          :value="treatment_assign._id"
                          v-model="selected1"
                          @change="updateCheckall1()"
                        />
                      </td>
                      <th class="text-center">
                        {{ index + 1 }}
                      </th>
                      <th class="text-center">
                        <h5
                          v-for="treatment in treatment_list"
                          :key="treatment._id"
                        >
                          <b
                            v-if="
                              treatment._id == treatment_assign.treatment_id
                            "
                            >{{ treatment.name }}</b
                          >
                        </h5>
                      </th>

                      <th class="text-center">
                        {{ treatment_assign.number_of_times }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
  name: "addmedicineandtreatmentandassign",
  data() {
    return {
      medicine_list: [],
      treatment_list: [],
      fraction_list: [],
      medicine: "",
      treatment: "",
      fraction: "",
      supportive: "",
      pid: "",
      aid: "",
      medicine_assign_list: [],
      nooftimes: "",
      treatment_assign_list: [],
      form1: true,
      form2: false,
      isCheckAll: false,
      selected: [],
      isCheckAll1: false,
      selected1: [],
      del: "",
      medicines: [],
      treatments: [],
      item: [],
      medicine_error: "",
      fraction_error: "",
      supportive_error: "",
      treatment_error: "",
      nooftimes_error: "",
      treatment_description: "",
      diagnosis_details: "",
    };
  },
  validators: {
    medicine: function (value) {
      this.medicine_error = "";
      return Validator.value(value).required();
    },
    treatment: function (value) {
      this.treatment_error = "";
      return Validator.value(value).required();
    },
    fraction: function (value) {
      this.fraction_error = "";
      return Validator.value(value).required();
    },
    nooftimes: function (value) {
      this.nooftimes_error = "";
      return Validator.value(value)
        .required()
        .regex("^[0-9]+$", "Invalid number of times");
    },
    supportive: function (value) {
      this.supportive_error = "";
      return Validator.value(value)
        .required()
        .regex("^[a-zA-Z]+$", "Invalid supportive");
    },
  },

  methods: {
    async deleteData(st) {
      const header = { "x-access-token": this.$session.get("token") };
      if (st == "medicine") {
        var response = await axios.delete(
          "http://127.0.0.1:8000/api/medicineassign/delete",
          {
            data: {
              id: this.selected,
            },
            headers: header,
          }
        );
        if (response.data.success) {
          this.assignResponsData(
            await this.getMedicineAssignData(
              await this.getMedicineData(await this.getFractionData())
            )
          );
        }
      }
      if (st == "treatment") {
        var response1 = await axios.delete(
          "http://127.0.0.1:8000/api/treatmentassign/delete",
          {
            data: {
              id: this.selected1,
            },
            headers: header,
          }
        );
        if (response1.data.success) {
          this.assignResponsData1(
            await this.getTreatmentAssignData(await this.getTreatementData())
          );
        }
      }
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      if (this.isCheckAll) {
        for (var i = 0; i < this.medicine_assign_list.length; i++) {
          this.selected.push(this.medicine_assign_list[i]._id);
        }
      }
      this.del = "medicine";
    },
    updateCheckall() {
      if (this.selected.length == this.medicine_assign_list.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
      this.del = "medicine";
    },

    checkAll1() {
      this.isCheckAll1 = !this.isCheckAll1;
      this.selected1 = [];
      if (this.isCheckAll1) {
        for (var i = 0; i < this.treatment_assign_list.length; i++) {
          this.selected1.push(this.treatment_assign_list[i]._id);
        }
      }
      this.del = "treatment";
    },
    updateCheckall1() {
      if (this.selected1.length == this.treatment_assign_list.length) {
        this.isCheckAll1 = true;
      } else {
        this.isCheckAll1 = false;
      }
      this.del = "treatment";
    },
    async submitData2() {
      this.pid = this.$router.history.current.params.pid;

      const getData = {
        startdate: this.item.startdate,
        days: this.item.days,
        treatment_description: this.treatment_description,
        diagnosis_details: this.diagnosis_details,
      };
      console.log(getData);

      const header = { "x-access-token": this.$session.get("token") };
      axios
        .patch(
          "http://127.0.0.1:8000/api/prescription/update/" + this.pid,
          getData,
          { headers: header }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
      this.treatment_description = "";
      this.diagnosis_details = "";
      this.form1 = true;
    },
    async submitData1() {
      if (this.treatment == "" && this.nooftimes == "") {
        this.treatment_error = "*";
        this.nooftimes = "*";
      } else if (this.treatment == "") {
        this.treatment_error = "*";
      } else if (this.nooftimes == "") {
        this.nooftimes_error = "*";
      } else {
        const header = { "x-access-token": this.$session.get("token") };
        const getData = {
          prescription_id: this.pid,
          appointment_id: this.aid,
          treatment_id: this.treatment,
          number_of_times: this.nooftimes,
        };

        axios
          .post(
            "http://127.0.0.1:8000/api/treatmentassign/add/" +
              this.pid +
              "/" +
              this.aid,
            getData,
            { headers: header }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));
        this.assignResponsData1(
          await this.getTreatmentAssignData(await this.getTreatementData())
        );
        this.form2 = false;

        this.nooftimes = "";

        for (var i = 0; i < this.treatments.length; i++) {
          if (this.treatments[i]._id == this.treatment) {
            this.treatments.splice(i, 1);
          }
        }
        this.treatment = "";
      }
    },
    formstatus(status) {
      this.form1 = status;
    },
    form1status(status) {
      this.form2 = status;
      this.form1 = false;
    },
    async submitData() {
      if (this.medicine == "" && this.fraction == "" && this.supportive == "") {
        this.medicine_error = "*";
        this.fraction_error = "*";
        this.supportive_error = "*";
      } else if (this.medicine == "") {
        this.medicine_error = "*";
      } else if (this.fraction == "") {
        this.fraction_error = "*";
      } else if (this.supportive == "") {
        this.supportive_error = "*";
      } else {
        const getData = {
          prescription_id: this.pid,
          appointment_id: this.aid,
          medicine_id: this.medicine,
          fraction_id: this.fraction,
          supportive: this.supportive,
        };
        const header = { "x-access-token": this.$session.get("token") };
        this.form1 = false;
        this.form2 = true;
        axios
          .post(
            "http://127.0.0.1:8000/api/medicineassign/add/" +
              this.pid +
              "/" +
              this.aid,
            getData,
            { headers: header }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));

        this.assignResponsData(
          await this.getMedicineAssignData(
            await this.getMedicineData(await this.getFractionData())
          )
        );

        this.fraction = "";
        this.supportive = "";

        for (var i = 0; i < this.medicines.length; i++) {
          if (this.medicines[i]._id == this.medicine) {
            this.medicines.splice(i, 1);
          }
        }

        this.medicine = "";
      }
    },
    assignResponsData(response) {
      this.isCheckAll = false;
      this.selected = [];
      this.medicine_assign_list = response.data.result;
    },
    assignResponsData1(response) {
      (this.isCheckAll1 = false),
        (this.selected1 = []),
        (this.treatment_assign_list = response.data.result);
    },
    getMedicines() {
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .get("http://127.0.0.1:8000/api/medicine/list", {
          headers: header,
        })
        .then((res) => {
          this.medicines = res.data.result;
        });
    },
    getTreatments() {
      const header = { "x-access-token": this.$session.get("token") };
      axios
        .get("http://127.0.0.1:8000/api/treatment/list", {
          headers: header,
        })
        .then((res) => {
          this.treatments = res.data.result;
        });
    },
    async getMedicineData(res) {
      const header = { "x-access-token": this.$session.get("token") };
      var response = axios.get("http://127.0.0.1:8000/api/medicine/list", {
        headers: header,
      });
      this.fraction_list = res.data.result;
      return response;
    },
    async getMedicineAssignData(res) {
      const header = { "x-access-token": this.$session.get("token") };
      var response = await axios.get(
        "http://127.0.0.1:8000/api/medicineassign/list/" +
          this.pid +
          "/" +
          this.aid,
        { headers: header }
      );

      this.medicine_list = res.data.result;

      return response;
    },
    async getTreatementData() {
      const header = { "x-access-token": this.$session.get("token") };
      var res = await axios.get("http://127.0.0.1:8000/api/treatment/list", {
        headers: header,
      });
      return res;
    },
    async getTreatmentAssignData(res) {
      const header = { "x-access-token": this.$session.get("token") };
      var response = await axios.get(
        "http://127.0.0.1:8000/api/treatmentassign/list/" +
          this.pid +
          "/" +
          this.aid,
        { headers: header }
      );
      this.treatment_list = res.data.result;
      return response;
    },
    async getFractionData() {
      const header = { "x-access-token": this.$session.get("token") };
      var response = await axios.get(
        "http://127.0.0.1:8000/api/fraction/list",
        { headers: header }
      );

      return response;
    },
    getPrescriptionData() {
      this.pid = this.$router.history.current.params.pid;
      const header = { "x-access-token": this.$session.get("token") };

      axios
        .put(
          "http://127.0.0.1:8000/api/prescription/get/" + this.pid,
          this.pid,
          {
            headers: header,
          }
        )
        .then((response) => {
          console.log(response.data.result);
          this.item = response.data.result;
          this.item.startdate = this.item.startdate.split("T")[0];
        });
    },
  },

  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },
  async mounted() {
    if (!(this.$session.get("role") == "Doctor")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.pid = this.$router.history.current.params.pid;
    this.aid = this.$router.history.current.params.aid;
    this.getTreatementData();
    this.assignResponsData(
      await this.getMedicineAssignData(
        await this.getMedicineData(await this.getFractionData())
      )
    );
    this.assignResponsData1(
      await this.getTreatmentAssignData(await this.getTreatementData())
    );
    this.getMedicines();
    this.getTreatments();
    this.getPrescriptionData();
  },
};
</script>