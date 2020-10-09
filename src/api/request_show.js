import {instance} from "./axios"

// 返回搜索建议
function searchsuggest(keywords){
    return instance({
        url:"/search/suggest",
        params:{
            keywords,
            type:"mobile"
        }
    })
}

//返回热搜列表
function searchhot(){
    return instance({
        url:"/search/hot/detail"
    })
}
//用户的详细的信息包括 用户信息 , 歌单，收藏，mv, dj 数量
function userinfo(){
    return instance({
        url:"/user/subcount"
    })
}
 //获取歌单详情
export function song_list_detail(id){
    return instance({
        url:"/playlist/detail",
        params:{
            id
        }
    })
}

//获取推荐歌单
export function personalized( limit ) {
    return instance({ url: '/personalized', params: { limit: limit } }) }
  
  //获取热门歌单分类
  export function playlist_category() {
    return instance({ url: '/playlist/hot' })}
  
  
  //获取热门歌单分类
  export function top_playlist(cat, offset, limit, order = 'hot') {
    return instance({ url: '/top/playlist', params: { cat, offset, limit, order } })
  }
  
  
  //获取专辑详情
  export function album_detail( id ) {
    return instance({ url: '/album', params: { id } })
  }
  
  
  //传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情
  export function song_detail( ids ) {
    return instance( { url: '/song/detail', params: { ids } } )
  }
  
  //传入音乐 id 获取歌词
  export function lyric( id ) {
    return instance( { url: '/lyric', params: { id } } )
  }
  
  
  //调用此接口 , 传入歌单 id 和 limit 参数 , 可获得该歌单的所有评论 ( 不需要 登录 )
  export function comment_playlist(id, offset, limit ) {
    return instance( { url: '/comment/playlist', params: { id, offset, limit } } )
  }
  
  // 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该音乐的所有评论 ( 不需要 登录 )
  export function comment_music(id, offset, limit ) {
    return instance( { url: '/comment/music', params: { id, offset, limit } } )
  }
  
  // 调用此接口 , 传入视频 id 和 limit 参数 , 可获得该视频的所有评论 ( 不需要 登录 )
  export function comment_video(id, offset, limit ) {
    return instance( { url: '/comment/video', params: { id, offset, limit } } )
  }
  
  // 调用此接口 , 传入视频 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
  export function comment_album(id, offset, limit ) {
    return instance( { url: '/comment/album', params: { id, offset, limit } } )
  }
  
  // 调用此接口 , 传入视频 id 和 limit 参数 , 可获得该mv的所有评论 ( 不需要 登录 )
  export function comment_mv(id, offset, limit ) {
    return instance( { url: '/comment/mv', params: { id, offset, limit } } )
  }
  
  
  //调用此接口 , 传入歌单 id 可获取歌单的所有收藏者
  export function playlist_subscribers(id, offset, limit ) {
    return instance( { url: '/playlist/subscribers', params: { id, offset, limit } } )
  }
  
  //调用此接口 , 可获取视频详情 分视频和mv
  export function video_detail(type, id) {
    let config = null
    if (type === 'video') config = { url: '/video/detail', params: { id } }
    if (type === 'mv') config = { url: '/mv/detail', params: { mvid: id } }
    if (!config) console.error('not type:', type)
    return instance(config)
  }
  
  //传入 mv id,可获取 mv 播放地址
  export function get_video_url(type, id) {
    let url = '/'
    if (type === 'video') url = '/video/url'
    else if (type === 'mv') url = '/mv/url'
    else console.error('not type:', type)
    return instance( { url: url, params: { id } } )
  }
  
  //调用此接口 , 可获取相关视频
  export function related_allvideo(id) {
    return instance( { url: '/related/allvideo', params: { id } } )
  }
  
  //调用此接口 , 可获取所有榜单
  export function toplist() {
    return instance( { url: '/toplist' } )
  }
  
  //调用此接口 , 获取歌手分类列表
  export function artist_cate_list(area, type, initial, offset, limit) {
    return instance( { url: '/artist/list', params: { area, type, initial, offset, limit } } )
  }
  
  //调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
  export function artist_info(id) {
    return instance( { url: '/artists', params: { id } } )
  }
  
  //调用此接口 , 传入歌手 id, 可获得歌手 mv 信息
  export function artist_mv(id) {
    return instance( { url: '/artist/mv', params: { id } } )
  }
  
  //调用此接口 , 传入歌手 id, 可获得歌手专辑内容
  export function artist_album(id, offset = 0, limit = 50) {
    return instance( { url: '/artist/album', params: { id, offset, limit } } )
  }
  
  //调用此接口 , 传入歌手 id, 可获得歌手描述
  export function artist_desc(id) {
    return instance( { url: '/artist/desc', params: { id } } )
  }
  
  //调用此接口 , 可获取新歌速递
  export function top_song(type) {
    return instance( { url: '/top/song', params: { type } } )
  }
  
  //调用此接口 , 可获取新碟上架列表
  export function top_album(area, offset, limit) {
    return instance( { url: '/top/album', params: { area, offset, limit } } )
  }
  
  //调用此接口 , 可获取全部 mv
  export function mvs(area, type, order, offset, limit) {
    return instance( { url: '/mv/all', params: { area, type, order, offset, limit } } )
  }
  
  //获取搜索结果
  export function searchresult(keywords,type,offset){
    return instance({
      url:"/search",
      params:{
        keywords,
        type,
        offset,
        limit:40,
      }
    })
  }
  

  
  
  
  
export{
searchsuggest,
searchhot,
userinfo
}