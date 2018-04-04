<template>
  <el-form :model="formData" :rules="formRules" ref="form"  :size="size" :label-width="labelWidth" :status-icon="true">
    <template v-for="item in formSet">
      <el-form-item :label="item[fieldAttr.label]" :key="item.id" :prop="item[fieldAttr.name]+''">
        <template v-if="item[fieldAttr.type] === 'text'">
          <el-input :disabled="item[fieldAttr.disabled]" :readonly="item[fieldAttr.readonly]" v-model="formData[item[fieldAttr.name]]" :placeholder="item[fieldAttr.placeholder]||''"></el-input>
        </template>
        <template v-if="item[fieldAttr.type] === 'radio'">
          <el-switch v-model="formData[item[fieldAttr.name]]"
                     :disabled="item[fieldAttr.disabled]"
                     :active-text="item[fieldAttr.placeholder]||'开关'"
                     :active-value="'true'"
                     :inactive-value="'false'">
          </el-switch>
        </template>
        <template v-if="item[fieldAttr.type] === 'select'">
          <el-select :disabled="item[fieldAttr.disabled]" v-model="formData[item[fieldAttr.name]]" :placeholder="item[fieldAttr.placeholder]||'请选择'">
            <el-option
              v-for="(opt, optIndex) in item.valueList" :key="optIndex"
              :label="opt.text"
              :value="opt.id"></el-option>
          </el-select>
        </template>
        <template v-if="item[fieldAttr.type] === 'daterange'">
          <el-date-picker v-model="formData[item[fieldAttr.name]]"
          :disabled="item[fieldAttr.disabled]" 
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          >
          </el-date-picker>
        </template>
        <template v-if="item[fieldAttr.type] === 'date'">
          <el-date-picker v-model="formData[item[fieldAttr.name]]" 
          :disabled="item[fieldAttr.disabled]"
          type="date"
          :placeholder="item[fieldAttr.placeholder]||''"
          >
          </el-date-picker>
        </template>
      </el-form-item>
    </template>
    <slot></slot>
  </el-form>
</template>

<script>
import { getSelectOptions } from "@/api/getSelectOptions";
export default {
  components: {},
  props: {
    labelWidth: {
      type: String,
      default: "106px"
    },
    modelData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    size: {
      type: String,
      default: "small"
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    fieldAttr: {
      type: Object,
      default: function() {
        return {
          name: "id",
          label: "definedName",
          type: "definedType",
          value: "definedValue",
          disabled: "disabled",
          readonly: "readonly",
          rules: "rules",
          valueList: {
            name: "text",
            value: "id"
          },
          placeholder: "definedDescribe"
        };
      }
    }
  },

  data() {
    return {
      formSet: this.data,
      formRules: {},
      formData: {}
    };
  },
  created() {
    this.formData = this.modelData;
  },
  watch: {
    data: function(newVal) {
      this.formSet = newVal;
      this.initForm();
    },
    // infoData: function(newData) {
    //   this.formData = newData;
    //   this.initForm();
    // }
  },
  computed: {},
  methods: {
    //获取下拉数据，整合到源数据中
    getOptions() {
      this.formSet.forEach(v => {
        if (v[this.fieldAttr.type] === "select" && v.valueListUrl) {
          getSelectOptions(v.valueListUrl).then(response => {
            this.$set(v, 'valueList',  response.data.data[v.id] || []) //确保添加的属性也是响应式的
            // v.valueList = response.data.data[v.id] || [];
          });
        }
      });
    },
    //初始化
    initForm() {
      const fd = {};
      const fr = {};
      this.data.forEach((el, index) => {
        const name = el[this.fieldAttr.name];
        const rules = el[this.fieldAttr.rules];
        fd[name] = el[this.fieldAttr.value]; // 动态生成表单数据
        rules && (fr[name] = rules); // 动态生成表单验证
      });
      this.formData = fd;
      this.formRules = fr;
      this.getOptions();
    },
    //表单重置
    resetForm() {
      this.$refs["form"].resetFields();
    },
    //表单提交
    submit() {
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            console.log("Promise返回值：", this.formData);
            this.$refs.form.clearValidate();
            resolve(this.formData);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      });
    }
  },
  created() {
    this.initForm();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-form {
  transition: height 0.28s ease-out;
  padding-top: 22px;
  &.hideSlideForm {
    height: 0;
  }
  .el-form-item {
    width: 33.333%;
    padding: 0 2%;
    display: inline-block;
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 100%;
      .el-range-input {
        width: 37% !important;
        display: inline !important;
      }
      .el-range-separator {
        width: 9% !important;
      }
    }
  }
}
</style>
