import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from './views/auth/auth.vue'
import login from './components/login.vue'
import register from './components/register.vue'
import vhms from './views/admin/master.vue'
import dashboard from './components/dashboard.vue'
import managestaff from './components/ManageStaffMember/view.vue'
import addstaff from './components/ManageStaffMember/add.vue'
import editstaff from './components/ManageStaffMember/edit.vue'
import managepatient from './components/ManagePatient/view.vue'
import addpatient from './components/ManagePatient/add.vue'
import editpatient from './components/ManagePatient/edit.vue'
import manageprescription from './components/ManagePrescription/view.vue'
import addprescription from './components/ManagePrescription/add.vue'
import editprescription from './components/ManagePrescription/edit.vue'
import managemedicine from './components/ManageMedicine/view.vue'
import addmedicine from './components/ManageMedicine/add.vue'
import editmedicine from './components/ManageMedicine/edit.vue'
import manageappointment from './components/ManageAppointment/view.vue'
import addappointment from './components/ManageAppointment/add.vue'
import editappointment from './components/ManageAppointment/edit.vue' 
import manageslot from './components/ManageSlot/view.vue'
import addslot from './components/ManageSlot/add.vue'
import editslot from './components/ManageSlot/edit.vue' 
import managetreatment from './components/ManageTreatment/view.vue'
import addtreatment from './components/ManageTreatment/add.vue'
import edittreatment from './components/ManageTreatment/edit.vue'
import managemedicineandtreatmentassign from './components/ManageMedicine&TreatmentAssign/view.vue'
import viewappointment from './components/Doctor/ManageAppointment/view.vue'
import managemedicineandtreatmentassignbydoctor from './components/Doctor/ManageMedicine&TreatmentAssign/view.vue'
import managemedicinebymedicinedistributor from './components/MedicineDistributor/ManageMedicine/view.vue'
import addmedicinebymedicinedistributor from './components/MedicineDistributor/ManageMedicine/add.vue'
import editmedicinebymedicinedistributor from './components/MedicineDistributor/ManageMedicine/edit.vue'
import managepatientbyreceptionist from './components/Receptionist/ManagePatient/view.vue'
import addpatientbyreceptionist from './components/Receptionist/ManagePatient/add.vue'
import editpatientbyreceptionist from './components/Receptionist/ManagePatient/edit.vue'
import manageprescriptionbyreceptionist from './components/Receptionist/ManagePrescription/view.vue'
import addprescriptionbyreceptionist from './components/Receptionist/ManagePrescription/add.vue'
import editprescriptionbyreceptionist from './components/Receptionist/ManagePrescription/edit.vue'
import manageappointmentbyreceptionist from './components/Receptionist/ManageAppointment/view.vue'
import addappointmentbyreceptionist from './components/Receptionist/ManageAppointment/add.vue'
import editappointmentbyreceptionist from './components/Receptionist/ManageAppointment/edit.vue'
import viewappointmentbymedicinedistributor from './components/MedicineDistributor/ManageAppointment/view.vue'
import medicineassignbymedicinedistributor from './components/MedicineDistributor/ManageMedicineAssign/view.vue'
import medicinedistributordashboard from './components/MedicineDistributor/dashboard.vue'
import doctordashboard from './components/Doctor/dashboard.vue'
import receptionistdashboard from './components/Receptionist/dashboard.vue'
import viewtodayappointmentbyreceptionist from './components/Receptionist/viewAppointment.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: "/auth",
        component: auth,
        children: [{
            path: "/auth/login",
            component: login,
        },
        {
            path: "/auth/register",
            component: register
        }
        ]
    },
    {

        path:"/",
        component: vhms,
        children: [
            {
                path:'/',
                component: dashboard,
            },
            {
                name:'viewstaff',
                path:'/managestaff',
                component: managestaff
            },
            {
                mame:'addstaff',
                path:'/managestaff/add',
                component:addstaff
            },
            {
                name:'editstaff',
                path:'/managestaff/edit/:id',
                component:editstaff
            },
            {
                name:'viewpatient',
                path:'/managepatient',
                component:managepatient
            },
            {
                name:'addpatient',
                path:'/managepatient/add',
                component:addpatient
            },
            {
                name:'editpatient',
                path:'/managepatient/edit/:id',
                component:editpatient
            },
            {
                name:'viewprescription',
                path:'/manageprescription/:pid',
                component:manageprescription
            },
            {
                name:'addprescription',
                path:'/manageprescription/add/:pid',
                component:addprescription

            },
            {
                name:'editprescription',
                path:'/manageprescription/edit/:pid/:id',
                component:editprescription
            },
            {
                name:'viewmedicine',
                path:'/managemedicine',
                component:managemedicine
            },
            {
                name:'addmedicine',
                path:'/managemedicine/add',
                component:addmedicine

            },
            {
                name:'editmedicine',
                path:'/managemedicine/edit/:id',
                component:editmedicine
            },
            {
                name:'viewappointment',
                path:'/manageappointment/:pid',
                component:manageappointment
            },
            {
                name:'addappointment',
                path:'/manageappointment/add/:pid',
                component:addappointment
            },
            {
                name:'editappointment',
                path:'/manageappointment/edit/:pid/:id',
                component:editappointment
            },
            {
                name:'viewslot',
                path:'/manageslot',
                component:manageslot
            },
            {
                name:'addslot',
                path:'/manageslot/add',
                component:addslot

            },
            {
                name:'editslot',
                path:'/manageslot/edit/:id',
                component:editslot
            },
            {
                name:'viewtreatment',
                path:'/managetreatment',
                component:managetreatment
            },
            {
                name:'addtreatment',
                path:'/managetreatment/add',
                component:addtreatment

            },
            {
                name:'edittreatment',
                path:'/managetreatment/edit/:id',
                component:edittreatment
            },
            {
                name:'viewmedicineandtreatmentassign',
                path:'/managemedicineandtreatmentassign/:pid/:aid',
                component:managemedicineandtreatmentassign
            },
            {
                name:'dashboard',
                path:'/doctor/dashboard',
                component:doctordashboard
            },
            {
                name:'viewappointmentbydoctor',
                path:'/doctor/viewappointment',
                component:viewappointment
            },
            {
                name:'medicineandtreatmentassignbydoctor',
                path:'/doctor/managemedicineandtreatmentassign/:pid/:aid',
                component:managemedicineandtreatmentassignbydoctor
            },
            {
                name:'dashboard',
                path:'/medicinedistributor/dashboard',
                component:medicinedistributordashboard
            },
            
            {
                name:'viewmedicine',
                path:'/medicinedistributor/managemedicine',
                component:managemedicinebymedicinedistributor
            },
            {
                name:'addmedicine',
                path:'/medicinedistributor/managemedicine/add',
                component:addmedicinebymedicinedistributor

            },
            {
                name:'editmedicine',
                path:'/medicinedistributor/managemedicine/edit/:id',
                component:editmedicinebymedicinedistributor
            },
            {
                name:'viewappointment',
                path:'/medicinedistributor/viewappointment',
                component:viewappointmentbymedicinedistributor
            },
            {
                name:'viewmedicineandtreatmentassign',
                path:'/medicinedistributor/medicineassign/:pid/:aid',
                component:medicineassignbymedicinedistributor
            },
            {
                name:'dashboard',
                path:'/receptionist/dashboard',
                component:receptionistdashboard
            },
            {
                name:'viewappointment',
                path:'/receptionist/viewappointment',
                component:viewtodayappointmentbyreceptionist
            },
            {
                name:'viewpatient',
                path:'/receptionist/managepatient',
                component:managepatientbyreceptionist
            },
            {
                name:'addpatient',
                path:'/receptionist/managepatient/add',
                component:addpatientbyreceptionist
            },
            {
                name:'editpatient',
                path:'/receptionist/managepatient/edit/:id',
                component:editpatientbyreceptionist
            },
            {
                name:'viewprescription',
                path:'/receptionist/manageprescription/:pid',
                component:manageprescriptionbyreceptionist
            },
            {
                name:'addprescription',
                path:'/receptionist/manageprescription/add/:pid',
                component:addprescriptionbyreceptionist

            },
            {
                name:'editprescription',
                path:'/receptionist/manageprescription/edit/:pid/:id',
                component:editprescriptionbyreceptionist
            },
            {
                name:'viewappointment',
                path:'/receptionist/manageappointment/:pid',
                component:manageappointmentbyreceptionist
            },
            {
                name:'addappointment',
                path:'/receptionist/manageappointment/add/:pid',
                component:addappointmentbyreceptionist
            },
            {
                name:'editappointment',
                path:'/receptionist/manageappointment/edit/:pid/:id',
                component:editappointmentbyreceptionist
            },
            
            
        ]
    }
]
const router = new VueRouter({
    routes
});

export default router;