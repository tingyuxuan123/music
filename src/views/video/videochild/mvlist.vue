<template>
<div class='mvlist'>
    <div class="area">
        <span>地区：</span>
        <span v-for="(item,index) in area" :key="item.index" @click="areachange(index)" :class="{current:areaindex==index}"><span>{{item}}</span></span>
    </div>
    <div class="type">
        <span>类型：</span>
        <span v-for="(item,index) in type" :key="item.index" @click="typechange(index)" :class="{current:typeindex==index}"><span>{{item}}</span></span>
    </div>
    <div class="order">
        <span>排序：</span>

        <span v-for="(item,index) in order" :key="item" @click="orderchange(index)" :class="{current:orderindex==index}"><span>{{item}}</span></span>
    </div>
    <mv-list-item :videolist="mvlist"></mv-list-item>
    <el-pagination layout="prev, pager, next" :total="count" :current-page.sync="currentpage" v-if="count>40" @current-change="currentchange" :page-size="40">
    </el-pagination>

</div>
</template>

<script>
import MvListItem from './mvlistItem'
export default {
    components: {
        MvListItem
    },
    data() {
        return {
            area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
            type: ['全部', '官方版', '原生', '现场版', '网易出品'],
            order: ['上升最快', '最热', '最新'],
            areaindex: 0,
            typeindex: 0,
            orderindex: 0,
            mvlist: [],
            count: 0,
            currentpage: 1
        };
    },
    computed: {},
    watch: {},
    methods: {
        get_mvs(area, type, order, offset, limit) {
            this.$api.mvs(area, type, order, offset, limit).then((result) => {
                this.mvlist = result.data
                if (result.count) {
                    this.count = result.count
                }

                console.log(result)
            }).catch((err) => {

            });
        },
        areachange(index) {
            this.areaindex = index;
            this.get_mvs(this.area[this.areaindex], this.type[this.typeindex], this.order[this.orderindex], (index - 1) * 40, 40);
        },
        typechange(index) {
            this.typeindex = index
            this.get_mvs(this.area[this.areaindex], this.type[this.typeindex], this.order[this.orderindex], (index - 1) * 40, 40);
        },
        orderchange(index) {
            this.orderindex = index

            this.get_mvs(this.area[this.areaindex], this.type[this.typeindex], this.order[this.orderindex], (index - 1) * 40, 40);
        },
        currentchange(index) {
            this.currentpage = index
            this.get_mvs(this.area[this.areaindex], this.type[this.typeindex], this.order[this.order], (index - 1) * 40, 40);
        }

    },
    created() {

    },
    mounted() {
        this.get_mvs('全部', '全部', '上升最快', 0, 40);
    },
}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.mvlist {

    .type,
    .area,
    .order {
        margin-bottom: 10px;

        span {
            padding-left: 10px;
            padding-right: 10px;
            border-right: 1px solid #000;
            font-size: 12px;
            cursor: pointer;
            color: #000;
        }

        span:first-child {
            padding: 0px;
            border: none;
            cursor: inherit;
        }

        span:last-child {
            border: none;
        }

        .current {
            span {
                color: #fff;
                background-color: #78909c;
                padding: 1px 6px;
                border-radius: 5px;
            }
        }
    }
}

.el-pagination {
    text-align: center;
    margin-top: 20px;
}
</style>
