import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import ProfileEdit from '../views/ProfileEdit.vue'
import Hot from '../views/Hot.vue'
import New from '../views/New.vue'
import CreatePost from '../views/CreatePost.vue'
import Users from '../views/Users.vue'


Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    redirect: '/hot' 
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      layout: 'empty'
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      layout: 'empty'
    },
    component: Register
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { auth: true},
    component: Profile
  },
  {
    path: '/settings',
    name: 'ProfileEdit',
    meta: { auth: true},
    component: ProfileEdit
  },
  {
    path: '/users',
    name: 'Users',
    meta: { auth: true},
    component: Users
  },
  {
    path: '/hot',
    name: 'Hot',
    meta: { auth: true},
    component: Hot
  },
  {
    path: '/new',
    name: 'New',
    meta: { auth: true},
    component: New
  },
  {
    path: '/new-post',
    name: 'Create Post',
    meta: { auth: true},
    component: CreatePost
  },
  {
    path: '/about',
    name: 'About',
    meta: { auth: true},
    // meta: {
    //   layout: 'empty'
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser 
  const requiredAuth = to.matched.some(record => record.meta.auth) // изучить
  
  if(requiredAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})
export default router
