<template>
<div class='songlist'>
    <el-row class="titles" type="flex">
        <el-col class="index" :span="2">序号</el-col>
        <el-col :span="8">音乐标题</el-col>
        <el-col :span="5">歌手</el-col>
        <el-col :span="7">专辑</el-col>
        <el-col :span="2">时长</el-col>
    </el-row>
    <el-row type="flex" v-for="(item,index) in partsonglist" :key="item.id">
        <el-col class="index" :span="2">{{index+1+(currentpage-1)*40}}</el-col>
        <el-col :span="8">{{item.name}}</el-col>
        <el-col :span="5">{{item.ar ? item.ar[0].name : item.artists[0].name }}</el-col>
        <el-col :span="7">{{item.al ? item.al.name : item.album.name}}</el-col>
        <el-col :span="2">{{item.dt ? item.dt : item.duration | timeLongFormat('00:00')}}</el-col>
    </el-row>
    <el-pagination layout="prev, pager, next" :total="songlist.songCount ? songlist.songCount:songlist.length" :current-page="currentpage" v-if="songlist.songCount ? true:songlist.length>40" @current-change="currentchange" :page-size="40">
    </el-pagination>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            partsonglist: [],
            currentpage: 1
        };
    },
    computed: {},
    watch: {
        songlist() {

            console.log(this.songlist instanceof Array)
            if (this.songlist instanceof Array) {
                // this.partsonglist = this.songlist.filter((value, index) => {
                //     return index < 40
                // })
                this.currentchange(this.currentpage)
            } else {
                console.log(this.songlist.songCount)
                this.partsonglist = this.songlist.songs
            }

        }
    },
    methods: {
        currentchange(page) {
            console.log(page)
            this.currentpage = page
            if (this.songlist instanceof Array) {
                this.partsonglist = this.songlist.filter((value, index) => {
                    return index >= (page - 1) * 40 && index < page * 40
                })
            } else {
                this.$emit('currentchange', page - 1);
            }

        }
    },
    props: {
        songlist: {
            type: Array || Object,
            default: () => {
                return []
            }
        }
    },
    created() {
        this.currentchange(1)
    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类

.titles {
    background-color: #e0e0e0 !important;
}

.songlist {
    font-size: 12px;
}

.index {
    text-align: center;
}

.el-row {
    text-overflow: ellipsis;
    line-height: 3.5em;
    height: 3.5em;
    overflow: hidden;
    border-radius: 5px;
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
