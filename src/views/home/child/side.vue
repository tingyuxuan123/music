<template>
<div class='side'>
    <el-menu :default-openeds="['1', '2']" router mode="vertical">
        <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>推荐</template>
            <el-menu-item index="/1-1">发现音乐</el-menu-item>
            <el-menu-item index="/1-2">视频</el-menu-item>
            <el-menu-item index="/1-3">朋友</el-menu-item>
            <el-menu-item index="/1-4">私人FM</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>我的音乐</template>
            <el-menu-item index="/2-1">每日推荐</el-menu-item>
            <el-menu-item index="/2-2">我的音乐云盘</el-menu-item>
            <el-menu-item index="/2-3">我的电台</el-menu-item>
            <el-menu-item index="/2-4">我的收藏</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :disabled="!$store.state.isLogin">
            <template slot="title"><i class="el-icon-setting"></i>创建的歌单</template>
            <el-menu-item :index="`/playlist/${item.id}`" v-for="(item) in $store.state.profile.own_playlist" :key="item.id">{{item.name}}</el-menu-item>
        </el-submenu>
        <el-submenu index="4" :disabled="!$store.state.isLogin">
            <template slot="title"><i class="el-icon-setting"></i>收藏的歌单</template>
            <el-menu-item :index="`/playlist/${item.id}`" v-for="(item) in $store.state.profile.other_playlist" :key="item.id">{{item.name}}</el-menu-item>

        </el-submenu>

    </el-menu>

</div>
</template>

<script>
export default {
    name: "side",
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

        console.log(this.$store.state.profile)

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.side {
    width: 100%;
    box-sizing: border-box;
    height: calc(100% - 52px);

    overflow: auto;
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
