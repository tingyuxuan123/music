<template>
<div class='SearchSuggest'>
    <ul>
        <li v-for="(item,index) in data" :key="index" @click="$emit('onclick',item.keyword)">
            <span class="el-icon-search"></span>
            {{item.keyword}}
        </li>
    </ul>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            data: []
        };
    },
    computed: {},
    watch: {
        searchvalue() {
            console.log("ds")
            if (this.searchvalue) {
                this.$api.searchsuggest(this.searchvalue).then((result) => {
                    this.data = result.result.allMatch
                    console.log(this.data)
                }).catch((err) => {

                });
            }

        }
    },
    methods: {

    },
    props: {
        searchvalue: {
            type: String,
            default: ""
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
.SearchSuggest {
    ul {
        list-style: none;

        padding: 0px;

        li {
            line-height: 35px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            padding: 0px 20px;

            &:hover {
                background-color: #fafafa;
            }
        }
    }
}
</style>
