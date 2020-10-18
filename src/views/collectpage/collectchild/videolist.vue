<template>
<div class='videolist'>
    <div class="videolist-item" v-for="item in videolist" :key="item.id" @click="$router.push(item.type==1 ? `/mvinfo/video/${item.vid}` : `/mvinfo/mv/${item.vid}`)">
        <div class="top">
            <img :src="item.coverUrl+'?param=320y180'" alt="" srcset="">
            <span class="time">{{item.durationms | timeLongFormat('00:00') }}</span>
            <span class="count">{{item.playTime | logogram}}</span>
        </div>
        <div class="title">{{item.title }}</div>
        <span class="nickname">by {{item.creator[0].userName }}</span>
    </div>
    <div class="util" v-for="item in videolistcount" :key="item">{{item}}</div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            videolistcount: 0
        };
    },
    props: {
        videolist: {
            type: Array,
            required: true
        }
    },
    computed: {},
    watch: {
        videolist() {
            this.videolistcount = 4 - this.videolist.length % 4
        }
    },
    methods: {

    },
    created() {

    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.videolist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .videolist-item {
        width: 23%;
        margin-bottom: 10px;
        cursor: pointer;

        .top {
            position: relative;

            .time {
                position: absolute;
                color: #ffffff;
                background-color: rgba(0, 0, 0, 0.3);
                font-size: 12px;
                left: 1px;
                bottom: 5px;
            }

            .count {
                position: absolute;
                color: #ffffff;
                background-color: rgba(0, 0, 0, 0.3);
                font-size: 12px;
                right: 2px;
                top: 0px;
            }
        }

        img {
            width: 100%;
            // height: 130px;
        }

        .title {
            font-size: 12px;
        }

        .nickname {
            font-size: 12px;
            color: #666;
        }
    }

    .util {
        width: 23%;
        opacity: 0;
    }

}
</style>
