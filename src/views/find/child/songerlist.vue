<template>
<div class='songerlist'>
    <div class="type">
        <span>语种：</span>
        <span v-for="(item,index) in type" :key="item.index" @click="typechange(index)" :class="{current:typeindex==index}"><span>{{item.sign}}</span></span>
    </div>
    <div class="area">
        <span>分类：</span>
        <span v-for="(item,index) in area" :key="item.index" @click="areachange(index)" :class="{current:areaindex==index}"><span>{{item.sign}}</span></span>
    </div>
    <div class="initial">
        <span>筛选：</span>

        <span v-for="(item,index) in initial" :key="item" @click="initialchange(index,item)" :class="{current:initialindex==index}"><span>{{index==0 ? '热门':item}}</span></span>
    </div>

    <h4>歌手</h4>

    <div class="remember">
        <div v-for="item in artists" :key="item.id" class="playlist_item" @click="$router.push(`/songerpage/${item.id}`)">
            <img :src="item.img1v1Url" alt="">
            <span>{{item.name}}</span>

        </div>
        <div class="util" v-for="item in utilcount" :key="item">{{item}}</div>
    </div>

</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            type: [{
                    sign: "全部",
                    index: -1
                },
                {
                    sign: "男歌手",
                    index: 1
                },
                {
                    sign: "女歌手",
                    index: 2
                },
                {
                    sign: "乐队",
                    index: 3
                }
            ],
            area: [{
                    sign: "全部",
                    index: -1
                },
                {
                    sign: "华语",
                    index: 7
                },
                {
                    sign: "欧美",
                    index: 96
                },
                {
                    sign: "日本",
                    index: 8
                },
                {
                    sign: "韩国",
                    index: 16
                },
                {
                    sign: "其他",
                    index: 0
                }
            ],
            initial: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'],
            typeindex: 0,
            areaindex: 0,
            initialindex: 0,
            artists: [],
            more: false,
            utilcount: 0
        };
    },
    computed: {},
    watch: {},
    methods: {
        typechange(index) {
            this.typeindex = index
            this.get_artist_cate_list(this.area[this.areaindex].index, this.type[this.typeindex].index, this.initial[this.initialindex])
        },
        areachange(index) {
            this.areaindex = index
            this.get_artist_cate_list(this.area[this.areaindex].index, this.type[this.typeindex].index, this.initial[this.initialindex])
        },
        initialchange(index, value) {
            this.initialindex = index

            this.get_artist_cate_list(this.area[this.areaindex].index, this.type[this.typeindex].index, this.initial[this.initialindex])

        },
        get_artist_cate_list(area, type, initial, offset = 0, limit = 50) {
            console.log(area, type, initial)
            this.$api.artist_cate_list(area, type, initial, offset, limit).then((result) => {
                console.log(result)
                this.artists = result.artists
                this.more = result.more
                this.utilcount = 5 - result.artists.length % 5
            }).catch((err) => {

            });
        },
        get_top_song() {

        }

    },
    created() {

    },
    mounted() {
        this.get_artist_cate_list(this.area[this.areaindex].index, this.type[this.typeindex].index, this.initial[this.initialindex])
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.type,
.area,
.initial {
    margin-bottom: 10px;

    span {
        padding-left: 10px;
        padding-right: 10px;
        border-right: 1px solid #000;
        font-size: 12px;
        cursor: pointer;
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

    .current {
        span {
            color: #fff;
            background-color: #78909c;
            padding: 1px 6px;
            border-radius: 5px;
        }
    }
}

h4 {
    font-size: 14px;
    font-weight: 500;
    margin: 0px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
}

.remember {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .playlist_item {
        width: 17%;
        margin: 10px;
        position: relative;
        cursor: pointer;

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
</style>
