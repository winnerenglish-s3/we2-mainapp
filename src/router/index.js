import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

 var firebaseConfig = {
   apiKey: "AIzaSyAYLNGOWZtYLE0zS4nqVTVkvfilQ0QAraM",
   authDomain: "winnerenglish2-e0f1b.firebaseapp.com",
   databaseURL: "https://winnerenglish2-e0f1b.firebaseio.com",
   projectId: "winnerenglish2-e0f1b",
   storageBucket: "winnerenglish2-e0f1b.appspot.com",
   messagingSenderId: "771031700651",
   appId: "1:771031700651:web:a7f06b7595c5539a7b13ee",
   measurementId: "G-HW612TDMZF"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

 export const db = firebase.firestore();

export const auth = firebase.auth();
export const ts = firebase.firestore.FieldValue.serverTimestamp()
 



export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.MODE === 'ssr'
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  return Router
})
