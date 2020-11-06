<template>
<div class='find'>
    <el-tabs class="tabs" v-model="selected">
        <el-tab-pane label="个性推荐" name="1" :lazy="true">
            <person-remmber></person-remmber>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="2" :lazy="true">
            <playlist></playlist>
        </el-tab-pane>

        <el-tab-pane label="排行榜" name="4" :lazy="true">
            <toplist></toplist>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="5" :lazy="true">
            <songerlist></songerlist>
        </el-tab-pane>
        <el-tab-pane label="最新音乐" name="6" :lazy="true">
            <newmusic></newmusic>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import PersonRemmber from './child/personremmber'
import playlist from "./child/playlist"
import toplist from './child/toplist'
import songerlist from './child/songerlist'
import newmusic from './child/newmusic'
export default {
    components: {
        PersonRemmber,
        playlist,
        toplist,
        songerlist,
        newmusic
    },
    data() {
        return {
            selected: "1",
        };
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
.find{
    padding: 20px;
}
.tabs {
    height: 100%;
}
</style>
