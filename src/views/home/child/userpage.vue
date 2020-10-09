<template>
<div class='userpage'>
    <div class="user-detail">
        <img class="headimg" :src="userinfo.profile.avatarUrl" alt="" srcset="">
        <div class="user-detail-right">
            <div class="right-top">
                <span>{{userinfo.profile.nickname}}</span>
                <img v-if="getsexurl" src="~/assets/img/wan_sex_w.svg" alt="">
                <img v-else src="~/assets/img/wan_sex_m.svg" alt="">

                <span class="level">Lv.{{userinfo.level}}</span>
            </div>
            <div class="right-center">
                <div><span>{{userinfo.profile.eventCount}}</span><span class="title">动态</span></div>
                <div class="border"><span>{{userinfo.profile.follows}}</span><span class="title">关注</span></div>
                <div> <span>{{userinfo.profile.followeds | logogram}}</span><span class="title">粉丝</span></div>
            </div>
            <div class="right-bottom">
                个人介绍： {{userinfo.profile.signature}}
            </div>
        </div>

    </div>

    <div class="create-playlist">
        <h3>创建的歌单</h3>
        <div class="playlist">
            <div class="playlist-item" v-for="item in other_playlist" :key="item.id" @click="$router.push(`/playlist/${item.id}`)">
                <div class="img">
                     <img :src="item.coverImgUrl" alt="">
                     <span>{{item.playCount | logogram}}</span>
                    
                </div>
               

                <span class="playlist_name">{{item.name}}</span>
            </div>
              <div class="util" v-for="item in other_count" :key="item">{{item}}</div>

        </div>

    </div>
    <div class=" collect-playlist">
        <h3>收藏的歌单</h3>
     

           <div class="playlist">
            <div class="playlist-item" v-for="item in own_playlist" :key="item.id" @click="$router.push(`/playlist/${item.id}`)">
                   <div class="img">
                     <img :src="item.coverImgUrl" alt="">
                     <span class="playcount">{{item.playCount | logogram}}</span>
                </div>
                   <span class="playlist_name">{{item.name}}</span>
            </div>
            <div class="util" v-for="item in own_count" :key="item">{{item}}</div>
        </div>

    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            id: "",
            userinfo: {},
            other_playlist: [],
            other_count:0,
            own_playlist: [],
            own_count:0
        };
    },
    computed: {
        getsexurl() {
            if (this.userinfo.profile.authStatus == 0) {
                return true
            } else {
                return false
            }
        }
    },
    watch: {},
    methods: {
        get_userinfo(id) {
            this.$api.user_detail(id).then((result) => {
                console.log(result)
                this.userinfo = result
            }).catch((err) => {

            });
            this.get_playlist(id)

        },
        get_playlist(id) {
            this.$api.playlist(id).then((result) => {
                console.log(result)
                this.other_playlist = result.playlist.filter((item, index) => {
                    return item['userId'] == this.id
                })
                this.other_count= 5 -this.other_playlist.length%5
                this.own_playlist = result.playlist.filter((item, index) => {
                    return item['userId'] != this.id
                })
                this.own_count=5 - this.own_playlist.length%5               
                console.log(this.other_playlist)
                console.log(this.own_playlist)
            }).catch((err) => {

            });
        },

    },
    created() {

    },
    mounted() {
        this.id = this.$route.params.id;
        this.get_userinfo(this.id)
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.user-detail {
    display: flex;

    .headimg {
        width: 180px;
        height: 180px;
        border-radius: 5px;
    }

    .user-detail-right {
        flex: 1;
        padding: 0px 20px;

        .right-top {
            line-height: 40px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);

            img {
                width: 20px;
                vertical-align: middle;
                margin-left: 10px;
            }

            .level {
                // display: inline-block;
                font-size: 12px;
                padding: 1px 5px;
                width: 40px;
                height: 15px;
                color: red;
                border: 1px solid red;
                border-radius: 9999px;
                font-weight: 600;
                margin-left: 5px;

            }
        }

        .right-center {
            display: flex;
            margin-top: 5px;

            div {
                width: 80px;
                padding: 0px 5px;
            }

            .border {
                border-right: 1px solid rgba(0, 0, 0, 0.2);
                border-left: 1px solid rgba(0, 0, 0, 0.2);
            }

            span {
                display: block;
            }

            .title {
                font-size: 12px;
            }
        }

        .right-bottom {
            line-height: 100px;
            font-size: 12px;
        }
    }

}

h3 {
    font-size: 16px;
    font-weight: 400;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    line-height: 30px;
}

.playlist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .playlist-item {
        width: 150px;
        margin: 0px 10px;
        margin-bottom: 20px;
        transition: all 0.4s;
        cursor: pointer;
      //  border: 1px solid rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        

.img{
    position: relative;

    span{
        position: absolute;
        background-color:rgba(0, 0, 0, 0.4);
        top: 0px;
        right: 2px;
        font-size: 12px;
        color: #ffffff;

    }
}

        &:hover {
            transform: translate(0px ,-5px);
        }

        span {
            font-size: 14px;
            display: block;
            text-align: center;
        }
    }

    img {
        width: 100%;

    }
}

.util{
    width: 150px;
    opacity: 0;
}
</style>
