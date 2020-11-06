<template>
<div class='radiochild'>
    <el-row type="flex" v-for="(item) in radiolist" :key="item.id">

        <el-col class="haveimg" :span="12"><span class="img-span"> <img :src="item.picUrl" alt=""><span class="newcount1" v-if="item.newProgramCount!=0">{{item.newProgramCount}}</span></span> {{item.name}} </el-col>
        <el-col class="artist" :span="10">by {{item.name}}</el-col>
        <el-col class="count" :span="2">节目:{{item.programCount}}</el-col>

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
        radiolist: {
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

    .img-span {
        position: relative;
        display: inline-block;
        height: 40px;

        .newcount1 {
            position: absolute;
            top: 0px;
            right: 0px;
            background-color: #409EFF;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            color: white;
            line-height: 15px;
            text-align: center;
            font-size: 12px;

        }
    }

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
