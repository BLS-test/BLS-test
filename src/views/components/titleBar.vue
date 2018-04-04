<template>
  <div class="title-bar">
    <span>{{ title }}</span>
    <div class="switch-box">
        <i class="el-icon-arrow-up" v-if="arrow" @click="toggleClick"></i>
        <i class="el-icon-close" v-if="close" @click="offClick"></i>
    </div>
  </div>
</template>

<script>

export default {
  props: {
      title:{
          type: String
      },
      arrow:{
          type: Boolean
      },
      close:{
          type: Boolean
      }
  },
  methods: {
      toggleClick:function(){
          
          this.$emit('toggleTab')
      },
      offClick:function(){
          
      }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .title-bar {
        height: 48px;
        line-height: 48px;
        padding-left: 20px;
        border-bottom: 2px solid #eee;
        span {
        font-size: 14px;
        }
        .switch-box {
            display: inline-block;
            float: right; 
            padding-right: 10px;
            cursor: pointer;
        }
    }
</style>
