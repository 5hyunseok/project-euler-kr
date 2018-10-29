export default {
  namespaced: true,
  state: {
    deleteSignal: false,
    deleteMsg: '',
  },
  getters: {
    getDeleteSignal(state) {
      return state.deleteSignal;
    },
  },
  mutations: {
    sendDeleteSignal(state) {
      state.deleteSignal = !state.deleteSignal;
      state.deleteMsg = '성공적으로 삭제되었습니다.';
      setTimeout(() => {
        state.deleteSignal = false;
        state.deleteMsg = '';
      }, 5000);
    },
  },
  actions: {
    sendDeleteSignal(context) {
      context.commit('sendDeleteSignal');
    },
  },
};
