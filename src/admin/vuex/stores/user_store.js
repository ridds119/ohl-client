import helpers from '../../helpers';

const UserStore = {
  namespaced: true,
  state: {
    users: [],
    user: {},
    errors: {},
    progress: '',
    pagination: {}
  },
  mutations: {
    one(state, data) {
      state.errors = {}
      state.user = data.user;
      return state;
    },
    many(state, users) {
      state.users = users;
      state.pagination = users.pagination;
      return state;
    },
    progress(state, step) {
      state.progress = step;
      return state.progress;
    },
    errors(state, data) {
      state.errors = helpers.showErrors(data);
      return state.errors;
    }
  },
  actions: {
    index(context, query) {
      this.$http.secured.get('/users',{ data: query })
      .then( response => {
        context.commit('many', response.data)
      })
    },
    // new(context) {
    //   this.$http.secured.get('/users/new',)
    //   .then( response => {
    //     context.commit('one', response.data)
    //   })
    // },
    create(context, user) {
        this.$http.secured.post('/users',{ user: user })
        .then( response => {
          context.commit('many', response.data)
        })
        .catch( error => {
          context.commit('errors', error);
        })
    },
    // edit(context, id) {
    //   this.$http.secured.patch(`users/${id}`)
    //   .then( response => {
    //     context.many('one', response.data)
    //   })
    // },
    update(context, user) {
      this.$http.secured.patch(`users/${user.id}`,{ user: user })
      .then( response => {
        context.many('one', response.data)
      })
      .catch( error => {
        context.commit('errors', error);
      })
    },
    destroy(context, user_id) {
      return new Promise((resolve, reject) => {
        this.$http.secured.delete(`users/${user_id}`)
        .then( response => {
          context.commit('one', response.data)
        })
        .then(response => { 
          resolve(response)
        })
        .catch( error => {
          reject(error)
        })
      })
    }
  }
};

export default UserStore;
