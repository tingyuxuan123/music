<template>
<div class='listpage'>

    <el-row type="flex" v-for="(item,index) in partsonglist" :key="item.id" @click.native="songClick(item.id,(index+(currentpage-1)*40))">
        <el-col class="index" :span="1">{{index+1+(currentpage-1)*40}}</el-col>
        <el-col class="haveimg" :span="9"><img :src="item.album.blurPicUrl" alt=""> {{item.name}}</el-col>
        <el-col :span="5">{{item.ar ? item.ar[0].name : item.artists[0].name }}</el-col>
        <el-col :span="8">{{item.al ? item.al.name : item.album.name}}</el-col>
        <el-col :span="1">{{item.dt ? item.dt : item.duration | timeLongFormat('00:00')}}</el-col>
    </el-row>
    <el-pagination layout="prev, pager, next" :page-count.sync="pagecount" :total="songlist.songCount ? songlist.songCount:songlist.length" :current-page="currentpage" v-if="songlist.songCount ? true:songlist.length>40" @current-change="currentchange" :page-size="40">
    </el-pagination>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            partsonglist: [],
            currentpage: 1,
            pagecount: 0,

        };
    },
    computed: {},
    watch: {
        songlist() {

            // console.log(this.songlist)
            if (this.songlist instanceof Array) {

                this.currentchange(this.currentpage)
            } else {
                // console.log(this.songlist.songCount)
                this.partsonglist = this.songlist.songs

            }

        }
    },
    methods: {
        currentchange(page) {
            // console.log(page)
            this.currentpage = page
            if (this.songlist instanceof Array) {
                this.partsonglist = this.songlist.filter((value, index) => {
                    return index >= (page - 1) * 40 && index < page * 40
                })

                this.$emit('currentchange', page - 1);
            }

        },
        songClick(id, index) {
            // console.log(index)
            this.$bus.$emit('song-click', id)
            this.$store.commit("updated_currentlist", {
                trackIds: this.trackIds,
                index
            })
            // console.log(this.$store.state.currentlist)
        }
    },
    props: {
        songlist: {
            type: Array || Object,
            default: () => {
                return []
            }
        },
        trackIds: {
            type: Array,
            required: true
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

.listpage {
    font-size: 12px;
}

.index {
    text-align: center;
}

.el-row {
    text-overflow: ellipsis;
    line-height: 4.5em;
    height: 4.5em;
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
}

.haveimg {

    img {
        width: 35px;
        margin-right: 5px;
        vertical-align: middle;
    }
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
