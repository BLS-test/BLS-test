<template  @gotoggle="showToggle">
    <div class="content-box">
        <div class="form-box white-bg" >
            <title-bar title="查询条件" :arrow="true"></title-bar>
            <dynamic-Form :data="schema" ref="dynamicValidateForm"></dynamic-Form>
            <btn-Group :btnArr="btnform" align="right" size="small" style="margin-right:2%"></btn-Group>
        </div>
        <div class="tab-box white-bg">
            <title-bar title="列表数据" @toggleTab="toggleTabDis" :arrow="true" :close="true"></title-bar>
            <transition-group name="slide-fade">
            <el-tabs key="tab" @tab-click="tabSwitch" type="border-card" class="fade" ref="tabbox" v-if="isTabShow">
                <el-tab-pane  label="申报报文队列">
                  <btn-Group :btnArr="btngroup" size="small"></btn-Group>
                    <el-table
                      v-loading="loading"
                      :data="gridData1.data"
                      highlight-current-row
                       @current-change="trCheacked"
                      height="300"
                      border
                      style="width: 100%">
                      <el-table-column
                        v-for="item in ediSendQueue"
                        :key="item.field"
                        :formatter="item.formatter"
                        :type="item.type||''"
                        :prop="item.field"
                        :label="item.title"
                        :width="item.width">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next"
                        :total="gridData1.total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="申报报文日志">
                  <btn-Group :btnArr="btngroup" size="small"></btn-Group>
                    <el-table
                      :data="gridData2.data"
                      height="300"
                      highlight-current-row
                      @current-change="trCheacked"
                      border
                      style="width: 100%">
                      <el-table-column
                        v-for="item in ediSendLog"
                        :key="item.field"
                        :formatter="item.formatter"
                        :type="item.type||''"
                        :prop="item.field"
                        :label="item.title"
                        :width="item.width">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next"
                        :total="gridData2.total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
            </transition-group>
        </div>
        <edit v-if="showEdit" :infoData="infoData" :editFormData="editSchema"  v-on:toggleEdit="toggleEdit"></edit>
    </div>
</template>

<script>
import {
  getediSendQueue,
  getediSendLog,
  getediSendView,
  getediSendLogView,
  ediSendReset
} from "@/api/ediSendLog";
import btnGroup from "views/components/btnGroup";
import dynamicForm from "components/dynamicForm";
import formData from "./formData";
import tableData from "./tableData"
import titleBar from "views/components/titleBar";
import edit from "./edit";
export default {
  name: "ediSendLog",
  components: {
    titleBar,
    btnGroup,
    dynamicForm,
    edit
  },
  data() {
    return {
      showEdit: false,
      isTabShow: true,
      loading: true,
      oid: "",
      status: "",
      dialogTableVisible: false,
      tabIndex: 0,
      subData: {},
      infoData: {},
      editSchema: [],
      query: {
        appId: 1,
        pageSize: 10,
        pageNumber: 0,
        sort: "",
        sortOrder: "asc"
      },
      ediSendQueue: [],
      ediSendLog: [],
      schema: [],
      //form 提交、重置按钮
      btnform: [
        {
          type: "primary",
          icon: "",
          text: "搜索",
          show: true,
          fn: () => {
            this.submitForm();
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
      //tab中按钮配置
      btngroup: [
        {
          type: "primary", //按钮颜色
          icon: "refresh", //按钮icon
          text: "刷新", //按钮文字
          show: true,
          fn: () => {
            this.loading = true;
            this.getData();
          } //按钮点击事件
        },
        {
          type: "primary",
          icon: "warning",
          show: true,
          text: "查阅",
          fn: () => {
            this.view();
          }
        },
        {
          type: "danger",
          icon: "edit",
          text: "重置",
          show: true,
          fn: () => {
            this.reset();
          }
        }
      ],
      currentPage4: 1,
      gridData1: [],
      gridData2: []
    };
  },
  created() {
    this.schema = formData.searchFormSchema;
    this.ediSendQueue = tableData.ediSendQueue;
    this.ediSendLog = tableData.ediSendLog;
    this.editSchema = this.schema.concat(formData.editFormSchema); //查看编辑页合并表单配置数组
    this.getData();
  },
  methods: {
    //表格行单选
    trCheacked(row) {
      if (row != null) {
        this.oid = row.oid;
        this.status = row.status;
      }
    },
    //查看页控制
    toggleEdit(someData) {
      if (someData == "back") {
        this.showEdit = false;
      }
    },
    //查阅
    view() {
      if (this.oid != "" && this.oid != null) {
        if (this.tabIndex == 0) {
          getediSendView(this.oid).then(response => {
            if (response.data.code == 1) {
              this.infoData = response.data.data;
              console.log(this.infoData);
              this.showEdit = true;
            } else {
              this.$message({
                message: "数据错误",
                type: "error"
              });
            }
          });
        } else if (this.tabIndex == 1) {
          getediSendLogView(this.oid).then(response => {
            if (response.data.code == 1) {
              this.infoData = response.data.data;
              console.log(this.infoData);
              this.showEdit = true;
            } else {
              this.$message({
                message: "数据错误",
                type: "error"
              });
            }
          });
        }
      } else {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
      }
    },
    //重置
    reset() {
      if (this.oid != "" && this.oid != null) {
        if (this.status == 1) {
          this.$confirm("请确认重置", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              ediSendReset(this.oid).then( response => {
                if(response.data.code == 1){
                  this.$message({
                    message: "重置成功",
                    type: "success"
                  });
                  this.getData()
                }else {
                  this.$message({
                    message: "重置失败",
                    type: "error"
                  });
                } 
              })
            })
            .catch(() => {
              
            });
        } else {
          this.$message({
            message: "重置失败",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "请先选择一条数据",
          type: "warning"
        });
      }
    },
    //tab切换
    tabSwitch(e) {
      this.oid = "";
      this.status = "";
      this.tabIndex = e.paneName;
      if (this.tabIndex == 1) {
        this.btngroup[2].show = false;
      } else {
        this.btngroup[2].show = true;
      }
      this.getData();
    },
    //搜索
    submitForm(formName) {
      const self = this;
      this.$refs.dynamicValidateForm.submit().then(function(result) {
        self.query = {
          ...result,
          appId: 1,
          pageSize: 10,
          pageNumber: 0,
          sort: "",
          sortOrder: "asc"
        };
        self.getData();
      });
    },
    //清除
    resetForm(formName) {
      this.$refs[formName].resetFields();
      const self = this;
      this.$refs.dynamicValidateForm.submit().then(function(result) {
        self.query = {
          ...result,
          appId: 1,
          pageSize: 10,
          pageNumber: 0,
          sort: "",
          sortOrder: "asc"
        };
      });
    },
    
    //跳页
    handleSizeChange(val) {
      this.query.pageSize = val;
      this.getData();
    },
    //页目数量切换
    handleCurrentChange(val) {
      this.query.pageNumber = (val - 1) * 10;
      this.getData();
    },
    //获取表格数据
    getData() {
      const self = this;
      if (this.tabIndex == 0) {
        getediSendQueue(this.query).then(response => {
          console.log("queue", response.data);
          if (response.data.code == 1) {
            self.gridData1 = response.data;
            this.loading = false;
          }
        });
      } else if (this.tabIndex == 1) {
        getediSendLog(this.query).then(response => {
          console.log("log", response.data);
          this.gridData2 = response.data;
        });
      }
    },
    toggleTabDis() {
      this.isTabShow = !this.isTabShow;
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
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>