<template>
<div class='playUtil'>
    <audio autoplay :src="url" ref="audio" @canplay="getDuration" @timeupdate="updateTime" @ended="playend"></audio>
    <div class="util">
        <div class="left">
            <span class="prev" @click="iscanclick(prev) "><img src="~/assets/img/icon-prev.svg" alt=""></span>
            <span class="control" @click="iscanclick(playclick)">
                <img v-if="!isplay" src="~/assets/img/icon-play.svg" alt="">
                <img v-else src="~/assets/img/icon-stop.svg" alt="">
            </span>
            <span class="next" @click="iscanclick(order_way)">
                <img src="~/assets/img/icon-next.svg" alt="">
            </span>
        </div>
        <div class="center">
            <span class="time">{{ currentTime  | timelongformat}}</span>
            <el-slider class="slider" v-model="currentTime" :show-tooltip="false" :max="duration" @change="changetime"></el-slider>
            <span class="time">{{duration | timelongformat}}</span>
        </div>
        <div class="right">
            <span @click="ismute=!ismute">
                <img v-if="ismute" src="~/assets/img/24gf-volumeCross.svg" alt="" srcset="">
                <img v-else src="~/assets/img/24gf-volumeHigh.svg" alt="" srcset="">
            </span>

            <el-slider class="slider" v-model="currentSound" :show-tooltip="false" :step="0.01" :max="1" @input="soundchange"></el-slider>
            <span @click="waychange">
                <img v-if="playway==1" src="~/assets/img/order_play.svg" alt="">
                <!--列表循环 -->
                <img v-if="playway==2" src="~/assets/img/random_play.svg" alt="">
                <!--随机播放-->
                <img v-if="playway==3" src="~/assets/img/single_play.svg" alt="">
                <!--单曲循环-->

            </span>
        </div>

    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            url: "",
            isplay: false,
            duration: 100,
            currentTime: 0,
            currentSound: 0.4,
            ismute: false,
            beiyong: 0.4,
            vaild: true,
            playway: 1, //1 为列表循环 2为随机播放 3为单曲循环

        };
    },
    computed: {},
    watch: {
        isplay() {
            if (this.isplay) {
                this.$refs.audio.play();
            } else {
                this.$refs.audio.pause();
            }
            this.$bus.$emit("isplay", this.isplay)
        },
        ismute() {

            if (this.ismute) {
                this.$refs.audio.volume = 0;
            } else {
                this.$refs.audio.volume = this.currentSound
            }
        }
    },
    methods: {
        get_song_url(id) {
            this.$api.song_url(id).then((result) => {

                this.url = result.data[0].url;
                //    console.log(this.url)
            }).catch((err) => {

            });
        },
        playclick() {
            this.isplay = !this.isplay
        },
        getDuration() {
            //     console.log(this.$refs.audio.duration); //此时可以获取到duration
            this.isplay = true;
            this.duration = parseInt(this.$refs.audio.duration);
            this.currentSound = this.$refs.audio.volume
            this.currentTime = this.$refs.audio.currentTime;
            console.log(this.$refs.audio.volume)
        },
        updateTime(e) {
            this.$bus.$emit("fmtimechange", this.currentTime)
            if (this.vaild) {
                this.vaild = false
                setTimeout(() => {
                    this.currentTime = e.target.currentTime; //获取audio当前播放时间
                    this.vaild = true;

                }, 1000)
            }

            //  console.log(e.target.currentTime)
        },
        soundchange(value) {

            this.currentSound = value
            this.beiyong = value
            this.$refs.audio.volume = this.currentSound
            console.log(value)
        },
        changetime(value) {

            this.$refs.audio.currentTime = value
            this.issilder = false

        },
        waychange() {
            if (this.playway == 3) {
                this.playway = 1

            } else {
                this.playway += 1
            }
            localStorage.setItem("playway", this.playway)
        },
        playend() {
            switch (this.playway) {
                case 1:
                    this.order_way();
                    break;
                case 2:
                    this.random_way();
                    break;
                case 3:
                    this.single_way();
                    break;

            }
        },
        order_way() { //顺序播放  下一首 
            let index = this.$store.state.fm.currentindex;

            let lenght = this.$store.state.fm.currentlist.length - 1

            if (index == lenght) {
                this.$store.commit("updated_fm_info", {
                    currentindex: 0,
                    currentsongid: this.$store.state.fm.currentlist[0].id,
                    currenttime: 0
                });
                let id = this.$store.state.fm.currentlist[0].id;
                this.$bus.$emit("sxfm", true, this.$store.state.fm.currentlist[0].id)
                this.$bus.$emit("fm-click", id);
            } else {
                index = this.$store.state.fm.currentindex + 1

                this.$store.commit("updated_fm_info", {
                    currentindex: index,
                    currentsongid: this.$store.state.fm.currentlist[index].id,
                    currenttime: 0
                });
                let id = this.$store.state.fm.currentlist[index].id;
                this.$bus.$emit("sxfm", false, this.$store.state.fm.currentlist[index].id)
                this.$bus.$emit("fm-click", id);
            }

        },
        random_way() {
            let index = this.$store.state.currentlist.index;
            let lenght = this.$store.state.currentlist.trackIds.length - 1
            let random = this.random(0, lenght)
            this.$store.commit("updated_currentlist_index", random);
            let id = this.$store.state.currentlist.trackIds[random].id;
            this.$bus.$emit("song-click", id);

        },
        single_way() {

            this.isplay = !this.isplay;
            this.$refs.audio.currentTime = 0;
            this.$refs.audio.audio.load();
            this.isplay = !this.isplay;
        },
        random(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        prev() {
            let index = this.$store.state.currentlist.index;
            console.log(index)
            let lenght = this.$store.state.currentlist.trackIds.length - 1

            if (index == 0) {
                this.$store.commit("updated_currentlist_index", lenght);
                let id = this.$store.state.currentlist.trackIds[lenght].id;

                this.$bus.$emit("song-click", id);
            } else {
                index = this.$store.state.currentlist.index - 1

                this.$store.commit("updated_currentlist_index", index);
                let id = this.$store.state.currentlist.trackIds[index].id;

                this.$bus.$emit("song-click", id);
            }
        },
        iscanclick(fun) {
            if (this.url == "") {
                this.$notify({
                    title: '提示',
                    message: `播放列表为空`,
                    type: 'warning'
                })
            } else {
                fun()
            }

        }

    },
    created() {

    },
    filters: {
        timelongformat(e) {
            let a = parseInt(e / 60);
            let b = parseInt(e % 60);
            if (a < 10) a = "0" + a
            if (b < 10) b = "0" + b
            return a + ":" + b
        }
    },
    mounted() {
        if (!localStorage.getItem("playway")) {
            localStorage.setItem("playway", this.playway)
        }
        this.playway = parseInt(localStorage.getItem("playway"))

        this.$bus.$on("fm-click", (id) => { //监听fm 点击
            console.log(id)
            this.get_song_url(id)
        })

        this.$bus.$on("song-click", (id) => { //监听 歌曲点击  
            this.isplay = false //关闭当前音乐

        })

    },
}
</script>

<style lang="less">
//@import url(); 引入公共css类
.playUtil .util {
    display: flex;
    align-content: center;
    width: 100%;
    height: 45px;

    .left {
        display: flex;
        align-content: center;
        justify-content: space-around;
        width: 160px;

        span {
            display: flex;
            align-items: center;

        }

        .prev,
        .next {
            img {
                box-sizing: border-box;
                height: 28px;
                width: 28px;
                background-color: #409eff;
                border-radius: 50%;
                padding: 8px;
            }
        }

        .control {
            img {
                width: 30px;
                height: 30px;
            }

        }

    }

    .center {
        flex: 1;
        display: flex;
        align-content: center;
        line-height: 45px;
        margin: 0px 10px;

        .slider {
            flex: 1;
            height: 45px;
            margin: 0px 10px;

            .el-slider__button {
                height: 8px;
                width: 8px;
            }

            .el-slider__bar {
                height: 5px;
            }

            .el-slider__runway {
                height: 5px;
                margin: 20px 0;

            }

        }

        .time {
            font-size: 14px;
        }
    }

    .right {
        width: 200px;
        display: flex;
        line-height: 45px;

        img {
            width: 18px;
            height: 18px;

        }

        span {
            display: flex;
            align-items: center;
        }

        .slider {
            width: 80%;
            height: 45px;
            margin: 0px 20px;

            .el-slider__button {
                height: 8px;
                width: 8px;
            }

            .el-slider__bar {
                height: 5px;
            }

            .el-slider__runway {
                height: 5px;
                margin: 20px 0;

            }

        }
    }

}
</style>
