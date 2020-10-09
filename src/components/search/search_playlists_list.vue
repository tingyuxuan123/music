<template>
<div class='search_playlists_list'>
    <ul>
        <li v-for="item in data" :key="item.id" @click="$router.push(`/playlist/${item.id}`)">
            <div>
                <img :src="item.coverImgUrl" alt="">
                <span>{{item.name}}</span>
            </div>
            <div>
                <span class="dec">{{item.trackCount}}首</span>
            </div>
            <div>
                <span class="dec">by {{item.creator.nickname}}</span>
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

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
ul {
    list-style: none;
    margin: 0px;
    padding: 0px;

    li {
        padding: 0px 10px;
        display: flex;
        justify-content: space-between;

        div {
            flex: 1;
        }

        &:nth-of-type(odd) {
            background-color: #fafafa;
        }

        &:hover {
            background-color: #e0e0e0;
        }

        img {
            width: 45px;
            height: 45px;
            border-radius: 5px;
            vertical-align: middle;
        }

        line-height: 60px;

        span {
            font-size: 12px;
            margin-left: 10px;
        }

        .dec {
            color: #757575;
        }
    }
}

.el-pagination {
    text-align: center;
}
</style>
