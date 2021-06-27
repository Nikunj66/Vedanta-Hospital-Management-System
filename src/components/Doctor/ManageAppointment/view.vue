<template>
  <div>
    <section class="content-header">
      <h1>Manage Appointment</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/#/doctor/dashboard"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a class="active" href=""><i class="fa fa-clock-o"></i>Appointment</a>
        </li>
      </ol>
    </section>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <div class="pull-right">
          <a href="/#/doctor/dashboard" class="btn btn-default"
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
            <h3 class="box-title">Appointment List</h3>
          </div>
          <div class="box-body">
            <table id="table1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th class="text-center"></th>
                  <th class="text-center">
                    <input type="time" name="from_time" class="form-control" />
                  </th>
                  <th class="text-center">
                    <input type="time" name="to_time" class="form-control" />
                  </th>

                  <th class="text-center"></th>
                </tr>
                <tr>
                  <th class="text-center">No</th>
                  <th class="text-center">From Time</th>
                  <th class="text-center">To Time</th>

                  <th class="text-center">Assign Medicine and Treatment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="item._id">
                  <td class="text-center">{{ (index = index + 1) }}</td>
                  <td class="text-center">{{ item.from_time }}</td>
                  <td class="text-center">{{ item.to_time }}</td>

                  <td class="text-center">
                    <a
                      :href="
                        '/#/doctor/managemedicineandtreatmentassign/' +
                        item.prescription_id +
                        '/' +
                        item._id
                      "
                      class="btn btn-primary"
                      ><i class="fa fa-plus"> </i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
          <div class="box-footer">
            <pagination
              :BaseUrl="pid + '?page='"
              :StartIndex="startIndex"
              :EndIndex="endIndex"
              :TotalNumberOfItem="totalNumberOfItem"
              :CurrentPage="currentpage"
              :TotalNumberOfPage="totalNumberOfPage"
              @loadPage="loadpage"
            />
          </div>
          <!-- /.box-body -->
        </div>
        <!-- /.box -->
      </div>
      <!-- /.col -->
    </div>
  </div>
  <!-- <div>{{info}}</div> -->
</template>
<script>
import pagination from "./../../../views/admin/pagination.vue";
import axios from "axios";
export default {
  components: { pagination },
  data() {
    return {
      items: null,
      is_active: true,
      count: 1,
      pid: null,
      staff_id: "",
      totalNumberOfItem: 0,
      totalNumberOfPage: 0,
      perPageItem: 0,
      currentpage: 1,
      startIndex: 0,
      endIndex: 0,
      staff_members: [],
      current_Date: "",
    };
  },
  methods: {
    async loadpage(url) {
      this.$router.push(url);
      this.assignResponsData(
        await this.getData(await this.getStaffMemberData())
      );
    },

    async getStaffId() {
      const header = { "x-access-token": this.$session.get("token") };
      var res = await axios.get("http://127.0.0.1:8000/api/staffmember/list", {
        headers: header,
      });

      return res;
    },
    async getData(res) {
      //   var currentpage =
      //     this.$route.query.page == null || this.$route.query.page <= 0
      //       ? this.currentpage
      //       : this.$route.query.page;
      this.staff_members = res.data.result;
      for (var i = 0; i < this.staff_members.length; i++) {
        if (this.staff_members[i].username == this.$session.get("username")) {
          this.staff_id = this.staff_members[i]._id;

          break;
        }
      }
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
        staff_id: this.staff_id,
        date: this.current_Date,
      };

      var response = await axios.post(
        "http://127.0.0.1:8000/api/doctorpatientlist/list",
        getData,
        {
          headers: header,
        }
      );

      return response;
    },

    assignResponsData(response) {
      this.isCheckAll = false;
      this.selected = [];
      this.items = response.data.result;
      this.totalNumberOfItem = response.data.pagination.total;
      this.totalNumberOfPage = Math.ceil(response.data.pagination.numberofpage);
      this.perPageItem = response.data.pagination.perpageitem;
      this.currentpage = response.data.pagination.currentpage;
      this.startIndex = response.data.pagination.startindex;
      this.endIndex = response.data.pagination.endindex;
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
    this.assignResponsData(await this.getData(await this.getStaffId()));
  },
};
</script>
