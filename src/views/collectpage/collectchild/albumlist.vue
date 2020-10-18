<template>
<div class='albumlist'>

    <el-row type="flex" v-for="(item) in albumlist" :key="item.id" @click.native="$router.push(`/albumpage/${item.id}`)">

        <el-col class="haveimg" :span="12"><img :src="item.picUrl" alt=""> {{item.name}}</el-col>
        <el-col class="artist" :span="10">{{item.artists[0].name}}</el-col>
        <el-col class="count" :span="2">{{item.size}} 首</el-col>

    </el-row>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            currentpage: 1
        };
    },
    props: {
        albumlist: {
            type: Array,
            required: true
        }
    },
    computed: {},
    watch: {},
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
