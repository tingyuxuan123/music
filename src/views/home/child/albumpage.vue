<template>
<div class='albumpage'>

    <div class="albumpage-detail">
        <div class="cover">
            <img class="image1" src="~/assets/img/al_cover_mask.png" alt="">
            <img class="image2" :src="album.blurPicUrl" alt="">
        </div>

        <div class="right">
            <div class="name">{{album.name}}</div>

            <span class="artist-item">歌手: <span class="songer" @click="$router.push(`/songerpage/${album.artist.id}`)">{{album.artist.name}}</span></span>
            <span class="artist-item">发行时间: {{album.publishTime | dateTimeFormat('yyyy-MM-dd')}}</span>
            <span class="artist-item">发行公司: {{album.company}}</span>
        </div>
    </div>

    <el-tabs class="tabs" v-model="selected">

        <el-tab-pane label="歌曲列表" name="1" :lazy="true">
            <song-list :songlist="songs" :trackIds="songs"></song-list>
        </el-tab-pane>
        <el-tab-pane label="评论" name="2" :lazy="true">
            <comment-list type="album" :id="id"></comment-list>

        </el-tab-pane>
        <el-tab-pane label="专辑介绍" name="3" :lazy="true">
            <h3 style="font-size:14px">专辑介绍</h3>
            <div class="description">
                {{album.description}}
            </div>
        </el-tab-pane>

    </el-tabs>
</div>
</template>

<script>
import SongList from 'components/main/Songlist'
import CommentList from 'components/main/commentlist'
export default {
    components: {
        SongList,
        CommentList
    },
    data() {
        return {
            selected: "1",
            album: "",
            songs: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_album_detail(id) {
            this.$api.album_detail(id).then((result) => {
                this.album = result.album
                this.songs = result.songs
                console.log(result)
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.id = this.$route.params.id;
        this.get_album_detail(this.id)
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.albumpage-detail {
    display: flex;

    .cover {
        position: relative;
        margin-left: 20px;

        .image1 {
            width: 175px;
            height: 160px;
        }

        .image2 {
            position: absolute;
            width: 160px;
            height: 160px;
            top: 0px;
            left: -15px;
        }
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

.description {
    font-size: 13px;
    text-indent: 2em;
    color: rgb(102, 102, 102);
    white-space: pre-line;
}

.songer {
    color: blue;
    cursor: pointer;
}
</style>
