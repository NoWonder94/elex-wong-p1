export const state = () => ({
  counter: 0,
  user: [],
  isLogin: false,
})

export const getter = {
  getCounter(state) {
    return state.counter
  }
}

export const mutations = {
  increment(state, data) {
    state.counter = data;
  },
  checkLogin(state, data) {
    state.isLogin = data;
  },
  updateUserInfo(state, data) {
    if (data.email) {
      state.isLogin = true;
    } else {
      state.isLogin = false;
    }
    state.user = data;
  },
}

export const actions = {
  fetchCounter(context, state) {
    // make request
    const res = { data: 11 };
    context.commit('increment', state);
  },
  checkLogin(context, data) {
    context.commit('checkLogin', data);
  },
  updateUserInfo(context, data) {
    context.commit('updateUserInfo', data);
  }
}

