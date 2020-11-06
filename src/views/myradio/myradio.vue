<template>
<div class='myradio'>
    <h4>我订阅的电台 <span>({{count}})</span></h4>
    <radio-list :radiolist="radiolist"></radio-list>
    

</div>
</template>

<script>
import RadioList from './radiochild.vue/radiolist'
export default {
    components: {
        RadioList
    },
    data() {
        return {
            radiolist:[],
            count:0
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_dj_sublist(){
            this.$api.dj_sublist().then((result) => {
                console.log(result)
                this.radiolist=result.djRadios
                this.count=result.count
            }).catch((err) => {
                
            });
        }
    },
    created() {

    },
    mounted() {
        this.get_dj_sublist()
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.myradio{
    padding: 20px;
}
h4{
    font-weight: 500;
    margin: 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom:10px;
    span{
        font-size: 12px;
    }
}
</style>
