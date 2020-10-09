<template>
<div class='history'>
    <span class="el-icon-arrow-left" @click="$router.back()"></span>
    <span class="el-icon-arrow-right" @click="$router.forward()"></span>
</div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.history {
    display: inline-block;
}

.el-icon-arrow-left,
.el-icon-arrow-right {
    padding: 1px 3px;
    border-radius: 3px;
}

.el-icon-arrow-left:hover,
.el-icon-arrow-right:hover {
    background-color: #cfd8dc;
}

.el-icon-arrow-left:active,
.el-icon-arrow-right:active {
    background-color: #b0bec5;
}
</style>
