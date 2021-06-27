<template>
  <div>
    <section class="content-header">
      <h1>Manage Staff Member</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/managestaff"><i class="fa fa-users"></i>StaffMember</a>
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
          <a href="/#/managestaff" class="btn btn-default"
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
                    <label for="id-Full_Name">Full Name : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter full name"
                      v-model="item.name"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Contact_No">Contact No : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter contact no"
                      v-model="item.contactno"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="id-Full_Name">Username : </label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter username"
                      v-model="item.username"
                    />
                  </div>
                </div>

                <div class="col-sm-6">
                  <div class="form-group">
                    <label
                      >Role<span style="color: red">{{ role_error }}</span
                      >:
                    </label>
                    <select class="form-control" v-model="item.role">
                      <option
                        v-if="item.role == 'Admin'"
                        value="Admin"
                        selected
                      >
                        Admin
                      </option>
                      <option v-else value="Admin">Admin</option>
                      <option
                        v-if="item.role == 'Receptionist'"
                        value="Receptionist"
                        selected
                      >
                        Receptionist
                      </option>
                      <option v-else value="Receptionist">Receptionist</option>
                      <option
                        v-if="item.role == 'Doctor'"
                        value="Doctor"
                        selected
                      >
                        Doctor
                      </option>
                      <option v-else value="Doctor">Doctor</option>
                      <option
                        v-if="item.role == 'Assistant'"
                        value="Assistant"
                        selected
                      >
                        Assistant
                      </option>
                      <option v-else value="Assistant">Assistant</option>
                      <option
                        v-if="item.role == 'Medicine distributor'"
                        value="Medicine distributor"
                        selected
                      >
                        Medicine distributor
                      </option>
                      <option value="Medicine distributor">
                        Medicine Distributor
                      </option>
                    </select>
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
  name: "edit",
  data() {
    return {
      id: "",
      item: null,
      role: null,
      name_error: "",
      contactno_error: "",
      username_error: "",
      password_error: "",
      role_error: "",
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
      .put("http://127.0.0.1:8000/api/staffmember/get/" + this.id, this.id, {
        headers: header,
      })
      .then((response) => {
        this.item = response.data.result;
      });
  },
  methods: {
    submitData() {
      if (
        this.name == "" &&
        this.contactno == "" &&
        this.username == "" &&
        this.password == "" &&
        this.role == ""
      ) {
        this.name_error = "*";
        this.contactno_error = "*";
        this.username_error = "*";
        this.password_error = "*";
        this.role_error = "*";
      } else if (this.name == "") {
        this.name_error = "*";
      } else if (this.contactno == "") {
        this.name_error = "";
        this.contactno_error = "*";
      } else if (this.username == "") {
        this.contactno_error = "";
        this.username_error = "*";
      } else if (this.password == "") {
        this.username_error = "";
        this.password_error = "*";
      } else if (this.role == "") {
        this.password_error = "";
        this.role_error = "*";
      } else {
        const getData = {
          name: this.item.name,
          contactno: this.item.contactno,
          username: this.item.username,
          role: this.item.role,
        };

        const header = { "x-access-token": this.$session.get("token") };
        axios
          .patch(
            "http://127.0.0.1:8000/api/staffmember/update/" + this.item._id,
            getData,
            { headers: header }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((error) => console.log(error));
        this.$router.push("/managestaff");
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