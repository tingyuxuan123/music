import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    profile: {
      name: null,
      UID: 0,
      avatarUrl: null,
      other_playlist: [],  //收藏的歌曲列表
      own_playlist: [], //自己建的歌单列表
      liked_song: [],
    }
  },
  mutations: {
    updated_login_status(state,{isLogin,profile}) { //登录后设置用户信息
      state.isLogin = isLogin
      state.profile.name = profile['nickname']
      state.profile.UID = profile['userId']
      state.profile.avatarUrl = profile['avatarUrl']
    },
    logout(state){ //退出登录
      state.isLogin = false
      state.profile.name = null
      state.profile.UID =0
      state.profile.avatarUrl =null
    },
    updated_user_info(state,{other_playlist,own_playlist}){
      state.profile.other_playlist=other_playlist;
      state.profile.own_playlist=own_playlist;

     
    },
    updated_liked_song(state,liked_song){
      state.liked_song=liked_song
    }
  },
  actions: {
  },
  modules: {
  }
})
