<template>
<div class='commentlist'>
    <h5>最新评论<span>({{total}})</span></h5>
    <ul>
        <li v-for="item in comments" :key="item.commentId">
            <div class="left">
                <img :src="item.user.avatarUrl" alt="">
            </div>
            <div class="right">
                <div class="top">

                    <span class="username">{{item.user.nickname}}:</span>
                    <span class="content">{{item.content}}</span>
                </div>
                <div class="center" v-if="item.beReplied.length>0">
                    <span class="username">@{{item.beReplied[0].user.nickname}}:</span>
                    <span> {{item.beReplied[0].content}}</span>

                </div>
                <div class="bottom">
                    <span>{{item.time | dateTimeFormat('yyyy-MM-dd HH:mm:ss')}}</span>
                    <div class="bottom-right">
                        <img src="~assets/img/like.svg" alt="" srcset="">
                        <span>{{item.likedCount | logogram}}</span>
                        <span style="margin-left:3px;">回复</span>
                    </div>

                </div>
            </div>

        </li>
    </ul>
    <el-pagination layout="prev, pager, next" :current-page.sync="currentpage" :total="total" v-if="total>40" @current-change="currentchange" :page-size="40">
    </el-pagination>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            limit: 40,
            comments: [],
            topComments: [],
            total: 0,
            currentpage: 1
        };
    },
    props: {
        type: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }

    },
    computed: {},
    watch: {
        id(val, oldVal) {
            console.log(val)
            this.currentpage = 1
            console.log(this.currentpage)
            this.getcomment(val, 0, this.limit)

        }
    },
    methods: {
        getcomment(id, offest, limit) {
            switch (this.type) {
                case "playlist": //歌单评论
                    this.$api.comment_playlist(id, offest * 40, limit).then((result) => {
                        console.log(result)
                        this.currentpage = offest + 1
                        this.comments = result.comments
                        this.topComments = result.topComments
                        this.total = result.total
                    })
                    break;
                case "video": //歌曲评论
                    this.$api.comment_video(id, offest * 40, limit).then((result) => {
                        console.log(result)
                        this.currentpage = offest
                        this.comments = result.comments
                        this.topComments = result.topComments
                        this.total = result.total
                    })
                    break;
                case "mv": //mv评论
                    this.$api.comment_mv(id, offest * 40, limit).then((result) => {
                        console.log(result)
                        this.currentpage = offest
                        this.comments = result.comments
                        this.topComments = result.topComments
                        this.total = result.total
                    })
                    break;
                case "album": //mv评论
                    this.$api.comment_album(id, offest * 40, limit).then((result) => {
                        console.log(result)
                        this.currentpage = offest
                        this.comments = result.comments
                        this.topComments = result.topComments
                        this.total = result.total
                    })
                    break;
                case "song": //mv评论
                    if (id) {
                        this.$api.comment_music(id, offest * 40, limit).then((result) => {
                            console.log(result)
                            this.currentpage = offest
                            this.comments = result.comments
                            this.topComments = result.topComments
                            this.total = result.total
                        })

                    }

                    break;

            }

        },

        currentchange(page) {
            //    this.currentpage = page
            this.getcomment(this.id, page - 1, this.limit)
        }

    },
    created() {

    },
    mounted() {
        this.currentpage = 1
        this.getcomment(this.id, 0, this.limit)

        console.log(this.id, this.current_page, this.type)
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.commentlist {
    width: 100%;
}

h5 {
    font-size: 14px;
    margin-bottom: 0px;
    margin-top: 10px;
    padding-bottom: 5px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;

    li {
        display: flex;
        font-size: 12px;
        width: 100%;
        // line-height: 2.8em;
        padding: 10px 0px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        .left {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }

        .right {
            width: 100%;
            margin-left: 15px;

            .top {
                display: flex;

                .username {

                    color: blue;
                    margin-right: 3px;
                }

            }

            .center {
                background-color: #eee;
                padding: 5px;
                margin-top: 5px;
            }

            .bottom {
                display: flex;
                justify-content: space-between;
                padding-top: 5px;
                color: #9e9e9e;

                img {
                    width: 15px;
                    height: 15px;
                    vertical-align: bottom;
                    margin-right: 3px;
                }

            }
        }
    }
}

.el-pagination {
    text-align: center;
    margin-top: 20px;
}
</style>
