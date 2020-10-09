<template>
<div class='SearchHot'>
    <h5 style="font-weight: unset">热搜榜</h5>
    <ul>
        <li v-for="(item,index) in data" :key="item.searchWord" @click="$emit('onclick',item.searchWord)">
            <div class="left" :class="{top3:index<3}">{{index+1}}</div>
            <div class="right">
                <div class="right-top">
                    <span class="searchword">{{item.searchWord}}</span>
                    <span class="score">{{item.score}}</span>
                    <img v-if="item.iconUrl" :src="item.iconUrl" alt="">
                </div>
                <div class="right-bottom">
                    {{item.content}}
                </div>

            </div>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            data: Array
        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {
        //  console.log("dsd")
        this.$api.searchhot().then((result) => {
            this.data = result.data
            //  console.log(result)
        }).catch((err) => {

        });
    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
h5,
.score,
.right-bottom {
    color: #b0bec5;
    font-size: 12px;
}

h5 {
    margin-left: 25px;
}

.searchword {
    font-size: 12px;
    font-weight: bold;
}

.SearchHot {
    width: 100%;
    height: 100%;

    ul {
        list-style: none;
        margin: 0px;
        padding: 0px;

        li {
            display: flex;
            flex-direction: row;
            line-height: 25px;
            justify-items: center;
            cursor: pointer;

            &:hover {
                background-color: #fafafa;
            }

            .left {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 60px;
                font-weight: 500;
                color: #b0bec5;
            }

            .top3 {
                color: red;
            }

            .score {
                margin: 0px 10px;
            }

            img {
                height: 11px;
                margin-left: 6px;

            }
        }
    }
}
</style>
