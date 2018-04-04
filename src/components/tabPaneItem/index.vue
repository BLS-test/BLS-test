<template>
    <div>
    <el-tab-pane :label="label" :name="tabPaneData.id">
        <!-- 按钮组插槽 -->
        <slot name="tabBtnGroup"></slot>
        <el-table
            v-loading="loading"
            :data="gridData"
            highlight-current-row
            :height="height"
            border
            style="width: 100%">
            <el-table-column
            v-for="item in columns"
            :key="item.prop"
            :type="item.type||''"
            :prop="item.prop"
            :label="item.label"
            :width="item.width">
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizeArr"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="total">
            </el-pagination>
        </div>
    </el-tab-pane>
    </div>
</template>
<script>
import { getGridData } from "@/api/getGridData";
export default {
  data() {
    return {
        loading: true,
        gridData: [],
        total: 0,
    };
  },
  props: {
    tabPaneData: {
      type: Object,
      default: function() {
        return {
            id:"",
            query: "", //表格切换参数
            dataUrl: "", //请求地址
        };
      }
    },
    label: {
        type: String,
        default () {
            return " "
        }
    },
    columns: {
        type: Array,
        default () {
            return []
        }
    },
    disabled: {
        type: Boolean,
        default () {
            return false
        }
    },
    value: {
        type: String,
        default () {
            return ''
        }
    },
    pageSizeArr: {
        type: Array,
        default () {
            return [10,20,50,100]
        }
    },
    pageSize: {
        type: Number,
        default () {
            return 10
        }
    },
    currentPage: {
        type: Number,
        default () {
            return 4
        }
    },
    height: {
        type: Number,
        default () {
            return 300
        }
    }
  },
  created() {
      getGridData().then(response => {
          console.log(response.data)
        this.gridData = response.data;
        this.loading = false;
      });
  },
  methods: {
      handleSizeChange(val) {
      
    },
    //页目数量切换
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  }  
};
</script>
<style lang="sass" scoped>

</style>


