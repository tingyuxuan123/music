<template>
<div class='searchpage'>
    <el-tabs class="tabs" v-model="selected">
        <div class="total">
            <span>为你找到{{count}}条内容</span>
        </div>
        <el-tab-pane label="单曲" name="1" :lazy="true">
            <song-list :songlist="result" :trackIds="trackIds" @currentchange="currentchange"></song-list>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="100" :lazy="true">
            <search-songer-list :data="artists" :count="artistCount" @currentchange="currentchange"></search-songer-list>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="10" :lazy="true">
            <search-albums-list :data="albums" :count="albumCount" @currentchange="currentchange"></search-albums-list>
        </el-tab-pane>
        <el-tab-pane label="视频" name="1014" :lazy="true">
            <search-video :data="videos" :count="videoCount" @currentchange="currentchange"></search-video>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="1000" :lazy="true">
            <search-playlists-list :data="playlists" :count="playlistCount" @currentchange="currentchange"></search-playlists-list>
        </el-tab-pane>
        <el-tab-pane label="用户" name="1002" :lazy="true">
            <search-userprofiles-list :data="userprofiles" :count="userprofileCount" @currentchange="currentchange"></search-userprofiles-list>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import SongList from 'components/main/Songlist'
import SearchSongerList from 'components/search/search_songer_list'
import SearchVideo from 'components/search/search_video'
import SearchAlbumsList from 'components/search/search_albums_list'
import SearchPlaylistsList from 'components/search/search_playlists_list'
import SearchUserprofilesList from 'components/search/search_userprofiles_list'

export default {
    components: {
        SongList,
        SearchSongerList,
        SearchVideo,
        SearchAlbumsList,
        SearchPlaylistsList,
        SearchUserprofilesList

    },
    data() {
        return {
            selected: "1",
            keywords: "",
            count: 0,
            result: [],
            artistCount: 0,
            artists: [],
            albumCount: 0,
            albums: [],
            videoCount: 0,
            videos: [],
            playlistCount: 0,
            playlists: [],
            userprofileCount: 0,
            userprofiles: [],
            trackIds: []
        };
    },
    computed: {},
    watch: {
        keywords() {
            this.getsearchreult(this.keywords, this.selected, 0);
        },
        selected() {

            this.getsearchreult(this.keywords, this.selected, 0);
        }
    },

    methods: {
        getsearchreult(keywords, type, offset) {
            this.$api.searchresult(keywords, type, offset).then((result) => {
                switch (type) {
                    case "1":
                        this.count = result.result.songCount
                        this.result = result.result
                        this.trackIds = result.result.songs
                        break;
                    case "100":
                        this.count = this.artistCount = result.result.artistCount
                        this.artists = result.result.artists
                        break
                    case "10":
                        this.count = this.albumCount = result.result.albumCount
                        this.albums = result.result.albums
                        break
                    case "1014":
                        this.count = this.videoCount = result.result.videoCount
                        this.videos = result.result.videos
                        break
                    case "1000":
                        this.count = this.playlistCount = result.result.playlistCount
                        this.playlists = result.result.playlists
                        break
                    case "1002":
                        this.count = this.userprofileCount = result.result.userprofileCount
                        this.userprofiles = result.result.userprofiles
                        break
                }

                console.log(result)
            }).catch((err) => {

            });
        },
        currentchange(page) {
            console.log(page)
            this.getsearchreult(this.keywords, this.selected, page * 40)
        }
    },
    created() {
        this.keywords = this.$route.params.keywords
        console.log(this.keywords)
        this.getsearchreult(this.keywords, this.selected, 0);
    },
    mounted() {

    },
    beforeRouteUpdate(to, from, next) {
        this.keywords = to.params.keywords;
        next();
    }

}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.total {
    font-size: 12px;
    margin: 15px 0px;
}
</style>
