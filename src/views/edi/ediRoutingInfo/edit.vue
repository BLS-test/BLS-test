<template>
  <div class="full-page white-bg">
    <div class="content-box">
      <div class="form-box" >
          <title-bar :title="title"></title-bar>
          <div class="edit-btn-box">
            <el-button @click="goBack" size="mini" type="primary">返回</el-button>
          </div>
          <dynamic-Form  key="editForm" :modelData="infoData" :data="editFormData" size="mini" ref="dynamicValidateForm"></dynamic-Form>
      </div>
    </div>
  </div>
</template>

<script>
import btnGroup from "views/components/btnGroup";
import dynamicForm from "components/dynamicForm";
import titleBar from "views/components/titleBar";

export default {
  name: "edit",
  components: {
    titleBar,
    btnGroup,
    dynamicForm
  },
  props: {
    pageType: {
      type: String,
      default: 'default'//default||add||edit
    },
    title: {
      type: String,
      default: '详情'
    },
    editFormData: {
        type:Array,
        default: []
    },
    infoData: {
      type: Object,
      default: function () {
        return {}
        }
    },
  },
  data (){
      return {
        schema: []
      }
  },
  created() {
    console.log(this.pageType);
    switch (this.pageType) {
      case 'default':
      this.editFormData.forEach((item,index) => {
          item.definedValue = '';
          item.rules = [];
          item.readonly = false
      });
      case 'edit':
      console.log("edit",this.infoData)
      this.editFormData.forEach((item,index) => {
          item.definedValue = this.infoData[item.id];
          item.rules = [];
          item.readonly = true
      });
      console.log(this.editFormData)
      case 'add':
      this.editFormData.forEach((item,index) => {
          item.definedValue = '';
          item.readonly = false
      });
    }  
  },
  methods: {
    goBack: function() {
      this.$emit("toggleEdit", 'back');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.full-page {
  position: absolute;
  z-index: 99999;
  top: 10px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  .content-box {
    .el-form {
        padding-top: 10px;
    }  
    .edit-btn-box {
        margin-left:2%;padding: 10px 0;
    }
    .el-form-item--mini &.el-form-item {
        margin-bottom: 10px;
    }
  }
}
.white-bg {
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
</style>
