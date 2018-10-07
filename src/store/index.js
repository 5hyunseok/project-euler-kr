import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    token: localStorage.token,
    username: localStorage.username,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  },
  mutations: {
    setToken(state, t) {
      state.token = t;
      localStorage.token = state.token;
    },
    setUsername(state, u) {
      state.username = u;
      localStorage.username = state.username;
    },
    resetToken(state) {
      state.token = '';
      state.username = '';
    },
  },
  actions: {

  },
});
