import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from '@/store/index.js'
Vue.use(VueRouter)

import Login from '@/components/pages/Login.vue'
import AccessDenied from "@/components/errors/AccessDenied.vue";
import NotFound from "@/components/errors/NotFoundPage.vue";
import Dashboard from "@/components/pages/Dashboard.vue";
import Home from "@/components/pages/Home.vue";
import UserProfile from "@/components/pages/Userprofile.vue";
import AdminDashboard from "@/admin/components/Dashboard.vue";
import AdminHome from "@/admin/components/Home.vue";
import Users from "@/admin/components/UsersList.vue";

const router = new VueRouter({
    mode: 'history',
    routes:[
        { path: '/', component: Login, name: 'root_path' },
        { path: '/home', component: Home, name: 'home_path', beforeEnter: guard },
        { path: '/notfound', component: NotFound},
        { path: '/accessdenied', component: AccessDenied },
        { path: '/dashboard', component: Dashboard, name: 'dashboard_path', beforeEnter: guard },
        { path: '/admin/home', component: AdminHome, name: 'admin_home_path', beforeEnter: adminGuard },
        { path: '/admin/dashboard', component: AdminDashboard, name: 'admin_dashboard_path', beforeEnter: adminGuard },
        { path: '/users', component: Users, name: 'users_path', beforeEnter: adminGuard },
        { path: '/myprofile', component: UserProfile, name: 'user_path', beforeEnter: guard },
        { path: '*' , redirect: '/notfound'}      
    ]
});
function guard(to, from, next){
    if(store.state.signedIn){
        next();
    }
    else{
        next('/')
    }
}
function adminGuard(to, from, next){
    if(store.state.admin){
        next();
    }
    else{
        if(store.state.signedIn){
            next('/accessdenied');
        }
        else{
            next('/'); 
        }
    }
}


export default router;