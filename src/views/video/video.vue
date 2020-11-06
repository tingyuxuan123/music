<template>
<div class='video'>
    <el-tabs class="tabs" v-model="selected">
        <el-tab-pane label="视频" name="1" :lazy="true">
            <el-select v-model="label" placeholder="请选择" size="mini" @change="lableChange">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                    <span>{{item.name}}</span>
                </el-option>
            </el-select>
            <div class="category">
                <span>分类:</span>
                <span v-for="(item,index) in category" :key="item.id" :class="{current:index==current}" @click="groupchange(item.name,item.id)">
                    {{ item.name  }}
                </span>
            </div>
            <video-list :videolist="viewlist"></video-list>
        </el-tab-pane>
        <el-tab-pane label="MV" name="2" :lazy="true">
            <mv-list></mv-list>
        </el-tab-pane>

    </el-tabs>
</div>
</template>

<script>
import VideoList from './videochild/videolist'
import MvList from './videochild/mvlist'
export default {
    components: {
        VideoList,
        MvList
    },
    data() {
        return {
            selected: '1',
            options: [],
            value: "",
            category: [],
            current: 0,
            label: "全部视频",
            viewlist: [],
            hasmore: true
        };
    },
    computed: {},
    watch: {
        value() {
            console.log(this.value, this.label)
        }
    },
    methods: {
        get_video_group_list() {
            this.$api.video_group_list().then((result) => {
                //    console.log(result)
                result.data.unshift({
                    name: "全部视频",
                    id: 1
                })
                this.options = result.data
            }).catch((err) => {

            });
        },
        get_video_category_list() {
            this.$api.video_category_list().then((result) => {
                //     console.log(result)
                this.category = result.data
            }).catch((err) => {

            });
        },
        get_videoall(offset) {
            this.$api.videoall(offset).then((result) => {

                this.hasmore = result.hasmore
                this.viewlist = this.viewlist.concat(result.datas)
                this.viewlist = this.viewlist.filter((item) => {
                    if (item.data.coverUrl) {
                        return true
                    } else {
                        return false
                    }

                })

                console.log(this.viewlist)
            }).catch((err) => {

            });
        },
        get_group(id, offset) {
            this.$api.group(id, offset).then((result) => {
                this.hasmore = result.hasmore
                this.viewlist = this.viewlist.concat(result.datas)
                this.viewlist = this.viewlist.filter((item) => {
                    console.log(item.data.creator)
                    if (item.data.coverUrl) {
                        return true
                    } else {
                        return false
                    }

                })
                console.log(result)
            }).catch((err) => {

            });
        },
        groupchange(name, index) {
            this.current = index
            this.label = name
            this.viewlist = []
            this.get_group(index, 0)

        },
        lableChange(value) {
            this.viewlist = []
            this.get_group(value, 0)

        }

    },
    created() {

    },
    mounted() {
        this.get_video_group_list()
        this.get_video_category_list()

        for (var index = 0; index < 5; index++) {
            console.log(index)
            this.get_videoall(index * 8)
        }

    },
}
</script>

<style lang="less">
//@import url(); 引入公共css类

.video{
    padding: 20px;
}
.el-select {
    width: 120px;
}

.category {
    margin-bottom: 15px;
    margin-top: 10px;

    span {
        padding-left: 8px;
        padding-right: 8px;
        border-right: 1px solid #000;
        font-size: 12px;
        cursor: pointer;
        color: #666;
    }

    // .current {
    //     color: #000;
    // }

    span:first-child {
        padding: 0px;
        border: none;
        cursor: inherit;
    }

    span:last-child {
        border: none;
    }
}

.el-scrollbar__view {
    display: flex;
    width: 400px;
    flex-wrap: wrap;
    height: auto;
    padding: 10px;

    .el-select-dropdown__item:first-child {
        width: 100%;
        margin-bottom: 5px;
    }

    .el-select-dropdown__item {
        width: 20%;
        padding: 0px 5px;
        text-align: center;
        border: 1px solid #666;
        font-size: 12px;
        box-sizing: border-box;

    }

    .el-select-dropdown__item.selected {
        font-weight: 500;
        // border: 1px solid #409EFF;
        color: #409EFF;
    }
}

.video {}
</style>
