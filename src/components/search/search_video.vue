<template>
<div class='search_video'>
    <ul>
        <li v-for="item in data" :key="item.vid" @click="$router.push(`/mvinfo/${item.type ? 'video' : 'mv'}/${item.vid}`)">
            <div class="top">
                <img :src="item.coverUrl" alt="">
            </div>
            <div class="bottom">
                <div class="title">{{item.title}}</div>
                <div class="info">
                    <span>by {{item.creator[0].userName}}</span>
                    <div>
                        <span class="el-icon-video-play"> {{item.durationms | timeLongFormat('00:00') }}</span>
                        <span class="el-icon-view">{{item.playTime | logogram }}</span>
                    </div>

                </div>

            </div>

        </li>
    </ul>
    <el-pagination layout="prev, pager, next" :total="count" v-if="count>40" @current-change="currentchange" :page-size="40">
    </el-pagination>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        currentchange(page) {
            this.$emit('currentchange', page - 1);
        }
    },
    props: {
        count: {
            type: Number,
            required: true
        },
        data: {
            type: Array,
            required: true
        }
    },
    created() {

    },
    mounted() {
        console.log(this.data)
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {

        width: 20%;
        min-width: 210px;

        margin-bottom: 20px;
        transition: all 0.4s ease 0s;
        border: solid 1px rgba(1, 1, 1, 0.2);
        // line-height: 60px;
        border-radius: 5px;
        overflow: hidden;

        &:hover {
            transform: translate(0px, -5px);
        }

        &:hover .title,
        &:hover .info {
            transform: translate(0, -100%);
        }

        img {
            width: 100%;

        }

        span {
            font-size: 11px;
            margin-left: 10px;
        }

        .bottom {
            height: 35px;
            overflow: hidden;

            .title {
                height: 100%;
                font-size: 11px;
                overflow: hidden;
                transition: all 0.4s ease 0.4s;
            }

            .info {
                height: 100%;
                font-size: 11px;
                overflow: hidden;
                transition: all 0.4s ease 0.4s;
                display: flex;
                flex-direction: column;

            }
        }

    }
}

.el-pagination {
    text-align: center;
}
</style>
