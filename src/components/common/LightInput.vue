<template>
<input :type="type" :placeholder="placeholder" @input="$emit('input',$event.target.value)">
</template>

<script>
export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    props: {
        type: {
            type: String,
            default: "text"
        },
        placeholder: {
            type: String,
            default: "请输入内容"
        },

    }

}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
input {
    outline: none;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border: none;
    border-radius: 999px;
    text-indent: 1em;
    height: 2.8em;
    box-sizing: border-box;
    width: 100%;
}

input::placeholder {
    font-size: 0.85em
}
</style>
