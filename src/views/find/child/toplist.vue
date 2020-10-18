<template>
<div class='toplist'>
    <h4>官方榜</h4>
    <div class="official">
        <div class="official_item" v-for="item in official" :key="item.id" @click="$router.push(`/playlist/${item.id}`)">
            <img :src="item.coverImgUrl" alt="" srcset="">
            <span>{{item.name}}</span>
            <span class="playCount"><img src="~/assets/img/play.png" alt="" srcset=""> {{item.playCount | logogram}}</span>
        </div>
        <div class="official_item" :key="artistToplist.id">
            <img :src="artistToplist.coverUrl" alt="" srcset="">
            <span>{{artistToplist.name}}</span>
        </div>

    </div>
    <h4>全球榜</h4>
    <div class="global">
        <div class="global_item" v-for="item in global" :key="item.id" @click="$router.push(`/playlist/${item.id}`)">
            <img :src="item.coverImgUrl" alt="">
            <span>{{item.name}}</span>
            <span class="playCount"><img src="~/assets/img/play.png" alt="" srcset=""> {{item.playCount | logogram}}</span>
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
            official: [],
            global: [],
            utilcount: 0,
            artistToplist: {
                coverUrl: "",
                name: "",
                upateFrequency: ""
            }

        };
    },
    computed: {},
    watch: {},
    methods: {
        get_toplist() {
            this.$api.toplist().then((result) => {
                console.log(result)
                this.utilcount = 5 - result.list.length % 5
                this.artistToplist = result.artistToplist
                this.official = result.list.filter((item) => {
                    if (item.ToplistType) {
                        return true
                    } else {
                        return false
                    }
                })
                this.global = result.list.filter((item) => {
                    if (item.ToplistType) {
                        return false
                    } else {
                        return true
                    }
                })
                console.log(this.official)
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.get_toplist()
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
h4 {
    font-size: 18px;
    font-weight: 500;
    margin: 0px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;
}

.official {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .official_item {
        cursor: pointer;
        position: relative;
        width: 17%;
        margin: 10px;

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

        img {
            width: 100%;
            border-radius: 5px;
        }

        span {
            font-size: 14px;
        }

    }

}

.util {
    width: 17%;
    opacity: 0;
    margin: 10px;
}

.global {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    cursor: pointer;

    .global_item {
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

}
</style>
