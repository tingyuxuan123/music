<template>
<div class='remmberPlaylist'>
    <h4>推荐歌单 </h4>
    <div class="remember">
        <div v-for="item in playlist" :key="item.id" class="playlist_item" @click="$router.push(`/playlist/${item.id}`)">
            <img :src="item.picUrl" alt="">
            <span>{{item.name}}</span>
            <span class="playCount"><img src="~/assets/img/play.png" alt="" srcset=""> {{item.playCount | logogram}}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            playlist: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        getremember() {
            this.$api.personalized(10).then((result) => {
                this.playlist = result.result
                console.log(this.playlist)
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.getremember()
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
h4 {
    font-size: 18px;
    font-weight: 500;
    margin: 0px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.remmberPlaylist {
    width: 100%;
}

.remember {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.playlist_item {
    width: 17%;
    margin: 10px;
    position: relative;

    img {
        width: 100%;
        border-radius: 5px;
    }

    span {
        font-size: 14px;
    }

    .playCount {
        font-size: 12px;
        color: #ffffff;
        position: absolute;
        top: 5px;
        right: 5px;

        img {
            width: 16px;
            vertical-align: top;
        }
    }

}
</style>
