<template>
<div class='search'>
    <div class="search-top">
        <input type="search" placeholder="搜索音乐，视频，歌手" @focus="focus=true" v-model="searchValue" @input="inputchange" @blur="blur()" v-on:keydown.enter="tosearch(searchValue)">
        <span class="el-icon-search search-icon" @click="tosearch(searchValue)"></span>
    </div>

    <div class="search-preview" v-show="focus" :class="{hidden:focus}">
        <search-suggest v-if="ispreview" :searchvalue="searchValue" @onclick="tosearch"></search-suggest>
        <search-hot v-else @onclick="tosearch"></search-hot>
    </div>
</div>
</template>

<script>
import SearchHot from "./SearchHot"
import SearchSuggest from "./SearchSuggest"
export default {
    components: {
        SearchHot,
        SearchSuggest
    },
    data() {
        return {
            focus: false,
            ispreview: false,
            searchValue: ""
        };
    },
    computed: {},
    watch: {
        searchValue() {
            this.searchValue = this.searchValue

        }
    },
    methods: {
        inputchange() {

            if (this.searchValue != "") {
                this.ispreview = true

            } else {
                this.ispreview = false
            }
        },
        tosearch(searchValue) {
            this.focus = false
            this.searchValue = searchValue
            this.$router.push({
                name: "searchpage",
                params: {
                    keywords: searchValue
                }
            })
        },
        blur() {
            setTimeout(() => {
                this.focus = false
                console.log(this.focus)
            }, 1000)
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
.search {
    display: inline-block;
    position: relative;
    background: #ffffff;
    border-radius: 99999px;
    padding: 2px 7px;
    transition: all 0.3s 0.2s;

    input {
        outline: none;
        border: none;
        border-radius: 99999px;
        width: 173px;
        transform: translate(0, -2px);
        transition: all 0.3s 0.2s;
    }

    span {
        cursor: pointer;
    }

    input:hover,
    input:focus {
        width: 230px;
        // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

    .search-top:hover {

        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }

}

.search-preview {
    max-width: 380px;
    min-width: 280px;
    max-height: 450px;
    z-index: 1000;
    position: absolute;
    top: 30px;
    border-radius: 5px;
    background-color: #ffffff;
    overflow: auto;
    opacity: 0;
    transition: all 0.4s;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.hidden {
    opacity: 1;
}
</style>
