<template>
<div class='head'>
    <div class="head-left">
        <logo />
        <history class="history" />
        <search />
    </div>
    <div class="head-right">
        <login />
    </div>

</div>
</template>

<script>
import logo from 'components/head/logo'
import login from 'components/head/login'
import history from 'components/head/history'
import search from 'components/head/search'
export default {
    name: "head",
    components: {
        logo,
        login,
        history,
        search
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
.head {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .head-left,
    .head-right {
        display: flex;
        align-items: center;
    }

    .history {
        margin: 0px 30px;

    }
}
</style>
