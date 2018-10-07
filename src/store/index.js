import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: '',
    username: '',
  },
  mutations: {
    setToken(state, t) {
      state.token = t;
    },
    setUsername(state, u) {
      state.username = u;
    },
    resetToken(state) {
      state.token = '';
      state.username = '';
    },
  },
  actions: {

  },
});
