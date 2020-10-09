<template>
<div class='describe'>
    <div>
        <div clas="desc">{{desc}}</div>
        <div class="introduction">
            <div v-for="(item,index) in introduction" :key="index">
                <div class="ti">{{item.ti}}</div>
                <div class="txt">{{item.txt}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            desc: "",
            introduction: []
        };
    },
    computed: {},
    watch: {},
    props: {
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        get_artist_desc(id) {
            this.$api.artist_desc(id).then((result) => {
                console.log(result)
                this.introduction = result.introduction
                this.desc = result.briefDesc
            }).catch((err) => {

            });
        },
    },
    created() {
        this.get_artist_desc(this.id)
    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.describe {
    white-space: pre-line;
    font-size: 14px;
}

.ti {
    color: #000;
}

.txt {
    color: #666;
}
</style>
