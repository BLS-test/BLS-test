<template>
  <div class="full-page white-bg">
    <div class="content-box">
      <div class="form-box white-bg" >
          <title-bar title="账册修改" :arrow="true"></title-bar>
          <div style="margin-left:2%;padding: 10px 0;">
            <btn-Group :btnArr="btnform" size="small" ></btn-Group>
          </div>
          <dynamic-Form key="editForm" :data="schema" ref="dynamicValidateForm"></dynamic-Form>
      </div>
    </div>
  </div>
</template>

<script>
import initData from "./initData"
import btnGroup from "views/components/btnGroup";
import dynamicForm from "components/dynamicForm";
import titleBar from "views/components/titleBar";
import openWindow from '@/utils/openWindow'

export default {
  name: "edit",
  components: {
    titleBar,
    btnGroup,
    dynamicForm
  },
  props: {
    editTitle: {
      type: String,
      default: ''
    }
  },
  data (){
      return {
        schema: [],
        //form 提交、重置按钮
      btnform: [
        {
          type: "primary",
          icon: "",
          text: "暂存",
          show: true,
          fn: () => {
          }
        },
        {
          type: "primary",
          icon: "",
          text: "申报",
          show: true,
          fn: () => {
            openWindow('https://www.baidu.com/','申报',600,360)
          }
        },
        {
          type: "primary",
          icon: "",
          text: "返回",
          show: true,
          fn: () => {
            this.$emit("toggleEdit", 'back');
          }
        }
      ],
      }
  },
  created() {
    this.schema = initData.searchFormSchema;
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
    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
.white-bg {
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  }
</style>
