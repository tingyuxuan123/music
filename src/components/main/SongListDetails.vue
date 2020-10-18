<template>
<div class='SongListDetails'>
    <blur-background :img="coverImgUrl" height="200px">
        <div class="introduce">
            <div class="introduce_top">
                <img :src="coverImgUrl " alt="" class="cover">
                <div class="top_right">
                    <span class="name">{{name}}</span>
                    <div>
                        <img :src="avatarUrl" alt="" class="userimg">
                        <span class="username">{{nickname}}</span>
                        <span class="createtime">创建时间：{{createTime | dateTimeFormat('yyyy-MM-dd')}}</span>
                    </div>
                    <div class="chaozuo">
                        <div class="option">
                            <span class="icon el-icon-video-play"></span>
                            <span class="icon el-icon-star-off" :class="{subscribed:subscribed,mysong:userId==$store.state.profile.UID}"></span>
                            <span class="icon el-icon-link"></span>
                        </div>
                        <div class="playcount">
                            <span>歌曲数：{{trackCount}}</span>
                            <span>播放：{{playCount | logogram}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="introduce_bottom">
                <div class="sign">
                    标签：{{tags | resloveTags }}
                </div>
                <div class="intro" :class="{allintro:block}" @click="block=!block">
                    {{description | resloveSynopsis}}
                </div>
            </div>

        </div>

        <el-tabs class="tabs" v-model="selected">
            <el-tab-pane label="歌曲列表" name="song-tracks" :lazy="true">

                <!--          歌曲列表-->
                <song-list :songlist="tracks" :trackIds="trackIds"></song-list>
            </el-tab-pane>
            <el-tab-pane label="评论" name="comments" :lazy="true">

                <!--          评论列表-->
                <comment-list type="playlist" :id="id"></comment-list>
            </el-tab-pane>
            <el-tab-pane label="收藏用户" name="collect" :lazy="true">

                <!--          收藏者列表-->
                <collector-list :id="id"></collector-list>
            </el-tab-pane>
        </el-tabs>
    </blur-background>
</div>
</template>

<script>
import {
    str_empty
} from "@/utils/utils"
import BlurBackground from 'components/common/BlurBackground'
import SongList from './Songlist'
import CommentList from './commentlist'
import CollectorList from './collectorlist'
export default {
    name: "SongListDetails",
    components: {
        BlurBackground,
        SongList,
        CommentList,
        CollectorList
    },
    data() {
        return {
            id: "",
            song_list_detail: [],
            coverImgUrl: "",
            name: "",
            avatarUrl: "",
            nickname: "",
            createTime: "",
            trackCount: "",
            playCount: "",
            tags: "",
            description: "",
            subscribed: false,
            userId: '',
            block: false,
            selected: "song-tracks",
            tracks: [],
            trackIds: []

        };
    },
    computed: {},
    watch: {
        id() {
            this.get_song_list_detail()
        }
    },
    methods: {
        get_song_list_detail() {
            console.log(this.$route.params.id)
            this.id = this.$route.params.id
            if (this.id == "") return
            this.$api.song_list_detail(this.id).then((result) => {
                this.song_list_detail = result
                this.coverImgUrl = this.song_list_detail.playlist.coverImgUrl
                this.name = this.song_list_detail.playlist.name
                this.avatarUrl = this.song_list_detail.playlist.creator.avatarUrl
                this.nickname = this.song_list_detail.playlist.creator.nickname
                this.createTime = this.song_list_detail.playlist.createTime
                this.trackCount = this.song_list_detail.playlist.trackCount
                this.playCount = this.song_list_detail.playlist.playCount
                this.tags = this.song_list_detail.playlist['tags']
                this.description = this.song_list_detail.playlist['description']
                this.subscribed = this.song_list_detail.playlist.subscribed
                this.userId = this.song_list_detail.playlist.userId

                this.tracks = this.song_list_detail.playlist.tracks
                this.trackIds = this.song_list_detail.playlist.trackIds
                console.log(this.trackIds)
            }).catch((err) => {

            });
        },

    },
    filters: {
        resloveTags(value) {
            return value.length === 0 ? '还没有添加标签' : value.join(' / ')
        },

        resloveSynopsis(value) {
            return str_empty(value) ?
                `简介：没有谁的生活会一直完美，但无论什么时候，都要看着前方，满怀希望就会所向披靡。(默认简介)` :
                '简介：' + value
        }
    },
    created() {

    },
    mounted() {
        this.get_song_list_detail()
    },
    beforeRouteUpdate(to, from, next) {
        this.id = to.params.id;
        next();
    }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.SongListDetails {
    padding: 10px;
}

.introduce {

    .introduce_top {
        display: flex;

        box-sizing: border-box;

        .top_right {
            flex: 1;
            padding: 20px 30px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .name {
                font-size: 20px;
                font-weight: 700;

            }

            .username {
                font-size: 14px;
                margin-left: 5px;
                cursor: pointer;
            }

            .createtime {
                font-size: 12px;
                margin: 15px;
            }

            .option {
                .icon {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, .2);
                    text-align: center;
                    line-height: 40px;
                    margin-right: 12px;
                    font-size: 22px;
                    cursor: pointer;
                    transition: all 0.4s;
                }

                .subscribed {
                    color: red;

                }

                .mysong {
                    opacity: .5
                }
            }
        }

        .userimg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            cursor: pointer;
        }

        .chaozuo {
            display: flex;
            justify-content: space-between;

            .playcount {
                display: flex;
                flex-direction: column;
                font-size: 14px;
                color: #bdbdbd;
            }
        }
    }

    .introduce_bottom {
        font-size: 12px;
        margin: 10px 0px;

        .intro {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            cursor: pointer;
        }

        .allintro {
            display: block;
            overflow: initial;
            white-space: pre-line;
        }
    }
}

.cover {
    width: 200px;
    height: 200px;
    border-radius: 5px;
}
</style>
