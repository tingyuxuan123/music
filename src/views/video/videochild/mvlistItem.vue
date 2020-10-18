<template>
<div class='mvlistitem'>
    <div class="mvlistitem-item" v-for="item in videolist" :key="item.id" @click="$router.push( `/mvinfo/mv/${item.id}`)">
        <div class="top">
            <img :src="item.cover" alt="" srcset="">
            <span class="time">{{item.duration| timeLongFormat('00:00') }}</span>
            <span class="count">{{item.playCount | logogram}}</span>
        </div>
        <div class="title">{{item.name}}</div>
        <span class="nickname">by {{item.artistName}}</span>
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
            required: true,
            default: () => {
                return []
            }
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
.mvlistitem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .mvlistitem-item {
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
