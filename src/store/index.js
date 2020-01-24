import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
import UserStore from '@/admin/vuex/stores/user_store';
import ProgramStore from '@/admin/vuex/stores/program_store';
import router from '@/router/routes'
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        UserStore,
        ProgramStore
    },
    state: {
        currentUser: {},
        signedIn: false,
        token: null,
        admin: false,
        file: null
    },
    mutations: {
        setCurrentUser(state, { currentUser, token }) {
            state.currentUser = currentUser
            state.signedIn = true
            state.token = token
            if(currentUser.role === 'admin'){
                state.admin = true
            }
        },
        unsetCurrentUser (state) {
            state.currentUser = {}
            state.signedIn = false
            state.token = null
            state.admin = false
            router.push('/')
        },
        refresh (state, token) {
            state.signedIn = true
            state.token = token
        },
        getFile (state, file) {
            state.file = file
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
})