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
        profileImage: '',
    },
    mutations: {
        setCurrentUser(state, { currentUser, token }) {
            // state.currentUser = currentUser.data.attributes.avatar.record
            state.currentUser = currentUser
            state.signedIn = true
            state.token = token
            // state.profileImage = currentUser.data.attributes
            if(currentUser.role === 'admin'){
                state.admin = true
            }
        },
        unsetCurrentUser (state) {
            state.currentUser = {}
            state.signedIn = false
            state.token = null
            state.admin = false
            state.profileImage = ''
            router.push('/')
        },
        refresh (state, token) {
            state.signedIn = true
            state.token = token
        },
        getprofileImage (state, profileImage) {
            state.profileImage = profileImage
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
})