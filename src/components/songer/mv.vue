<template>
<div class='mv'>
    <div class="mv-item" v-for="item in mvs" :key="item.id" @click="$router.push(`/mvinfo/mv/${item.id}`)">
        <div class="top">
            <img :src="item.imgurl16v9" alt="" srcset="">
            <span class="time">{{item.duration | timeLongFormat('00:00') }}</span>
            <span class="count">{{item.playCount | logogram}}</span>
        </div>
        <div class="title">{{item.name}}</div>

    </div>
    <div class="util" v-for="item in mvcount" :key="item">{{item}}</div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            mvs: [],
            mvcount: ""
        };
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {},
    watch: {},
    methods: {
        get_artist_mv(id) {
            this.$api.artist_mv(id).then((result) => {
                this.mvs = result.mvs
                this.mvcount = this.mvs.length % 4

                console.log(result, this.mvcount)
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.get_artist_mv(this.id)
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.mv {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .mv-item {
        width: 23%;
        margin-bottom: 10px;

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

    }

    .util {
        width: 23%;
        opacity: 0;
    }

}
</style>
