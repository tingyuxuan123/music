<template>
<div class='playlist'>
    <div class="category">
        <span>热门标签：</span>
        <span v-for="(item,index) in category" :key="item.id" :class="{current:index==current}" @click="getinfro(index,item.name)">
            {{ item.name  }}
        </span>
    </div>
    <div class="remember">
        <div v-for="item in playlist" :key="item.id" class="playlist_item" @click="$router.push(`/playlist/${item.id}`)">
            <img :src="item.coverImgUrl" alt="">
            <span>{{item.name}}</span>
            <span class="playCount"><img src="~/assets/img/play.png" alt="" srcset=""> {{item.playCount | logogram}}</span>
        </div>
        <div class="util" v-for="item in utilcount" :key="item">{{item}}</div>
    </div>
    <el-pagination layout="prev, pager, next" :total="total" :current-page.sync="currentpage" v-if="total>pagecount " @current-change="currentchange" :page-size="pagecount">
    </el-pagination>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            category: [],
            current: 0, //当前分类idnex
            playlist: [],
            total: 0,
            pagecount: 50,
            currentpage: 1,
            utilcount: 0,

        };
    },
    computed: {},
    watch: {},
    methods: {
        get_playlist_category() {
            this.$api.playlist_category().then((result) => {
                this.category = result.tags
                console.log(result)
                this.get_top_playlist(this.category[0].name)

            }).catch((err) => {

            });
        },
        get_top_playlist(cat, offset = 0, limit = 50) {
            this.$api.top_playlist(cat, offset, limit).then((result) => {
                console.log(result)
                this.playlist = result.playlists
                this.total = result.total
                this.utilcount = 5 - result.playlists.length % 5
            }).catch((err) => {

            });
        },
        getinfro(index, tag) {
            this.current = index;
            this.currentpage = 1
            this.get_top_playlist(tag)
        },
        currentchange(pageindex) {
            let offset = (pageindex - 1) * this.pagecount
            this.get_top_playlist(this.category[this.current].name, offset)
        }
    },
    created() {

    },
    mounted() {
        this.get_playlist_category()
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.category {
    margin-bottom: 10px;

    span {
        padding-left: 8px;
        padding-right: 8px;
        border-right: 1px solid #000;
        font-size: 12px;
        cursor: pointer;
        color: #666;
    }

    .current {
        color: #000;
    }

    span:first-child {
        padding: 0px;
        border: none;
        cursor: inherit;
    }

    span:last-child {
        border: none;
    }
}

.remember {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .playlist_item {
        width: 17%;
        margin: 10px;
        position: relative;

        img {
            width: 100%;
            border-radius: 5px;
        }

        span {
            font-size: 14px;
        }

        .playCount {
            font-size: 12px;
            color: #ffffff;
            position: absolute;
            top: 5px;
            right: 5px;

            img {
                width: 16px;
                vertical-align: top;
            }
        }

    }

    .util {
        width: 17%;
        opacity: 0;
    }
}

.el-pagination {
    text-align: center;
    margin-top: 20px;
}
</style>
