<template>
  <div class="full-page">
    <div class="form-box white-bg">
      <title-bar title="核注清单表头" :arrow="true"></title-bar>
      <div class="btn-box">
        <btn-Group :btnArr="btngroup" align="left" size="small" style="margin-right:2%"></btn-Group>
        <dynamic-Form :data="dataCrud" ref="dynamicValidateForm"></dynamic-Form>
      </div>
    </div>
  </div>
</template>

<script>
  import titleBar from "views/components/titleBar";
  import btnGroup from "views/components/btnGroup";
  import dynamicForm from "components/dynamicForm";
  import initData from "./initData"


  export default {
    name: "edit",
    components: {
      titleBar,
      btnGroup,
      dynamicForm
    },
    data() {
      return {
        dataCrud: [],
        btngroup: [
          {
            type: "primary", //按钮颜色
            icon: "document", //按钮icon
            text: "暂存", //按钮文字
            show: true,
            fn: () => {
            } //按钮点击事件
          },
          {
            type: "success",
            icon: "info",
            show: true,
            text: "申报",
            fn: () => {

            }
          },
          {
            type: "primary",
            icon: "back",
            text: "返回",
            show: true,
            fn: () => {
              this.goBack()
            }
          },
          {
            type: "success",
            icon: "printer",
            text: "打印",
            show: true,
            fn: () => {
              this.showEdit = true;
            }
          },
        ],

      }
    },
    created() {
      this.dataCrud = initData.dataCrud;
    },
    methods: {
      goBack: function () {
        this.$emit("toggleEdit", 'back');
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .full-page {
    margin-top: 10px;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: 1px solid #dcdcdc;
    padding: 20px;
    .form-box {
      padding-bottom: 20px;
      .btn-box {
        margin-top: 20px;
        .btn-group {
          margin-left: 2%;
          padding-bottom: 15px;
        }
      }
    }
    .white-bg {
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }

  }
</style>
