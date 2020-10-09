<template>
<div class='blur' :style="{width:width,height:height}">
    <div class="wrapper" v-if="enable">
        <img :src="img" alt="" class="bg">
    </div>
    <div class="content">
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {

        };
    },
    props: {
        img: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100%"
        },
        enable: {
            type: Boolean,
            default: true
        }
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
.blur {
    position: relative;
}

.wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 15px 0;
    background-color: white;
    filter: blur(100px);
}

.bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 80%;
    height: 70%;
}

.content {
    position: absolute;
    width: 100%;
}
</style>
