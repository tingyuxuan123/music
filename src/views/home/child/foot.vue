<template>
<div class='foot'>
    <play-util v-show="$store.state.PlayType"></play-util>
    <Fm-play-util v-show="!$store.state.PlayType"></Fm-play-util>
</div>
</template>

<script>
import PlayUtil from 'views/play/playUtil'
import FmPlayUtil from 'views/personalFM/personalFmChild/playUtil'
export default {
    name: "foot",
    components: {
        PlayUtil,
        FmPlayUtil
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
</style>
