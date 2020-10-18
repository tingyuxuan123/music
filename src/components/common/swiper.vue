<template>
<div class='swiper' @mouseenter="enter" @mouseleave="leave">
    <div class="warp">
        <div class="banner_item" :class="{
        first:index==current, 
        left:index==left,
        lefout:index==lefout,
        right:index==right,
        rightout:index==rightout
        }" v-for="(item,index) in banners" :key="item.imageUrl">
            <img :src="item.imageUrl" alt="" srcset="">
        </div>
        <span class="el-icon-arrow-right icon-right" ref="icon_right" @click="next"></span>
        <span class="el-icon-arrow-left icon-left" ref="icon_left" @click="pre"></span>
    </div>
    <!--
 <ul class="el-carousel__indicators el-carousel__indicators--horizontal el-carousel__indicators--outside">
        <li class="el-carousel__indicator el-carousel__indicator--horizontal" v-for="(item,index) in banners.length " :key="index" @click="current=index" :class="{active :current==index}">
            <button class="el-carousel__button" />
        </li>

    </ul>
-->

</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            current: 0,
            length: 0,
            timer: ""
        };
    },
    props: {
        banners: {
            type: Array,
            required: true
        }
    },
    computed: {
        left() {

            let current = this.current
            if (current == 0) {
                return this.banners.length - 1
            } else {
                return current - 1
            }

        },
        lefout() {
            let current = this.current
            if (current == 0) {
                return this.banners.length - 2
            } else if (current == 1) {
                return this.banners.length - 1
            } else {
                return current - 2
            }
        },
        right() {
            let current = this.current
            if (current == this.banners.length - 1) {
                return 0
            } else {
                return current + 1
            }
        },
        rightout() {
            let current = this.current
            if (current == this.banners.length - 1) {
                return 1
            } else if (current == this.banners.length - 2) {
                return 0
            } else {
                return current + 2
            }
        }

    },
    watch: {
        banners() {
            this.time()
        }
    },
    methods: {
        next() {
            if (this.current < this.banners.length - 1) {
                this.current++
            } else {
                this.current = 0
            }
        },
        pre() {
            if (this.current <= 0) {
                this.current = this.banners.length - 1
            } else {
                this.current--
            }
        },
        enter() {
            clearInterval(this.timer)
            this.$refs.icon_left.style.opacity = "1"
            this.$refs.icon_right.style.opacity = "1"
        },
        leave() {
            this.time()
            this.$refs.icon_left.style.opacity = "0"
            this.$refs.icon_right.style.opacity = "0"
        },
        time() {
            this.length = this.banners.length;
            let that = this
            this.timer = setInterval(() => {
                // this.current++;

                if (this.current < this.banners.length - 1) {
                    that.current++
                } else {
                    that.current = 0
                }

                //     console.log(this.current)
            }, 3000)
        }

    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {
        clearInterval(this.timer)
    },

}
</script>

<style lang="less" scoped>
//@import url(); 引入公共css类
.swiper {
    width: 100%;
    height: 220px;

}

.icon-left {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 200;
    background-color: rgba(31, 45, 61, .11);
    display: block;
    font-size: 18px;
    color: #fff;
    border-radius: 50%;
    padding: 6px;
    transition: all 0.4s;
    opacity: 0;
}

.icon-left:hover,
.icon-right:hover {

    background-color: rgba(31, 45, 61, .31);
}

.icon-right {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 200;
    background-color: rgba(31, 45, 61, .11);
    display: block;
    font-size: 18px;
    color: #fff;
    border-radius: 50%;
    padding: 6px;
    transition: all 0.4s;
    opacity: 0;
}

.warp {
    display: flex;
    position: relative;
    height: 180px;
    align-items: center;
    width: 100%;
    overflow: hidden;
}

.banner_item {
    width: 370px;
    height: 150px;
    transition: all ease-in-out 0.4s;
    opacity: 0;

    img {
        width: 100%;
        height: 100%;
    }
}

.first {
    width: 450px;
    height: 180px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    z-index: 120;
    opacity: 1;
}

.left {
    width: 370px;
    height: 150px;
    position: absolute;
    left: 0;
    opacity: 1;
}

.lefout {
    width: 370px;
    height: 150px;
    position: absolute;
    transform: translate(-100%);

}

.right {
    width: 370px;
    height: 150px;
    position: absolute;
    right: 0;
    opacity: 1;
}

.rightout {
    width: 370px;
    height: 150px;
    position: absolute;
    right: 0;
    transform: translate(100%);

}

// .active {
//     //   color: #99a9bf !important;
//     opacity: 1.5;
// }
</style>
