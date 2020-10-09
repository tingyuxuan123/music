<template>
<div class='album'>
    <div v-for="item in hotAlbums" :key="item.id" class="album-item" @click="$router.push(`/albumpage/${item.id}`)">
        <div class="cover">
            <img class="image1" src="~/assets/img/al_cover_mask.png" alt="">
            <img class="image2" :src="item.blurPicUrl" alt="">
        </div>

        <span>{{item.name}}</span>
        <span style="color:#666666">{{item.publishTime | dateTimeFormat('yyyy-MM-dd') }}</span>
    </div>
    <div class="util" v-for="item in hotAlbumCount" :key="item">{{item}}</div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            hotAlbums: [],
            hotAlbumCount: ""
        };
    },
    computed: {},
    watch: {
        id(val) {
            this.get_artist_album(val);
            console.log(val)
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        get_artist_album(id) {
            this.$api.artist_album(id).then((result) => {
                this.hotAlbums = result.hotAlbums
                this.hotAlbumCount = this.hotAlbums.length % 5
                console.log(result.hotAlbums)
            }).catch((err) => {

            });
        },
    },
    created() {

    },
    mounted() {
        console.log(this.id)
        this.get_artist_album(this.id)

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.album {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .album-item {
        display: flex;
        flex-direction: column;
        width: 18%;
        margin-bottom: 20px;

        span {
            font-size: 12px;
        }

        .cover {
            position: relative;

            .image1 {
                width: 135px;
                height: 120px;
            }

            .image2 {
                position: absolute;
                width: 120px;
                height: 120px;
                top: 0px;
                left: -5px;
            }
        }

    }

    .util {
        width: 23%;
        opacity: 0;
    }
}
</style>
