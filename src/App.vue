<template>
<div id="app">
    <home />
</div>
</template>

<script>
import home from '@/views/home/home.vue'
import cookie from '../../cloud_music-master/src/utils/cookie';
export default {
    components: {
        home
    },
    beforeCreate() {

        //console.log(cookie.value)
        if (cookie.value != "") {
            this.$api.login_status().then((result) => {
                this.$store.commit("updated_login_status", {
                    isLogin: true,
                    profile: result['profile']
                })
            }).catch((err) => {
                console.log(err)
            });
        }

    },
    created() {
        this.$bus.$on("login_staus", () => {
            this.getuserinfo()

        })
        this.getuserinfo()
    },
    methods: {
        getuserinfo() {
            console.log(this.$store.state.profile)
            let uid = this.$store.state.profile.UID

            this.$api.playlist(uid).then((result) => {
                console.log(result.playlist)
                let other_playlist = result.playlist.filter((item, index) => {
                    return item['subscribed']
                })

                let own_playlist = result.playlist.filter((item, index) => {
                    return !item['subscribed']
                })

                this.$store.commit("updated_user_info", {
                    other_playlist,
                    own_playlist
                })

                // console.log(other_playlist, own_playlist)

            }).catch((err) => {

            });

            this.$api.likelist(uid).then((result) => {
                this.$store.commit("updated_liked_song", result.ids)
            }).catch((err) => {

            });

        }
    },

}
</script>

<style lang="less">
@import "assets/css/base.css";

body,
html {
    background-color: #eceff1;
}

.el-tabs .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
}

::-webkit-scrollbar {
    width: 3px;
}

::-webkit-scrollbar-thumb {
    width: 3px;
    border-radius: 2px;
    background-color: #e0e0e0;
}
</style>
