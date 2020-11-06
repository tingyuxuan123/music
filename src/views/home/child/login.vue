<template>
<div class='login' v-show="show">
    <div class="el-icon-close" @click="show = false"></div>
    <h3>login</h3>
    <light-input class="input" v-model="loginfrom.phone" placeholder="手机号"></light-input>
    <light-input class="input" v-model="loginfrom.password" placeholder="密码" type="password"></light-input>

    <el-button class="login-button" :logging="logging" type="primary" round @click="onLogin">登录</el-button>
</div>
</template>

<script>
import LightInput from "components/common/LightInput"
import cookie from '@/utils/cookie'
import {
    future,
    str_empty
} from '@/utils/utils'
export default {
    components: {
        LightInput
    },
    data() {
        return {
            show: false,
            loginfrom: {
                phone: "",
                password: ""
            },
            logging: false
        };
    },
    computed: {},
    watch: {},
    methods: {
        onLogin() {

            if (str_empty(this.loginfrom.phone) || str_empty(this.loginfrom.password)) {
                this.$notify.warning({
                    title: '格式错误',
                    message: '用户名或密码不能为空'
                })

                return
            }

            this.logging = true
            this.$api.login(this.loginfrom.phone, this.loginfrom.password).then((result) => {
                this.logging = false

                this.$store.commit("updated_login_status", {
                    isLogin: true,
                    profile: result['profile']
                })

                cookie.value = result['cookie']

                this.$bus.$emit("login_staus") //登录状态改变时发送

                console.log(result)
                future(function () {
                    this.logging = false;
                    this.show = false
                    this.$notify.success({
                        title: '登录成功',
                        message: `欢迎登录 ${this.$store.state.profile.name}`
                    })
                }, 1000, this)

            }).catch((err) => {
                future(function () {
                    this.$notify.error({
                        title: '登录失败',
                        message: `请检查用户名或密码`
                    })
                    this.logging = false;
                }, 1000, this)
            });

        }
    },
    created() {
        this.$bus.$on("clicklogin", () => {
            this.show = !this.show
        })
    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.login {
    width: 300px;
    height: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fafafa;
    z-index: 20000;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);

    display: flex;
    flex-direction: column;
    padding: 20px;
    box-sizing: border-box;
}

h3 {
    margin: 0px 10px 20px 0px;
    text-align: center;
    color: #66b1ff;
    font-size: 24px;
    font-weight: bolder;
}

.input {
    margin: 10px 0px;
}

.login-button {
    margin-top: 30px;
}

.el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
