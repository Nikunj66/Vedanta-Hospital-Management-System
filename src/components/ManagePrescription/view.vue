<template>
  <div>
    <section class="content-header">
      <h1>Manage Prescription</h1>
      <ol class="breadcrumb">
        <li>
          <a href="/"><i class="fa fa-dashboard"></i> Home</a>
        </li>
        <li>
          <a href="/#/managepatient"><i class="fa fa-user"></i>Patient</a>
        </li>
        <li class="active">
          <a href=""><i class="fa fa-book"></i>Prescription</a>
        </li>
      </ol>
    </section>
    <br />
    <div class="row">
      <div class="col-sm-12">
        <div class="pull-right">
          <a
            :href="'/#/manageprescription/add/' + pid"
            style="margin-left: -6%"
            class="btn btn-primary"
            ><i class="fa fa-plus"></i
          ></a>
          <button
            class="btn btn-danger"
            style="margin-left: 2%"
            @click="deleteData()"
          >
            <i class="fa fa-trash"></i>
          </button>

          <a
            href="/#/managepatient"
            class="btn btn-default"
            style="margin-left: 2%"
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
            <h3 class="box-title">Patient List</h3>
          </div>
          <div class="box-body">
            <table id="table1" class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th class="text-center" style="width: 1px"></th>
                  <th class="text-center"></th>
                  <th class="text-center">
                    <input
                      type="date"
                      v-model="filter.start_date"
                      @change="setItemList"
                      class="form-control"
                    />
                  </th>
                  <th class="text-center">
                    <input
                      type="text"
                      v-model="filter.days"
                      @change="setItemList"
                      class="form-control"
                      placeholder="Enter Days"
                    />
                  </th>
                  <th class="text-center" colspan="2"></th>
                  <th class="text-center"></th>
                </tr>
                <tr>
                  <th class="text-center" style="width: 1px">
                    <input
                      type="checkbox"
                      @click="checkAll()"
                      v-model="isCheckAll"
                    />
                  </th>
                  <th class="text-center">No</th>
                  <th class="text-center">Start Date</th>
                  <th class="text-center">Days</th>
                  <th class="text-center" colspan="2">Action</th>
                  <th class="text-center">Appointment</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in items.slice().reverse()"
                  track-by="$index"
                  :key="item._id"
                >
                  <td style="width: 1px">
                    <input
                      name="selected"
                      type="checkbox"
                      :value="item._id"
                      v-model="selected"
                      @change="updateCheckall()"
                    />
                  </td>
                  <td class="text-center">{{ (index = index + 1) }}</td>
                  <td class="text-center">
                    {{ item.startdate.split("T")[0] }}
                  </td>
                  <td class="text-center">{{ item.days }}</td>
                  <td class="text-center">
                    <a
                      :href="
                        '/#/manageprescription/edit/' + pid + '/' + item._id
                      "
                      class="btn btn-primary"
                      ><i class="fa fa-pencil"> </i
                    ></a>
                  </td>
                  <td class="text-center">
                    <button
                      @click="status(item._id)"
                      class="btn"
                      :class="{
                        'btn-danger': item.is_active,
                        'btn-warning': !item.is_active,
                      }"
                    >
                      <i
                        class="fa"
                        :class="{
                          'fa-remove': item.is_active,
                          'fa-undo': !item.is_active,
                        }"
                      >
                      </i>
                    </button>
                  </td>
                  <td class="text-center">
                    <a
                      :href="'/#/manageappointment/' + item._id"
                      class="btn btn-primary"
                      v-if="index == 1"
                      ><i class="fa fa-plus"> </i
                    ></a>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
          </div>
          <!-- /.box-body -->
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
        </div>
        <!-- /.box -->
      </div>
      <!-- /.col -->
    </div>
  </div>
  <!-- <div>{{info}}</div> -->
</template>
<script>
import pagination from "./../../views/admin/pagination.vue";
import axios from "axios";
export default {
  components: { pagination },
  data() {
    return {
      items: null,
      pid: null,
      id: null,
      isCheckAll: false,
      selected: [],
      totalNumberOfItem: 0,
      totalNumberOfPage: 0,
      perPageItem: 0,
      currentpage: 1,
      startIndex: 0,
      endIndex: 0,
      filter: {},
      params: {},
      pagination: {},
    };
  },
  methods: {
    async setItemList(page = 1) {
      this.pid = this.$router.history.current.params.pid;
      this.params = { filter: this.filter };
      if (page > 1) {
        this.params.page = page;
      }
      console.log(this.params);
      const header = { "x-access-token": this.$session.get("token") };
      var res = await axios.get(
        "http://127.0.0.1:8000/api/prescription/list/" + this.pid,
        {
          params: this.params,
          headers: header,
        }
      );
      console.log(res);
      this.assignResponsData(res);
      return res;
    },
    async loadpage(url) {
      this.$router.push(url);
      this.assignResponsData(await this.getData());
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.selected = [];
      if (this.isCheckAll) {
        for (var i = 0; i < this.items.length; i++) {
          this.selected.push(this.items[i]._id);
        }
      }
    },
    updateCheckall() {
      if (this.selected.length == this.items.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
    async getData() {
      var currentpage =
        this.$route.query.page == null || this.$route.query.page <= 0
          ? this.currentpage
          : this.$route.query.page;
      this.pid = this.$router.history.current.params.pid;
      this.$session.set("patient_id", this.pid);
      const header = { "x-access-token": this.$session.get("token") };
      var response = await axios.get(
        "http://127.0.0.1:8000/api/prescription/list" +
          "/" +
          this.pid +
          "?page=" +
          currentpage,
        {
          headers: header,
        }
      );
      return response;
    },
    status(id) {
      this.pid = this.$router.history.current.params.pid;
      var obj = this.items.find(function (item) {
        return item._id == id;
      });
      const header = { "x-access-token": this.$session.get("token") };
      if (obj.is_active) {
        axios
          .post(
            "http://127.0.0.1:8000/api/prescription/deactivate/" +
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
            "http://127.0.0.1:8000/api/prescription/activate/" +
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
      this.isCheckAll = false;
      this.selected = [];
      this.items = response.data.result;
      this.pagination = response.data.pagination;
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
        "http://127.0.0.1:8000/api/prescription/delete/" + this.pid,
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
    if (!(this.$session.get("role") == "Admin")) {
      this.$session.destroy();
      this.$router.push("/auth/login");
    }
    this.assignResponsData(await this.setItemList());
  },
};
</script>
