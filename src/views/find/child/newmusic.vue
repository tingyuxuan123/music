<template>
<div class='newmusic'>
    <el-button-group>
        <el-button :type="current_choose==0 ? 'primary' : ''" size="mini" @click="current_choose=0">新歌速递</el-button>
        <el-button :type="current_choose==1 ? 'primary' : ''" size="mini" @click="current_choose=1">新碟上架</el-button>
    </el-button-group>

    <el-tabs class="tabs" v-model="selected" @tab-click="tabclick">
        <el-tab-pane label="全部" name="0" :lazy="true">
            <List :songlist="list" :trackIds="list" v-show="current_choose==0"></List>
            <new-album :newalbums="monthData" v-show="current_choose==1"></new-album>
        </el-tab-pane>
        <el-tab-pane label="华语" name="7" :lazy="true">
            <List :songlist="list" :trackIds="list" v-show="current_choose==0"></List>
            <new-album :newalbums="monthData" v-show="current_choose==1"></new-album>
        </el-tab-pane>
        <el-tab-pane label="欧美" name="96" :lazy="true">
            <List :songlist="list" :trackIds="list" v-show="current_choose==0"></List>
            <new-album :newalbums="monthData" v-show="current_choose==1"></new-album>
        </el-tab-pane>
        <el-tab-pane label="韩国" name="8" :lazy="true">
            <List :songlist="list" :trackIds="list" v-show="current_choose==0"></List>
            <new-album :newalbums="monthData" v-show="current_choose==1"></new-album>
        </el-tab-pane>
        <el-tab-pane label="日本" name="16" :lazy="true">
            <List :songlist="list" :trackIds="list" v-show="current_choose==0"></List>
            <new-album :newalbums="monthData" v-show="current_choose==1"></new-album>
        </el-tab-pane>

    </el-tabs>
</div>
</template>

<script>
import List from './newmusicChild/List'
import NewAlbum from './newmusicChild/newalbum'
export default {
    components: {
        List,
        NewAlbum
    },
    data() {
        return {
            current_choose: 0, // 0新歌速递 1新碟上架
            selected: "0",
            list: [],
            monthData: []
        };
    },
    computed: {},
    watch: {
        current_choose(val) {
            if (val == 0) {
                this.get_top_song(this.selected)
            } else {
                this.get_top_album("ALL", 0, 50)
            }
        }
    },
    methods: {
        tabclick(val) {
            console.log(val.label, val.name)
            if (this.current_choose == 0) {
                this.get_top_song(this.selected)
            } else {
                switch (val.label) {
                    case "全部":
                        this.get_top_album("ALL", 0, 50)
                        break;
                    case "华语":
                        this.get_top_album("ZH", 0, 50)
                        break;
                    case "欧美":
                        this.get_top_album("EA", 0, 50)
                        break;
                    case "韩国":
                        this.get_top_album("KR", 0, 50)
                        break;
                    case "日本":
                        this.get_top_album("JP", 0, 50)
                        break;
                }
            }
        },
        get_top_song(type) {
            this.$api.top_song(type).then((result) => {
                this.list = result.data
                //   console.log(this.list)
            }).catch((err) => {

            });
        },
        get_top_album(area, offset, limit) {
            this.$api.top_album(area, offset, limit).then((result) => {
                this.monthData = result.monthData
                console.log(result)
            }).catch((err) => {

            });
        }

    },
    created() {

    },
    mounted() {
        this.get_top_song(this.selected)
    },
}
</script>

<style lang="less">
//@import url(); 引入公共css类
.newmusic {
    .el-tabs .el-tabs__nav-scroll {
        display: inherit;

    }

    .el-tabs__item {
        padding: 0 8px;

    }

    .el-button-group {
        margin: 10px 0px;
        margin-left: 50%;
        transform: translate(-50%);

    }

}
</style>
