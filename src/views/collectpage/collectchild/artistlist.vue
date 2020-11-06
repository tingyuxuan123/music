<template>
<div class='artistlist'>
    <el-row type="flex" v-for="(item) in artistlist" :key="item.id" @click.native="$router.push(`/songerpage/${item.id}`)">

        <el-col class="haveimg" :span="12"><img :src="item.img1v1Url" alt=""> {{item.name}}</el-col>
        <el-col class="artist" :span="10">专辑:{{item.albumSize}}</el-col>
        <el-col class="count" :span="2">MV:{{item.mvSize}}</el-col>

    </el-row>
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

    },
    props: {
        artistlist: {
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
.el-row {
    text-overflow: ellipsis;
    line-height: 3.5em;
    height: 3.5em;
    overflow: hidden;
    cursor: pointer;
}

.haveimg {
    margin-left: 15px;
    font-size: 14px;

    img {
        width: 40px;
        margin-right: 5px;
        vertical-align: middle;
    }
}

.artist,
.count {
    font-size: 12px;
    color: #666;
}

.el-row:nth-of-type(odd) {
    background-color: #fafafa;
}

.el-row:hover {
    background-color: #e0e0e0;
}

.el-pagination {
    text-align: center;
    margin-top: 20px;
}
</style>
