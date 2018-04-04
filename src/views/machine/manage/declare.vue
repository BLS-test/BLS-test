<template  @gotoggle="showToggle">
    <div class="content-box">
        <div class="form-box white-bg" >
            <title-bar title="查询条件" :arrow="true"></title-bar>
            <dynamic-Form :data="schema" ref="dynamicValidateForm"></dynamic-Form>
            <btn-Group :btnArr="btnform" align="right" size="small" style="margin-right:2%"></btn-Group>
        </div>
        <div class="tab-box white-bg">
            <title-bar title="加工账册" @toggleTab="toggleTabDis" :arrow="true" :close="true"></title-bar>
            <transition-group name="slide-fade">
            <el-tabs key="tab" v-model="tabData" type="border-card" class="fade" ref="tabbox" v-if="isTabShow">
                <el-tab-pane v-if="false" v-for="item in tabData" :key="item.id" :label="item.label">
                   <btn-Group :btnArr="item.btngroup" size="small"></btn-Group>
                   <el-table
                      v-loading="loading"
                      :data="item.gridData"
                      highlight-current-row
                      height="300"
                      border
                      style="width: 100%">
                      <el-table-column
                        v-for="items in item.columns"
                        :key="items.prop"
                        :type="items.type||''"
                        :prop="items.prop"
                        :label="items.label"
                        :width="items.width">
                      </el-table-column>
                    </el-table>
                    <div class="block">
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="item.pageSizes||[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next"
                        :total="400">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="预录入申报">
                  <btn-Group :btnArr="btngroup" size="small"></btn-Group>
                    <el-table
                      v-loading="loading"
                      :data="gridData"
                      highlight-current-row
                      height="300"
                      border
                      style="width: 100%">
                      <el-table-column
                        v-for="item in ediSendQueue"
                        :key="item.field"
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
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next"
                        :total="400">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="申报(正式)数据">
                  <btn-Group :btnArr="btngroup" size="small"></btn-Group>
                    <el-table
                      :data="gridData"
                      height="300"
                      highlight-current-row
                      border
                      style="width: 100%">
                      <el-table-column
                        v-for="item in ediSendQueue"
                        :key="item.field"
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
                        :page-sizes="[100, 200, 300, 400]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next"
                        :total="400">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="审批历史记录">
                  <btn-Group :btnArr="btngroup" size="small"></btn-Group>
                    <el-table
                      :data="gridData"
                      height="300"
                      highlight-current-row
                      border
                      style="width: 100%">
                      <el-table-column
                        v-for="item in ediSendQueue"
                        :key="item.field"
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
                        :page-size="100"
                        layout="total, sizes, prev, pager, next"
                        :total="400">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
            </transition-group>
        </div>
        <el-dialog title="查看回执" :visible.sync="dialogTableVisible" :before-close="handleClose">
          <el-table :data="gridData" height="300" border>
            <el-table-column property="date" label="日期" width="150"></el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column>
          </el-table>
      </el-dialog>
        
      <edit v-if="showEdit" v-on:toggleEdit="hideEdit"></edit>
    </div>
</template>

<script>
import { getGridData } from "@/api/getGridData";
import { getediSendLog } from "@/api/ediSendLog";
import initData from "./initData";
import btnGroup from "views/components/btnGroup";
import dynamicForm from "components/dynamicForm";
import titleBar from "views/components/titleBar";
import edit from "views/machine/manage/edit";
export default {
  name: "declare",
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
      bodyHeight: 0,
      loading: true,
      dialogTableVisible: false,
      query: "",
      ediSendQueue: [
        {
          title: "",
          field: "select",
          radio: true,
          width: 20,
          align: "center",
          valign: "middle"
        },
        {
          title: "监管场所",
          field: "areaCode",
          align: "center",
          sortable: true,
          order: "desc"
        },
        {
          title: "单据类型",
          field: "docType",
          align: "center",
          sortable: true
        },
        {
          title: "业务类型",
          field: "bizType",
          align: "center",
          sortable: true
        },
        { title: "单据编号", field: "seqNo", align: "center", sortable: true },
        {
          title: "处理标识",
          field: "status",
          align: "center",
          sortable: true
        },
        {
          title: "创建时间",
          field: "createTime",
          align: "center",
          sortable: true
        },
        {
          title: "修改时间",
          field: "updateTime",
          align: "center",
          sortable: true
        },
        { title: "备注", field: "remarks", align: "center", sortable: true }
      ],
      ediSendLog: [
        {
          title: "",
          field: "select",
          radio: true,
          width: 20,
          align: "center",
          valign: "middle"
        },
        {
          title: "监管场所",
          field: "areaCode",
          align: "center",
          sortable: true,
          order: "desc"
        },
        {
          title: "单据类型",
          field: "docType",
          align: "center",
          sortable: true
        },
        {
          title: "业务类型",
          field: "bizType",
          align: "center",
          sortable: true
        },
        { title: "单据编号", field: "seqNo", align: "center", sortable: true },
        {
          title: "处理标识",
          field: "status",
          align: "center",
          sortable: true
        },
        {
          title: "创建时间",
          field: "createTime",
          align: "center",
          sortable: true
        },
        {
          title: "修改时间",
          field: "updateTime",
          align: "center",
          sortable: true
        },
        { title: "备注", field: "remarks", align: "center", sortable: true }
      ],
      columns: [
        {
          type: "index",
          width: "30"
        },
        {
          prop: "date",
          label: "创建时间",
          width: "160"
        },
        {
          prop: "name",
          label: "姓名",
          width: "120"
        },
        {
          prop: "psn",
          label: "接管人",
          width: "120"
        },
        {
          prop: "type",
          label: "审核状态",
          width: "120"
        },
        {
          prop: "cnum",
          label: "编号",
          width: "120"
        },
        {
          prop: "address",
          label: "地址",
          width: "300"
        },
        {
          prop: "remark",
          label: "备注",
          width: "300"
        },
        {
          prop: "zip",
          label: "邮编",
          width: "300"
        }
      ],
      schema: [],
      //form 提交、重置按钮
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
            this.dialogTableVisible = true;
          }
        },
        {
          type: "primary",
          icon: "plus",
          text: "新增",
          show: true,
          fn: () => {}
        },
        {
          type: "danger",
          icon: "edit",
          text: "修改",
          show: true,
          fn: () => {
            this.showEdit = true;
          }
        },
        {
          type: "primary",
          icon: "close",
          text: "删除",
          show: false,
          fn: () => {}
        }
      ],
      currentPage4: 4,
      gridData: []
    };
  },
  created() {
    this.schema = initData.searchFormSchema;
    this.getData();
  },
  methods: {
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
    handleSizeChange(val) {},
    //页目数量切换
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //获取表格数据
    getData() {
      this.query = {
        areaCode: "",
        docType: "",
        bizType: "",
        seqNo: "",
        appId: 1,
        pageSize: 10,
        pageNumber: 0,
        sort: "",
        sortOrder: "asc"
      };
      getediSendLog(this.query).then(response => {
        console.log(response.data);
        this.gridData = response.data.data;
        this.loading = false;
      });
    },
    toggleTabDis() {
      this.isTabShow = !this.isTabShow;
    },
    //删除
    delTableData() {},
    hideEdit(somedata) {
      console.log(somedata);
      this.showEdit = false;
    },
    //关闭弹窗
    handleClose() {
      this.dialogTableVisible = false;
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