<template>
    <div class="btn-group" :style="{'text-align': align}">
        <el-button :type="item.type" v-for="item in btnArr" v-if="item.show" :key="item.icon" @click="item.fn" :icon="'el-icon-' + item.icon" :size="size" >{{ item.text }}</el-button>
    </div>
</template>
  
<script>
export default {
    props: {
        btnArr: {
            type: Array,
            default () {
                return []
            } 
        },
        align: {
            type: String //按钮的对齐方向 默认left 可选值 right / left/ center
        },
        size: {
            type: String, //默认 small 可选值 medium / small / mini
            default () {
                return "small"
            }
        }
    }
        
}
</script>

<style scoped>
    .btn-group {
        padding: 15px 0;
    }
</style>

