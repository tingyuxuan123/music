import {instance} from "./axios"

function login (phone,password){
    return instance({
        url:"/login/cellphone",
        params:{
            phone,
            password
        },
        
    })
}

//刷性登录
function login_refresh(){
    return instance({
        url:"/login/refresh"
    })
}
//获取登录状态
function login_status(){
    return instance({
        url:"/login/status"
    })
}
//退出登录
function login_logout(){
    return instance({
        url:"/logout"
    })
}


//获取已收藏的歌曲手表
 function artist_sublist() {
    return instance( { url: '/artist/sublist' } )
  }
  
  //获取已收藏的专辑列表
  export  function album_sublist(offset, limit) {
    return instance( { url: '/album/sublist', params: { offset, limit } } )
  }
  
  //获取已收藏的MV列表
  export  function mv_sublist() {
    return instance( { url: '/mv/sublist' } )
  }


  
  //获取用户详情
  export  function user_detail( uid ) {
    return instance( { url: '/user/detail', params: { uid } } )
  }
  
  
  //获取用户歌单
  export function playlist( uid ) {
    return instance( { url: '/user/playlist', params: { uid } } )
  }
  
  
  //获取用户喜欢的歌曲列表
 export function likelist(uid) {
    return instance( { url: '/likelist', params: { uid } } )
  }
  
  //说明 : 私人 FM( 需要登录 )

  export function personal_fm(){
    return instance({
      url:"/personal_fm"
    })
  }

  // 获取我关注的电台 需要登录
export function dj_sublist(){
  return instance({
    url:"/dj/sublist"
  })
}


export{
    login,
    login_refresh,
    login_status,
    login_logout,
    artist_sublist
}