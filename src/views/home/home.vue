<template>
<div class='window eff-shadow'>
    <login />
    <el-container class="__container">
        <el-header height="50px">
            <app-head></app-head>
        </el-header>
        <el-container class="main-container">
            <song-detail class="songdetail"></song-detail>
            <el-aside class="aside" width="200px">
                <app-side></app-side>
                <song-intro></song-intro>
            </el-aside>
            <el-main class="light-scroll">

                <router-view />

            </el-main>

        </el-container>
        <el-footer height="45px">
            <app-foot></app-foot>
        </el-footer>
    </el-container>
</div>
</template>

<script>
import AppHead from 'views/home/child/head'
import AppSide from 'views/home/child/side'
import AppFoot from 'views/home/child/foot'
import login from 'views/home/child/login'
import SongIntro from 'views/play/songIntro'
import SongDetail from 'views/play/songDetail'
export default {
    components: {
        AppHead,
        AppSide,
        AppFoot,
        login,
        SongIntro,
        SongDetail
    },
    data() {
        return {

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
.window {
    resize: both;
    height: 600px;
    width: 1200px;
    min-width: 1000px;
    min-height: 300px;
    overflow: hidden;

    border-radius: 4px;
    background-color: white;

    margin: 20px auto auto auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

}

.window .el-aside {
    resize: horizontal;
    min-width: 200px;
    border-right: 1px solid #e0e0e0;

}

.window .__container {
    height: 100%;
}

.__container .main-container {
    position: relative;
    height: calc(100% - 95px);
}

.window .el-header {
    background-color: #409EFF;
}
.light-scroll{
    padding: 0px;
}
.window .el-footer {
    border-top: 1px solid #e0e0e0;

}
</style>
