import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CompanyView from '../views/Company/View.vue'
import CompanyCreate from '../views/Company/Create.vue'
import CompanyEdit from '../views/Company/Edit.vue'
import LoginView from '../views/LoginView.vue'
import EmployeeView from '../views/Employee/View.vue'
import EmployeeCreate from '../views/Employee/Create.vue'
import EmployeeEdit from '../views/Employee/Edit.vue'
// import router from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyView,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/company/create',
      name: 'companyCreate',
      component: CompanyCreate,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/company/:id/edit',
      name: 'companyEdit',
      component: CompanyEdit,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {auth: false}
    },
    {
      path: '/employee',
      name: 'employee',
      component: EmployeeView,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/employee/create',
      name: 'employeeCreate',
      component: EmployeeCreate,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    {
      path: '/employee/:id/edit',
      name: 'employeeEdit',
      component: EmployeeEdit,
      beforeEnter: (to, from, next) =>{
        if (localStorage.getItem("token") == null)
        {
          next('/login')
        }
        else
        {
          next()
        }
      }
    },
    
  ]

  // router.beforeEach((to, from, next) => {
  //   console.log('middleware is working')
  //   next()
  // })

})

export default router
