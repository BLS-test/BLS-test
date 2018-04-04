<template @gotoggle="showToggle">
  <div class="content-box">
    <div class="form-box white-bg">
      <title-bar title="查询条件" :arrow="true"></title-bar>
      <dynamic-Form :data="schema" ref="dynamicValidateForm"></dynamic-Form>
      <btn-Group :btnArr="btnform" align="right" size="small" style="margin-right:2%"></btn-Group>
    </div>
    <div class="tab-box white-bg">
      <title-bar title="入区核注清单" @toggleTab="toggleTabDis" :arrow="true" :close="true"></title-bar>
      <!--<general-table :child-data="childData" v-if="isTabShow"></general-table>-->
      <div>
        <el-tabs key="tab" type="border-card" class="fade" ref="tabbox">
          <el-tab-pane label="预录入申报">
            <btn-Group :btnArr="btnGroup" size="small"></btn-Group>
            <el-table
              v-loading="loading"
              :data="gridData"
              height="300"
              border
              highlight-current-row
              @current-change="getCurrentRow"
              style="width: 100%">
              <el-table-column label="单选" width="55">
                <template scope="scope">
                  <el-radio
                    :label="scope.$index"
                    v-model="radio" @change="getCurrentRow(scope.$index)">&nbsp;
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column
                v-for="item in columns"
                sortable
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="50"
                layout="total, sizes, prev, pager, next"
                :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="申报(正式)数据">
            <btn-Group :btnArr="btnGroup" size="small"></btn-Group>
            <el-table
              :data="gridData"
              height="300"
              border
              style="width: 100%">
              <el-table-column
                v-for="item in columns"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审批历史记录">
            <btn-Group :btnArr="btnGroup" size="small"></btn-Group>
            <el-table
              :data="gridData"
              height="300"
              border
              style="width: 100%">
              <el-table-column
                v-for="item in columns"
                :key="item.prop"
                :prop="item.prop"
                :label="item.label"
                :width="item.width">
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="100"
                layout="total, sizes, prev, pager, next"
                :total="400">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <edit v-if="showEdit" v-on:toggleEdit="hideEdit"></edit>

  </div>
</template>

<script>
  import {getGridData} from "@/api/getGridData";
  import initData from "./initData"
  import btnGroup from "views/components/btnGroup";
  import dynamicForm from "components/dynamicForm";
  import titleBar from "views/components/titleBar";
  import edit from "views/process/manage/edit";
  // import GeneralTable from "../../components/generalTable";

  export default {
    name: "declare",
    components: {
      // GeneralTable,
      titleBar,
      btnGroup,
      dynamicForm,
      edit,
    },
    data() {
      return {
        btnGroup: [
          {
            type: "primary", //按钮颜色
            icon: "refresh", //按钮icon
            text: "刷新", //按钮文字
            show: true,
            fn: () => {
              this.gridData = [];
              this.loading = true;
              // this.getData();
            } //按钮点击事件
          },
          {
            type: "primary",
            icon: "info",
            show: true,
            text: "查阅",
            fn: () => {
              this.$router.go(-1)
            }
          },
          {
            type: "primary",
            icon: "plus",
            text: "新增",
            show: true,
            fn: () => {
            }
          },
          {
            type: "primary",
            icon: "edit",
            text: "修改",
            show: true,
            fn: () => {
              this.showEdit = true;
            }
          },
          {
            type: "danger",
            icon: "delete",
            text: "删除",
            show: true,
            fn: () => {
            }
          },
          {
            type: "primary",
            icon: "search",
            text: "查看回执",
            show: true,
            fn: () => {
            }
          }
        ],
        columns: [],
        currentPage4: 4,
        currentRow: null,
        showEdit: false,
        isTabShow: true,
        bodyHeight: 0,
        loading: true,
        schema: [],
        btnform: [
          {
            type: "primary",
            icon: "",
            text: "搜索",
            show: true,
            fn: () => {
              this.$refs.dynamicValidateForm.submit();
            }
          },
          {
            type: "primary",
            icon: "",
            text: "清除",
            show: true,
            fn: () => {
              this.$refs.dynamicValidateForm.resetForm();
            }
          }
        ],
        gridData: [],
        radio: ''
      };
    },
    created() {
      this.schema = initData.searchFormSchema;
      this.columns = initData.columns;
      this.getData();
    },
    methods: {
      getData() {
        getGridData().then(response => {
          this.gridData = response.data;
          this.loading = false;
        });
      },
      //获取选择的行
      getCurrentRow(val) {
        this.radio = this.gridData.indexOf(val);
        this.currentRow = val;
        console.log(this.currentRow);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      //搜索
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      //清除
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      toggleTabDis() {
        this.isTabShow = !this.isTabShow;
      },
      //删除
      delTableData() {

      },
      hideEdit(somedata) {
        console.log(somedata)
        this.showEdit = false
      },
      enter(el, done) {
        var self = this;

      },
      beforeLeave(el, done) {
        this.bodyHeight = el.clientHeight;
      },
      leave(el, done) {
        el.style.height = el.clientHeight + "px";
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .content-box {
    padding: 10px 0;
    max-width: 1140px;
    margin: 0 auto;
    position: relative;
    .form-box {
      padding-bottom: 20px;
    }
    .white-bg {
      background-color: #fff;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }
    .tab-box {
      margin-top: 20px;
      .btn-group {
        padding-bottom: 15px;
      }
      .el-tabs--border-card {
        border: none;
      }
      .el-popover,
      .el-tabs--border-card {
        box-shadow: none;
      }
      .el-pagination {
        padding: 15px;
        text-align: right;
      }
    }

  }

  .fade {
    transition: all 0.3s ease;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(10px);
  }
</style>
