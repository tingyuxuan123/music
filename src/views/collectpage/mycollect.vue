<template>
<div class='mycollect'>
    <el-button-group>
        <el-button :type="currentindex==0 ?'primary' : ''" size="mini" @click="currentindex=0">专辑</el-button>
        <el-button :type="currentindex==1 ?'primary' : ''" size="mini" @click="currentindex=1">歌手</el-button>
        <el-button :type="currentindex==2 ?'primary' : ''" size="mini" @click="currentindex=2">视频</el-button>
    </el-button-group>
    <div class="album" v-show="currentindex==0">
        <h4>收藏的专辑<span>({{albumcount}})</span></h4>
        <album-list :albumlist="albumlist"></album-list>
    </div>
    <div class="artist" v-show="currentindex==1">
        <h4>收藏的歌手<span>({{artistcount}})</span></h4>
        <artist-list :artistlist="artistlist"></artist-list>
    </div>
    <div class="video" v-show="currentindex==2">
        <h4>收藏的视频<span>({{videocount}})</span></h4>
        <video-list :videolist="videolist"></video-list>
    </div>

</div>
</template>

<script>
import AlbumList from './collectchild/albumlist'
import ArtistList from './collectchild/artistlist'
import VideoList from './collectchild/videolist'
export default {
    components: {
        AlbumList,
        ArtistList,
        VideoList
    },
    data() {
        return {
            currentindex: 0, //0 为专辑 1为歌手 2为视频
            albumlist: [],
            artistlist: [],
            videolist: [],
            albumcount: 0,
            artistcount: 0,
            videocount: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_album_sublist() {
            this.$api.album_sublist().then((result) => {
                this.albumlist = result.data
                this.albumcount = result.count
                console.log(result)
            }).catch((err) => {

            });
            this.get_artist_sublist()
            this.get_mv_sublist()
        },
        get_mv_sublist() {
            this.$api.mv_sublist().then((result) => {
                console.log(result)
                this.videolist = result.data
                this.videocount = result.count
            }).catch((err) => {

            });
        },
        get_artist_sublist() {
            this.$api.artist_sublist().then((result) => {
                this.artistlist = result.data
                this.artistcount = result.count
                console.log(result)
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.get_album_sublist();
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
h4 {
    margin: 20px 0px;
    padding: 0px;
    padding-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, .2);

    span {
        color: #666;
        font-size: 12px;
        margin-left: 5px;
    }
}

.el-button-group {
    margin-left: 50%;
    transform: translate(-50%);

    .el-button {
        width: 100px;
    }
}
</style>
