<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar" v-if="this.$session.get('role') == 'Admin'">
      <ul class="sidebar-menu">
        <li class="active treeview">
          <a href="/#/">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-users"></i>
            <span>Manage Staff Member</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/managestaff/add"
                ><i class="fa fa-pencil"></i> Add Staff Member</a
              >
            </li>
            <li>
              <a href="/#/managestaff"
                ><i class="fa fa-eye"></i> View Staff Member</a
              >
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-user"></i> <span>Manage Patient</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/managepatient/add"
                ><i class="fa fa-pencil"></i> Add Patient</a
              >
            </li>
            <li>
              <a href="/#/managepatient"
                ><i class="fa fa-eye"></i> View Patient</a
              >
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-plus-circle"></i> <span>Manage Medicine</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/managemedicine/add"
                ><i class="fa fa-pencil"></i> Add Medicine</a
              >
            </li>
            <li>
              <a href="/#/managemedicine"
                ><i class="fa fa-eye"></i> View Medicine</a
              >
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-medkit"></i> <span>Manage Treatment</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/managetreatment/add"
                ><i class="fa fa-pencil"></i> Add Treatment</a
              >
            </li>
            <li>
              <a href="/#/managetreatment"
                ><i class="fa fa-eye"></i> View Treatment</a
              >
            </li>
          </ul>
        </li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-clock-o"></i> <span>Manage Slot</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/manageslot/add"
                ><i class="fa fa-pencil"></i> Add Slot</a
              >
            </li>
            <li>
              <a href="/#/manageslot"><i class="fa fa-eye"></i> View Slot</a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section
      class="sidebar"
      v-if="this.$session.get('role') == 'Medicine distributor'"
    >
      <ul class="sidebar-menu">
        <li class="active treeview">
          <a href="/#/medicinedistributor/dashboard">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-plus-circle"></i> <span>Manage Medicine</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/medicinedistributor/managemedicine/add"
                ><i class="fa fa-pencil"></i> Add Medicine</a
              >
            </li>
            <li>
              <a href="/#/medicinedistributor/managemedicine"
                ><i class="fa fa-eye"></i> View Medicine</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section class="sidebar" v-if="this.$session.get('role') == 'Doctor'">
      <ul class="sidebar-menu">
        <li class="active treeview">
          <a href="/#/doctor/dashboard">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>
        <li class="active treeview">
          <a href="/#/doctor/viewappointment">
            <i class="fa fa-eye"></i> <span>View Appointment</span>
          </a>
        </li>
      </ul>
    </section>
    <section class="sidebar" v-if="this.$session.get('role') == 'Receptionist'">
      <ul class="sidebar-menu">
        <li class="active treeview">
          <a href="/#/receptionist/dashboard">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-user"></i> <span>Manage Patient</span>
            <i class="fa fa-angle-left pull-right"></i>
          </a>
          <ul class="treeview-menu">
            <li class="active">
              <a href="/#/receptionist/managepatient/add"
                ><i class="fa fa-pencil"></i> Add Patient</a
              >
            </li>
            <li>
              <a href="/#/receptionist/managepatient"
                ><i class="fa fa-eye"></i> View Patient</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </section>

    <!-- /.sidebar -->
  </aside>
</template>
<script>
export default {
  name: "sidebar",
};
</script>