import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import GantiPassword from '../views/GantiPassword.vue'

import Customer from '../views/MainData/Customer.vue'
import Admin from '../views/MainData/Admin.vue'
import AdminRole from '../views/MainData/AdminRole.vue'

import PendingTask from '../views/Task/PendingTask.vue'

import FilterDepart from '../views/DataKaryawan/FilterDepart.vue'
import FilterLokasi from '../views/DataKaryawan/FilterLokasi.vue'
import Status from '../views/DataKaryawan/Status.vue'

import SuratKontrak from '../views/Dokumen/SuratKontrak.vue'

import DataPelamar from '../views/Rekruitmen/DataPelamar.vue'
import PermintaanKaryawanBaru from '../views/Rekruitmen/PermintaanKaryawanBaru.vue'
import SeleksiKaryawan from '../views/Rekruitmen/SeleksiKaryawan.vue'

import HistoryKehadiran from '../views/TimeAttendance/HistoryKehadiran.vue'
import IjinKaryawan from '../views/TimeAttendance/IjinKaryawan.vue'
import LemburanKaryawan from '../views/TimeAttendance/LemburanKaryawan.vue'
import ListKehadiranHarian from '../views/TimeAttendance/ListKehadiranHarian.vue'

import HistoryTraining from '../views//Training/HistoryTraining.vue'
import PermintaanTraining from '../views//Training/PermintaanTraining.vue'
import TrainingBerjalan from '../views//Training/TrainingBerjalan.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },{
    path: '/Uploads',
    name: 'Login',
    component: Login
  },
  {
    path: '/GantiPassword',
    name: 'GantiPassword',
    component: GantiPassword
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  
  {
    path: '/Customer',
    name: 'Customer',
    component: Customer
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/AdminRole',
    name: 'AdminRole',
    component: AdminRole
  }, 
 
  {
    path: '/PendingTask',
    name: 'PendingTask',
    component: PendingTask
  },

  {
    path: '/FilterDepart',
    name: 'FilterDepart',
    component: FilterDepart
  },

  {
    path: '/FilterLokasi',
    name: 'FilterLokasi',
    component: FilterLokasi
  },

  {
    path: '/Status',
    name: 'Status',
    component: Status
  },

  {
    path: '/SuratKontrak',
    name: 'SuratKontrak',
    component: SuratKontrak
  },

  {
    path: '/DataPelamar',
    name: 'DataPelamar',
    component: DataPelamar
  },

  {
    path: '/PermintaanKaryawanBaru',
    name: 'PermintaanKaryawanBaru',
    component: PermintaanKaryawanBaru
  },

  {
    path: '/SeleksiKaryawan',
    name: 'SeleksiKaryawan',
    component: SeleksiKaryawan  
  },

  {
    path: '/HistoryKehadiran',
    name: 'HistoryKehadiran',
    component: HistoryKehadiran
  },

  {
    path: '/IjinKaryawan',
    name: 'IjinKaryawan',
    component: IjinKaryawan
  },
  
  {
    path: '/LemburanKaryawan',
    name: 'LemburanKaryawan',
    component: LemburanKaryawan
  },

  {
    path: '/ListKehadiranHarian',
    name: 'ListKehadiranHarian',
    component: ListKehadiranHarian
  },

  {
    path: '/HistoryTraining',
    name: 'HistoryTraining',
    component: HistoryTraining
  },

  {
    path: '/PermintaanTraining',
    name: 'PermintaanTraining',
    component: PermintaanTraining
  },

  {
    path: '/TrainingBerjalan',
    name: 'TrainingBerjalan',
    component: TrainingBerjalan
  },
  
]

const router = new VueRouter({
  routes
})

export default router
