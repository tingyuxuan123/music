<template>
<div class='search_albums_list'>
    <ul>
        <li v-for="item in data" :key="item.id" @click="$router.push(`/albumpage/${item.id}`)">
            <div style="flex:1">
                <img :src="item.picUrl" alt="">
                <span>{{item.name}}</span>
            </div>

            <div style="flex:1"><span class="dec">{{item.artists[0].name}}</span></div>
            <div style="flex:1"><span class="dec">{{item.size}}首</span></div>

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
