import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueTimeago from 'vue-timeago'
import './registerServiceWorker'
import router from './router'
import store from './store'
import localizeFilter from './filters/localize.filter'
import dateFilter from './filters/date.filter'
import messagePlugin from '@/utils/message.plugin'
import 'uikit/dist/css/uikit.min.css'
import 'uikit/dist/js/uikit.min.js'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons.min.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import Loader from '@/components/Loader'

import './assets/style/theme.scss'

Vue.config.productionTip = false

Vue.filter('localize', localizeFilter)
Vue.filter('date', dateFilter)
Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.component('Loader', Loader)
UIkit.use(Icons)
Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'ru',
  locales: {
    ru: require('date-fns/locale/ru')
  }
})

var firebaseConfig = {
  apiKey: "AIzaSyBHeUSidy9NJZuTA7RE_rir0jPsmsZDJRc",
  authDomain: "my-app-e9365.firebaseapp.com",
  databaseURL: "https://my-app-e9365-default-rtdb.firebaseio.com",
  projectId: "my-app-e9365",
  storageBucket: "my-app-e9365.appspot.com",
  messagingSenderId: "663672132629",
  appId: "1:663672132629:web:93a16b9b38794465362a1c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  
})