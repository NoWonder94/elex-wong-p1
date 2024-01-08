import axios from 'axios';
export const state = () => ({
  user: [],
  isLogin: false,
})

export const mutations = {
  updateUserInfo(state, data) {
    if(data.xId) {
      state.isLogin = true;
    } else {
      state.isLogin = false;
    }

    state.user = data;
  }
}

export const actions = {
  updateUserInfo(context, data) {
    context.commit('updateUserInfo', data);
  },
  async getUserApi(context, data) {
    const headers = {
      "Authorization": "Bearer " + localStorage.getItem('authToken'),
    }
    const response = await axios.post('https://api.chaofan1.com/user/User/info', null, { headers });
    console.log(response);
    if (response.data.status == true) {
      context.commit("updateUserInfo", response.data.data);
    }
  }
}
