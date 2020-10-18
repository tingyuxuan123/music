<template>
<div class='blur' :style="{width:width,height:height}">
    <div class="wrapper" v-if="(enable && !isIE)">
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
    computed: {
          isIE() {
        return (!!window.ActiveXObject || "ActiveXObject" in window)
      },
    },
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
    -webkit-filter: blur(100px); 
    -moz-filter: blur(100px);
    -ms-filter: blur(100px); 
    -o-filter: blur(100px);
    filter: blur(100px);

    // filter: url(blur.svg#blur); /* IE10 */  
     filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='100');/* IE6~IE9 */
}

.bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 70%;
    height: 60%;
}

.content {
    position: absolute;
    width: 100%;
}
</style>
