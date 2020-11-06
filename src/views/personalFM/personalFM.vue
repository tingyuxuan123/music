<template>
<div class='personalFM'>
    <fm-song :id="currentid"></fm-song>
</div>
</template>

<script>
import FmSong from './personalFmChild/FmSong'
export default {
    components: {
        FmSong,
    },
    data() {
        return {
            fmlist: [],
            currentid: 0

        };
    },
    computed: {},
    watch: {

    },
    methods: {
        get_personal_fm() {
            this.$api.personal_fm().then((result) => {
                console.log(result)
                this.fmlist = result.data
                this.currentid = this.fmlist[0].id
                console.log(this.$store.state.fm.currentlist.length, 111)
                if (this.$store.state.fm.currentlist.length == 0) {
                    this.$store.commit("updated_fm_currentlist", this.fmlist);

                    this.$store.commit("updated_fm_info", {
                        currentindex: 0,
                        currentsongid: this.fmlist[0].id,
                        currenttime: 0
                    })
                    this.currentid = this.fmlist[0].id
                    this.$bus.$emit("fm-click", this.currentid)
                    console.log(this.$store.state.fm.currentsongid, this.currentid)
                } else {
                    // console.log(this.$store.state.fm,333)
                    this.currentid = this.$store.state.fm.currentsongid
                    //  console.log(this.$store.state.fm,this.currentid)
                }

                console.log(this.currentid)
            }).catch((err) => {

            });
        }
    },
    created() {
        if (this.$store.state.fm.currentlist.length == 0) { //如果fm列表的长度为0  就播放
            this.$store.commit("changepalytype", false);
        }

        this.$bus.$on("sxfm", (type, id) => { //监听 fm 歌曲的改变  type 为true 为刷新  反之 改id
            console.log(type, id)
            if (type == true) {
                this.get_personal_fm();
            } else {
                console.log(id)
                this.currentid = id;
            }

        })

    },
    mounted() {
        this.get_personal_fm();
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.personalFM {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
