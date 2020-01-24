import Vue from 'vue'
import VueRouter from 'vue-router'
// import { store } from '@/store/index.js'
Vue.use(VueRouter)

import Dashboard from "@/admin/components/Dashboard.vue";
import Home from "@/admin/components/Home.vue";
import Users from "@/admin/components/UsersList.vue";

const router = new VueRouter({
    mode: 'history',
    routes:[
        { path: '/admin/home', component: Home, name: 'home_path' },
        { path: '/admin/dashboard', component: Dashboard, name: 'dashboard_path' },
        { path: '/users', component: Users, name: 'users_path' },
    ]
});

// router.beforeEach((to, from, next) => {
//     if ( !store.state.signedIn ){
//         next('/')
//     }
//     else {
//         if ( !store.state.admin === 'admin'){
//             next('/notfound');
//         }
//     }       
//   })

export default router;