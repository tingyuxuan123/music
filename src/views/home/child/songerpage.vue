<template>
<div class='songerpage'>

    <div class="songer-detail">
        <img :src="artist.img1v1Url" alt="">
        <div class="right">
            <div class="name">{{artist.name}} <span v-if="artist.alias[0]">({{artist.alias[0]}})</span> </div>

            <span class="artist-item">单曲数:{{artist.musicSize}}</span>
            <span class="artist-item">专辑数:{{artist.albumSize}}</span>
            <span class="artist-item">MV数:{{artist.mvSize}}</span>
        </div>
    </div>

    <el-tabs class="tabs" v-model="selected">

        <el-tab-pane label="热门歌曲" name="1" :lazy="true">
            <song-list :songlist="hotSongs"></song-list>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="2" :lazy="true">
            <album :id="id"></album>

        </el-tab-pane>
        <el-tab-pane label="MV" name="3" :lazy="true">
            <mv :id="id"></mv>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="4" :lazy="true">
            <describe :id="id"></describe>

        </el-tab-pane>

    </el-tabs>
</div>
</template>

<script>
import SongList from 'components/main/Songlist'
import album from 'components/songer/album'
import describe from 'components/songer/describe'
import mv from 'components/songer/mv'
export default {
    components: {
        SongList,
        album,
        describe,
        mv
    },
    data() {
        return {
            selected: "1",
            id: "",
            artist: "",
            hotSongs: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_artist_info(id) {
            this.$api.artist_info(id).then((result) => {
                this.artist = result.artist
                this.hotSongs = result.hotSongs
                console.log(result)
            }).catch((err) => {

            });

        },

    },
    created() {

    },
    mounted() {
        this.id = this.$route.params.id;
        console.log(this.id)
         this.get_artist_info(this.id)
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类

.songer-detail {
    display: flex;

    img {
        width: 180px;
        height: 180px;
        border-radius: 5px;
    }

    .right {
        display: flex;
        flex-direction: column;
        padding: 0px 40px;

        .name {
            margin-bottom: 20px;
        }

        .artist-item {
            font-size: 12px;
            color: #666;
            margin-bottom: 5px;
        }
    }
}
</style>
