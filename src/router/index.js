import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import GantiPassword from '../views/GantiPassword.vue'

import Customer from '../views/MainData/Customer.vue'
import Admin from '../views/MainData/Admin.vue'
import AdminRole from '../views/MainData/AdminRole.vue'

import PendingTask from '../views/Task/PendingTask.vue'


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
  
  
  
]

const router = new VueRouter({
  routes
})

export default router
