<template>
<div class='songIntro' v-if="isshow">
    <img :src="img + '?param=100y100'" alt="" srcset="" @click="$bus.$emit('songDetail')">
    <div class="right">
        <span>{{name}}</span>
        <span style="margin-top:4px;  cursor: pointer;" @click="$router.push(`/songerpage/${alid}`)">{{al}}</span>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            img: "",
            name: "",
            al: "",
            alid: 0,
            isshow: false
        };
    },
    computed: {},
    watch: {
        isshow() {
            this.$bus.$emit('showchange')
        }
    },
    methods: {
        get_song_detail(id) {
            console.log(id)
            this.$api.song_detail(id).then((result) => {
                console.log(result, 1)
                this.name = result.songs[0].name
                this.al = result.songs[0].ar[0].name
                this.img = result.songs[0].al.picUrl
                this.alid = result.songs[0].ar[0].id
                //    console.log(this.name, this.al, this.img)
            }).catch((err) => {

            });

            //  this.get_lyric(id)
        },
    },
    created() {

    },
    mounted() {
        this.$bus.$on("song-click", (id) => {
            //  console.log("df")
            this.get_song_detail(id)
            this.isshow = true
        })
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.songIntro {
    display: flex;

    height: 52px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
    box-sizing: border-box;
    background-color: #f5f5f7;

    img {
        // width: 50px;
        height: 100%;
        cursor: pointer;
    }

    .right {
        display: flex;
        flex-direction: column;
        margin-left: 5px;

        span {

            font-size: 12px;

        }
    }

}
</style>
