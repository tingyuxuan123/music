<template>
<div class='personremmber'>
    <swiper :banners="banners" style="250px"></swiper>
    <remember-playlist>
    </remember-playlist>
</div>
</template>

<script>
import swiper from 'components/common/swiper'
import RememberPlaylist from 'components/find/rememberPlaylist'
export default {
    components: {
        swiper,
        RememberPlaylist
    },
    data() {
        return {
            banners: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_banner() {
            this.$api.banner().then((result) => {
                this.banners = result.banners
                //  console.log(result)
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.get_banner();
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.personremmber {
    height: 100%;

}
</style>
