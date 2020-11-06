<template>
<div class='recommend'>
    <!-- 
    推荐电台
    推荐歌单
    推荐歌曲
    推荐mv
 -->
    <h4>推荐歌单</h4>
    <div class="remember-playlist">
        <div class="playlist-item" v-for="(item,index) in playlist_list" :key="item.id" @mouseenter="show(index)" @mouseleave="hide(index)" @click="$router.push(`/playlist/${item.id}`)">
            <div class="coverimg">
                <img :src="item.picUrl+'?param=320y180'" alt="" srcset="" @error="defImg()">
                <span class="playcount">{{item.playcount | logogram}}</span>
                <span ref="copywriter" class="copywriter">{{item.copywriter}}</span>
            </div>
            <span class="title">{{item.name}}</span>
        </div>
        <div class="util" v-for="item in playlist_util" :key="item">
            1
        </div>
    </div>

    <!-- <h4>推荐电台</h4>
     <div class="rabio">
     <div class="rabio-item">

         </div>
    </div>
    -->
    <h4>推荐歌曲</h4>
    <div class="remember-sing">
        <div class="sing-item" v-for="(item,index) in sing_list" :key="item.id" @click="songclick(item.id,index)" @mouseenter="remembershow(index)" @mouseleave="rememberhide(index)">
            <div class="headimg1">
                <img :src="item.al.picUrl+'?param=180y180'" alt="" srcset="">
                <span ref="rememberreason" class="rememberreason">{{item.reason}}</span>
            </div>

            <span class="name">{{item.name}}</span>
            <span class="ar">{{item.ar[0].name}}</span>
        </div>
        <div class="util" v-for="item in sing_util" :key="item">
            1
        </div>
    </div>

</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            playlist_list: [],
            playlist_util: 0,
            sing_list: [],
            sing_util: 0,
            defaultImg: require("../../assets/test.jpg")
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_recommend_songs() {
            this.$api.recommend_songs().then((result) => {
                console.log(result)
                this.sing_list = result.data.dailySongs
                this.sing_util = 5 - result.data.dailySongs.length % 5
            }).catch((err) => {

            });
        },
        get_recommend_resource() {
            this.$api.recommend_resource().then((result) => {
                console.log(result)
                this.playlist_list = result.recommend
                this.playlist_util = 5 - result.recommend.length % 5
            }).catch((err) => {

            });
        },
        defImg() {
            let img = event.srcElement;
            img.src = this.defaultImg;
            img.onerror = null; //防止闪图
        },
        show(index) {
            this.$refs.copywriter[index].style = 'opacity:1';
        },
        hide(index) {
            this.$refs.copywriter[index].style = 'opacity:0';
        },
        remembershow(index) {
            this.$refs.rememberreason[index].style = 'opacity:1';
        },
        rememberhide(index) {
            this.$refs.rememberreason[index].style = 'opacity:0';
        },
        songclick(id, index) {
            this.$bus.$emit('song-click', id);
            this.$store.commit("updated_currentlist", {
                trackIds: this.sing_list,
                index
            })

        }

    },
    created() {

    },
    mounted() {

        this.get_recommend_songs()
        this.get_recommend_resource()

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.recommend {
    padding: 20px;

    h4 {
        margin: 0px;
        font-weight: 500;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 20px;
    }
}

.remember-playlist {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .playlist-item {
        width: 18%;
        margin-bottom: 10px;
        cursor: pointer;

        .coverimg {
            position: relative;

            .playcount {
                position: absolute;
                top: 2px;
                right: 5px;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.6);
                font-size: 12px;

            }
        }

        img {
            width: 100%;
            border-radius: 5px;
        }

        .title {
            font-size: 12px;
        }

        .copywriter {
            display: inline-block;
            padding: 5px;
            box-sizing: border-box;
            font-size: 12px;
            position: absolute;
            bottom: 5px;
            left: 0px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.6);
            transition: all 0.4s;
            opacity: 0;
            width: 100%;

        }

    }
}

.remember-sing {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    cursor: pointer;

    .sing-item {
        width: 17%;
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        font-size: 12px;

        .headimg1 {
            position: relative;

            .rememberreason {
                display: inline-block;
                padding: 5px;
                box-sizing: border-box;
                font-size: 12px;
                position: absolute;
                top: 0px;
                left: 0px;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.6);
                transition: all 0.4s;
                opacity: 0;
                width: 100%;

            }
        }

        img {
            width: 100%;
        }
    }

}

.util {
    width: 18%;
    opacity: 0;
}
</style>
