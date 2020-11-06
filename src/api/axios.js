import axios from 'axios'
import {
  searchsuggest,
  searchhot,
  userinfo,
  song_list_detail,
  song_detail,
  lyric,
  song_url,
  comment_playlist,
  playlist_subscribers,
  searchresult,
  video_detail,
  related_allvideo,
  comment_video,
  get_video_url,
  comment_mv,
  artist_info,
  artist_album,
  artist_desc,
  artist_mv,
  album_detail,
  comment_album,
  comment_music,
  banner,
  personalized,
  playlist_category,
  top_playlist,
  toplist,
  artist_cate_list,
  top_song,
  top_album,
  video_group_list,
  video_category_list,
  group,
  videoall,
  mvs,
  recommend_songs,
  recommend_resource


} from "./request_show"
import {
  login,
  login_logout,
  login_status,
  login_refresh,
  album_sublist,
  mv_sublist,
  artist_sublist,
  user_detail,
  playlist,
  likelist,
  personal_fm,
  dj_sublist
} from './request_user'
import cookie from '@/utils/cookie'
 
 const instance=  axios.create({
        baseURL:"http://101.200.204.28",
        timeout:5000
    })

    instance.interceptors.response.use(function (response) {  //响应拦截
     
        return  response.data;
      }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
      });

      instance.interceptors.request.use(function(request){  //请求拦截
        if(!request.params) request.params={}
        if(!request.params.cookie) request.params.cookie=cookie.value
        return request
      })


const api={
    searchsuggest,
    searchhot,
    userinfo,
    comment_playlist,
    playlist_subscribers,
    searchresult,
    video_detail,
    related_allvideo,
    comment_video,
    get_video_url,
    comment_mv,
    artist_info,
    artist_album,
    artist_desc,
    artist_mv,
    album_detail,
    login,
    login_logout,
    login_status,
    login_refresh,
    comment_album,
    song_url,
    comment_music,
    banner,
    personalized,
    playlist_category,
    top_playlist,
    toplist,
    artist_cate_list,
    top_song,
    top_album,
    video_group_list,
    video_category_list,
    group,
    videoall,
    mvs,
    recommend_songs,
    recommend_resource,

    album_sublist,
    mv_sublist,
    artist_sublist,
    user_detail,
    playlist,
    likelist,
    song_list_detail,
    song_detail,
    lyric,
    personal_fm,
    dj_sublist

    
}

export {
    instance,
    api
}