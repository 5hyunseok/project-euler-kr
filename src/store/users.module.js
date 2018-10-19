export default {
  namespaced: true,
  state: {
    token: localStorage.token,
    username: localStorage.username,
    msg: '',
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUsername(state) {
      return state.username;
    },
    getMsg(state) {
      return state.msg;
    },
  },
  mutations: {
    setToken(state, t) {
      localStorage.token = t;
      state.token = localStorage.token;
      state.msg = '로그인 성공!';
      setTimeout(() => {
        state.msg = '';
      }, 3000);
    },
    setMsg(state, m) {
      state.msg = m;
      setTimeout(() => {
        state.msg = '';
      }, 3000);
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
