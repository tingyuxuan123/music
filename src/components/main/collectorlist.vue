<template>
<div class='collector'>
    <ul>
        <li v-for="item in subscribers" :key="item.userId" @click="$router.push(`/user/${item.userId}`)">
            <img :src="item.avatarUrl" alt="">
            <span>{{item.nickname}}</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            subscribers: []
        };
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {},
    watch: {
        id(vle, olde) {
            this.getcollector(vle, 1, 35);
        }
    },
    methods: {
        getcollector(id, offest, limit) {
            this.$api.playlist_subscribers(id, offest, limit).then((result) => {
                console.log(result)
                this.subscribers = result.subscribers
            }).catch((err) => {

            });
        }
    },
    created() {

    },
    mounted() {
        this.getcollector(this.id, 1, 35);
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.collector {
    ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-wrap: wrap;

        li {
            width: 20%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 120px;
            cursor: pointer;

            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;

            }

            span {
                font-size: 12px;
            }

        }

    }
}
</style>
