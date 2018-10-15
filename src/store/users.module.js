export default {
  namespaced: true,
  state: {
    token: localStorage.token,
    username: localStorage.username,
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUsername(state) {
      return state.username;
    },
  },
  mutations: {
    setToken(state, t) {
      localStorage.token = t;
      state.token = localStorage.token;
    },
    setUsername(state, u) {
      localStorage.username = u;
      state.username = localStorage.username;
    },
    resetToken(state) {
      localStorage.token = '';
      localStorage.username = '';
      state.token = '';
      state.username = '';
    },
  },
};
