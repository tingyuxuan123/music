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
    },
    PlayType:true,  // true 为普通歌曲播放 false 为Fm播放
    currentlist:{  //当前播放列表
      trackIds:[],
      index:0
    },
    fm:{
      currentlist:[], //当前推荐的3首歌曲
      currentindex:0,
      currentsongid:"",//当前歌曲id
      currenttime:0 //当前播放时间
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
    updated_user_info(state,{other_playlist,own_playlist}){  //改变用户信息
      state.profile.other_playlist=other_playlist;
      state.profile.own_playlist=own_playlist;
    },
    updated_liked_song(state,liked_song){
      state.liked_song=liked_song
    },
    updated_currentlist(state,{trackIds,index}){
      state.currentlist.trackIds=trackIds;
      state.currentlist.index=index;
    },
    updated_currentlist_index(state,index){
      state.currentlist.index=index;
    },
    updated_fm_currentlist(state,currentlist){
    
      state.fm.currentlist=currentlist
    },
    updated_fm_info(state,{currentindex,currentsongid,currenttime}){
      console.log(currentindex,currentsongid,currenttime)
      state.fm.currentindex=currentindex
      state.fm.currentsongid=currentsongid
      state.fm.currenttime=currenttime
    },
    changepalytype(state,type){
      state.PlayType=type;

    }
  },
  actions: {
  },
  modules: {
  }
})
