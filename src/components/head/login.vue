<template>
<div class='login'>
    <div v-if="!$store.state.isLogin">
        <img class="avatar" src="~@/assets/img/default_avatar.png" alt="" @click="login">
        <span class="user-name" @click="login">未登录</span>
    </div>
    <div v-else>

        <el-dropdown>
            <span class="el-dropdown-link">
                <img class="avatar" :src="$store.state.profile.avatarUrl" alt="" @click="$router.push(`/user/${$store.state.profile.UID}`)">
                <span class="user-name">{{$store.state.profile.name}}</span><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-popconfirm title="你确定要退出登录吗？" @onConfirm="onConfirm">
                    <el-dropdown-item slot="reference">退出登录</el-dropdown-item>
                </el-popconfirm>
            </el-dropdown-menu>
        </el-dropdown>

    </div>

</div>
</template>

<script>
import cookie from '@/utils/cookie'
export default {
    components: {},
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        login() {
            this.$bus.$emit("clicklogin")
        },
        onConfirm() {
            this.$api.login_logout().then((result) => {
                cookie.value = ""
                this.$store.commit('logout');
                this.$bus.$emit("login_staus")

            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.login {
    display: inline-block;
}

.avatar {
    width: 25px;
    height: 25px;
    vertical-align: middle;
    border-radius: 50%;
}

.user-name {
    margin-left: 10px;
    font-size: 11px;
    font-weight: bold;
}
</style>
