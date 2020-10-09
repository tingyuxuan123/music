<template>
<div class='mvpage'>
    <div class="left">
        <h3><span class="el-icon-arrow-left" @click="$router.back()"></span> {{data.title ? data.title : data.briefDesc}} <span> by {{data.creator ? data.creator.nickname : data.artistName}}</span></h3>
        <video :src="url" autoplay controls poster style="margin-bottom:20px"></video>
        <comment-list :type="type=='mv' ?'mv' : 'video'" :id="id"></comment-list>
    </div>
    <div class="right">
        <div class="right-top">
            <h3>视频介绍</h3>
            <div>
                <span>发布时间:{{data.publishTime | dateTimeFormat('yyyy-MM-dd ')}}</span>
                <span>播放:{{data.playTime ?  data.playTime: data.playCount | logogram}}</span>
            </div>
            <span class="description">{{data.description ? data.description :data.desc}}</span>
        </div>
        <div class="right-bottom">
            <h3>相关视频</h3>
            <div v-for="item in recommend_list" :key="item.vid" class="item" @click="$router.push(`/mvinfo/${item.type ? 'video' : 'mv'}/${item.vid}`)">
                <div class="right-bottom-left">
                    <img :src="item.coverUrl" alt="">
                    <span>{{item.playTime | logogram}}</span>
                </div>
                <div class="right-bottom-right">
                    <span>{{item.title}}</span>
                    <span>{{item.durationms | timeLongFormat('00:00')}}</span>
                    <span>by {{item.creator.userName}}</span>
                </div>

            </div>
        </div>
    </div>
</div>
</template>

<script>
import CommentList from 'components/main/commentlist'
export default {
    components: {
        CommentList
    },
    data() {
        return {
            id: "",
            type: "",
            data: {},
            limit: 40,
            url: "",
            recommend_list: []
        };
    },
    computed: {},
    watch: {

    },
    methods: {
        get_video_detail(type, id) {
            this.$api.video_detail(type, id).then((result) => {
                console.log(result)
                this.data = result.data
            }).catch((err) => {

            });
            this.get_video_url(type, id);
            this.get_related_allvideo(id);
        },
        get_video_url(type, id) {

            this.$api.get_video_url(type, id).then((result) => {
                console.log(result)
                if (type == "video") {
                    this.url = result.urls[0].url
                } else if (type == "mv") {
                    this.url = result.data.url
                }

            }).catch((err) => {

            });
        },
        get_related_allvideo(id) {
            this.$api.related_allvideo(id).then((result) => {
                console.log(result)
                this.recommend_list = result.data
            }).catch((err) => {

            });
        },

    },
    created() {
        this.id = this.$route.params.id
        this.type = this.$route.params.type

        this.get_video_detail(this.type, this.id)
    },
    mounted() {

    },
    beforeRouteUpdate(to, from, next) {
        this.id = to.params.id;
        this.type = to.params.type;
        this.get_video_detail(this.type, this.id)
        next()
    }
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类

.mvpage {
    display: flex;

    .left {
        width: 75%;
        padding-right: 25px;
        box-sizing: border-box;

        video {
            width: 100%;

        }

        h3 {
            font-size: 16px;
            font-weight: 400;

            span {
                font-size: 12px;
            }

            .el-icon-arrow-left {
                font-size: 16px;
                cursor: pointer;
            }
        }
    }

    .right {
        width: 25%;

        h3 {
            font-size: 14px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            padding-bottom: 5px;
        }

        .right-top {
            margin-bottom: 60px;

            div {
                span {
                    font-size: 12px;
                    color: #9e9e9e;
                }
            }

            .description {
                font-size: 13px;
            }

        }

        .right-bottom {

            .item {
                display: flex;

            }

            .right-bottom-left {
                flex: 1;
                position: relative;

                img {
                    width: 100%;
                }

                span {
                    display: inline-block;
                    background: rgba(0, 0, 0, 0.4);
                    padding: 2px;
                    box-sizing: border-box;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    font-size: 11px;
                    color: #ffffff;
                }
            }
        }

        .right-bottom-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 2px;
            box-sizing: border-box;
            cursor: pointer;

            span {
                font-size: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
