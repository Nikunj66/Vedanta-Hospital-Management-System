<template>
  <div>
    <section class="content-header">
      <h1>Manage Appointment</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/#/medicinedistributor/dashboard"
            ><i class="fa fa-dashboard"></i> Home</a
          >
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
          <a href="/#/medicinedistributor/dashboard" class="btn btn-default"
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
                  <th class="text-center">No</th>
                  <th class="text-center">From Time</th>
                  <th class="text-center">To Time</th>

                  <th class="text-center">Assign Medicine</th>
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
                        '/#/medicinedistributor/medicineassign/' +
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

    async getData() {
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

      var response = await axios.post(
        "http://127.0.0.1:8000/api/doctorpatientlist/list",
        getData,
        {
          headers: header,
        }
      );

      return response;
    },
    status(id) {
      var obj = this.items.find(function (item) {
        return item._id == id;
      });
      const header = { "x-access-token": this.$session.get("token") };
      if (obj.is_active) {
        axios
          .post(
            "http://127.0.0.1:8000/api/appointment/deactivate/" +
              this.pid +
              "/" +
              id,
            id,
            {
              headers: header,
            }
          )
          .then((res) => {
            console.log(res);
          });
      } else {
        axios
          .post(
            "http://127.0.0.1:8000/api/appointment/activate/" +
              this.pid +
              "/" +
              id,
            id,
            {
              headers: header,
            }
          )
          .then((res) => {
            console.log(res);
          });
      }
      obj.is_active = !obj.is_active;
    },
    assignResponsData(response) {
      this.items = response.data.result;
      this.totalNumberOfItem = response.data.pagination.total;
      this.totalNumberOfPage = Math.ceil(response.data.pagination.numberofpage);
      this.perPageItem = response.data.pagination.perpageitem;
      this.currentpage = response.data.pagination.currentpage;
      this.startIndex = response.data.pagination.startindex;
      this.endIndex = response.data.pagination.endindex;
    },
    async deleteData() {
      const header = { "x-access-token": this.$session.get("token") };
      var response = await axios.delete(
        "http://127.0.0.1:8000/api/appointment/delete/" + this.pid,
        {
          data: {
            id: this.selected,
          },
          headers: header,
        }
      );
      if (response.data.success) {
        this.assignResponsData(await this.getData());
      }
    },
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push("/auth/login");
    }
  },

  async mounted() {
    if (!(this.$session.get("role") == "Medicine distributor")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.assignResponsData(await this.getData());
  },
};
</script>
