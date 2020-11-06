<template>
<div class='side' :class="{long:islong}">
    <el-menu :default-openeds="['1', '2']" router mode="vertical" background-color="#f5f5f7" text-color="#7d7d7d" active-text-color="#000">
        <template slot="title"><i class="el-icon-setting"></i>推荐</template>
        <el-menu-item index="/find">发现音乐</el-menu-item>
        <el-menu-item index="/video" :disabled="!$store.state.isLogin">视频</el-menu-item>
        <el-menu-item index="/personalfm" :disabled="!$store.state.isLogin">私人FM</el-menu-item>
        <template slot="title"><i class="el-icon-setting"></i>我的音乐</template>
        <el-menu-item index="/recommend" :disabled="!$store.state.isLogin">每日推荐</el-menu-item>
        <el-menu-item index="/myradio" :disabled="!$store.state.isLogin">我的电台</el-menu-item>
        <el-menu-item index="/mycollect" :disabled="!$store.state.isLogin">我的收藏</el-menu-item>

        <el-submenu index="3" :disabled="!$store.state.isLogin">
            <template slot="title">创建的歌单</template>
            <el-menu-item :index="`/playlist/${item.id}`" v-for="(item) in $store.state.profile.own_playlist" :key="item.id">{{item.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="4" :disabled="!$store.state.isLogin">
            <template slot="title">收藏的歌单</template>
            <el-menu-item :index="`/playlist/${item.id}`" v-for="(item) in $store.state.profile.other_playlist" :key="item.id">{{item.name}}</el-menu-item>

        </el-submenu>

    </el-menu>

</div>
</template>

<script>
export default {
    name: "side",
    components: {

    },
    data() {
        return {
            islong: true
        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

        console.log(this.$store.state.profile)
        this.$bus.$on('showchange', () => {
            this.islong = false
        })
    },
}
</script>

<style lang="less">
//@import url(); 引入公共css类
.long {
    height: 100% !important;
}

.side {
    width: 100%;
    box-sizing: border-box;
    height: calc(100% - 52px);
    background-color: #f5f5f7;
    overflow: auto;

    .el-menu-item {
        border-left: 3px solid #f5f5f7;
        padding-left: 20px !important;
    }

    .el-menu-item:hover {
        border-left: 3px solid #c4c4c6;
    }

    .el-menu-item.is-active {
        color: #fff;
        box-sizing: border-box;
        background-color: #E6E7Ea !important;
        border-left: 3px solid #409EFF;

    }

}

.el-menu {
    overflow: hidden;

}

.el-menu-item {

    font-size: 12px !important;
    margin: 0px;
    padding: 0px;

}
</style>
