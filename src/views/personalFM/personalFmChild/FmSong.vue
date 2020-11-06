<template>
<div class='songdetail'>

    <div class="detail" :class="{up:showcomment}">
        <blur-background :img="img" width="100%" height="400px" class="blur">
            <div class="content">
                <div class="left">
                    <div class="coverimg">
                        <img :src="img+'?param=180y180'" alt="">
                        <!--
                        <img @click="play" v-if="$store.state.PlayType" class="playimg" src="~/assets/img/play200.png" alt="">
                        <img class="stopimg" v-else src="~/assets/img/stop.png" alt="" srcset="">
                        -->
                    </div>

                </div>
                <div class="right">
                    <div class="name">{{name}}</div>
                    <div class="info"><span>专辑：<span class="a">{{al}}</span></span> <span>歌手：<span class="a">{{arname}}</span></span></div>
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

        };
    },
    computed: {},
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    watch: {
        id() {
            this.get_song_detail(this.id)
        }
    },
    methods: {
        get_song_detail(id) {
            //  console.log(id)
            this.isplay = true;
            this.$api.song_detail(id).then((result) => {
                //   console.log(result, 1)
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
                //  console.log(result)
                this.lrc = lyricParse(result.lrc.lyric)
                //  console.log(this.lrc)
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

        },
        play() {
            this.$store.commit("changepalytype", false);
            this.$bus.$emit("fm-click", this.id)

        }

    },
    created() {
        this.$bus.$on("fmtimechange", (currenttime) => {
            console.log(currenttime)
            this.current = currenttime;
        })
    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.songdetail {

    // justify-content: center;
    align-items: center;
    overflow: hidden;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;

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
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;

    .coverimg {
        position: relative;
        width: 100%;

        img:first-child {
            width: 100%;
        }

    }

    .playimg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        border: 1px solid #fff;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
    }

    .stopimg {
        position: absolute;
        bottom: 5px;
        right: 0px;
        width: 40px;
        z-index: 10;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
    }

    .openplay {

        transform: rotate(-3deg);

    }

    .shutplay {
        transform: rotate(-45deg);

    }

    // .outward {
    //     width: 260px;
    //     height: 260px;
    //     background-image: url("../../../assets/img/disc.png");
    //     background-repeat: no-repeat;
    //     background-size: 100% 100%;
    //     position: relative;
    //     border-radius: 50%;
    //     animation: rotate 50s linear infinite;
    //     animation-play-state: paused;

    //     img {
    //         width: 170px;
    //         height: 170px;
    //         position: absolute;
    //         top: 45px;
    //         left: 45px;
    //         border-radius: 50%;
    //     }
    // }

    // .playing {
    //     animation-play-state: running;
    // }

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

    .info {
        display: flex;
        justify-content: space-between;

        span:last-child {
            margin-right: 20px;
        }
    }

    .name {
        font-size: 16px;
        margin-bottom: 5px;
    }

    .a {
        color: #303f9f;
    }

    .lrc {
        margin-top: 5px;
        height: 350px;
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
