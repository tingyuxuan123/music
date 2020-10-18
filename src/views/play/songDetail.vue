<template>
<div class='songdetail' :class="isshow ? 'songdetail-show' : 'songdetail-hide'">

    <img @click="isshow=false" class="black" src="~/assets/img/back.svg" alt="" srcset="">
    <div class="detail" :class="{up:showcomment}">
        <blur-background :img="img" width="100%" height="400px" class="blur">
            <div class="content">
                <div class="left">
                    <img :class="isplay ? 'openplay' : 'shutplay' " src="~/assets/img/needle.png" alt="">
                    <div class="outward" :class="{playing : isplay}">
                        <img :src="img" alt="" srcset="">
                    </div>
                </div>
                <div class="right">
                    <div class="name">{{name}}</div>
                    <div><span>专辑：<span class="a">{{al}}</span></span> <span>歌手：<span class="a">{{arname}}</span></span></div>
                    <div class="lrc" ref="lrc">
                        <div class="lrc-item" v-for="(item,index) in lrcs" :key="item.currenttime" :class="{current:iscurrent(index)}">
                            {{item.currentlrc}}
                        </div>
                    </div>
                </div>
            </div>

        </blur-background>
    </div>
    <div class="comment" :class="{up:showcomment}">
        <comment-list :id="id" type="song"></comment-list>
    </div>
    <span @click="showcomment=!showcomment" class="el-icon-arrow-left direction" :class="showcomment ? 'directionup' : 'directiondown'"></span>
</div>
</template>

<script>
import BlurBackground from "components/common/BlurBackground"
import CommentList from 'components/main/commentlist'
import {
    lyricParse
} from 'utils/utils'
export default {
    components: {
        BlurBackground,
        CommentList
    },
    data() {
        return {
            isshow: false,
            img: "", //专辑图片
            name: "", //歌名
            arname: "", //作者name
            al: "", // 专辑名
            alid: 0, //作者id
            lrc: "",
            lrcs: [],
            current: 0,
            isplay: false,
            showcomment: false,
            id: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_song_detail(id) {
            //  console.log(id)
            this.$api.song_detail(id).then((result) => {
                console.log(result, 1)
                this.name = result.songs[0].name
                this.al = result.songs[0].al.name
                this.img = result.songs[0].al.picUrl
                this.alid = result.songs[0].ar[0].id;
                this.arname = result.songs[0].ar[0].name
                console.log(this.img)
            }).catch((err) => {

            });

            this.get_lyric(id)
        },
        get_lyric(id) {
            this.$api.lyric(id).then((result) => {
                console.log(result)
                this.lrc = lyricParse(result.lrc.lyric)
                console.log(this.lrc)
                this.lrcs = []
                for (let item in this.lrc) {

                    this.lrcs.push({
                        currenttime: item,
                        currentlrc: this.lrc[item]
                    })
                }
            }).catch((err) => {

            });
        },
        iscurrent(index) {

            let time = parseInt(this.lrcs[index].currenttime)
            if (this.lrcs.length - 1 == index) {

                if (this.current >= time) {
                    this.$refs.lrc.scrollTop = index * 25 - 100
                    return true
                } else {
                    return false
                }
            } else {
                let next_time = parseInt(this.lrcs[index + 1].currenttime)
                if (this.current >= time && this.current < next_time) {
                    this.$refs.lrc.scrollTop = index * 25 - 100
                    return true
                } else {
                    return false
                }
            }

        }

    },
    created() {

    },
    mounted() {
        this.$bus.$on("songDetail", () => {
            this.isshow = !this.isshow;
        })
        this.$bus.$on("song-click", (id) => {
            //  console.log("df")
            this.get_song_detail(id);
            this.isplay = true;
            this.id = id + ""

        })
        this.$bus.$on("timechange", (val) => {
            this.current = val
        })
        this.$bus.$on("isplay", (val) => {
            this.isplay = val
        })
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.songdetail {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: #ffffff;
    z-index: 100;
    transition: all .5s;

    // justify-content: center;
    align-items: center;
    overflow: hidden;

}

.detail {
    width: 80%;
    height: 100%;
    margin: 0px auto;
    transition: all .5s;
}

.up {
    transform: translate(0px, -100%);
}

.comment {
    width: 80%;
    height: 100%;
    overflow: scroll;
    margin: 0px auto;
    transition: all .5s;
}

.black {
    position: absolute;
    top: 20px;
    left: 30px;
    height: 30px;
}

.direction {
    transition: all 0.3s;
    font-size: 16px;
    display: flex;
    // display: inline-block;
    justify-content: center;
    align-items: center;
    width: 30px !important;
    height: 30px !important;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

.directiondown {
    position: absolute;
    bottom: 20px;
    right: 30px;
    height: 30px;
    transform: rotate(270deg);
}

.directionup {
    position: absolute;
    bottom: 20px;
    right: 30px;
    height: 30px;
    transform: rotate(90deg);
}

.content {
    display: flex;
    justify-content: space-around;
    height: 400px;
}

.songdetail-show {
    transform: translate(0);
}

.songdetail-hide {
    transform: translate(-100%);
}

.left {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    &>img {
        position: absolute;
        top: -15px;
        left: 40%;
        height: 140px;
        transition: all .5s;
        transform-origin: 20% 10%;
        z-index: 5;

    }

    .openplay {

        transform: rotate(-3deg);

    }

    .shutplay {
        transform: rotate(-45deg);

    }

    .outward {
        width: 260px;
        height: 260px;
        background-image: url("../../assets/img/disc.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        position: relative;
        border-radius: 50%;
        animation: rotate 50s linear infinite;
        animation-play-state: paused;

        img {
            width: 170px;
            height: 170px;
            position: absolute;
            top: 45px;
            left: 45px;
            border-radius: 50%;
        }
    }

    .playing {
        animation-play-state: running;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg)
        }
    }
}

.right {
    width: 300px;
    font-size: 14px;

    padding-top: 50px;
    box-sizing: border-box;

    .name {
        font-size: 16px;
    }

    .a {
        color: #303f9f;
    }

    .lrc {
        margin-top: 5px;
        height: 400px;
        overflow: auto;
        transition: all .4s;
    }

    .lrc-item {
        line-height: 25px;
    }

    .current {
        color: #ffffff;
    }
}
</style>
