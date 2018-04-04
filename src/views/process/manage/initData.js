const initData = {
    "name": "入区核注",
    "isTabShow": true,
    "searchFormSchema": [
      {
        "id": "esNO",
        "definedName": "保税清单编号",
        "definedValue": "11223555231",
        "definedType": "text",
        "definedDescribe": "保税清单编号",
        "remark": "保税清单编号",
        "disabled":true,
        "rules": [{
          "required": false,
          "message": "",
          "trigger": ""
        }]
      },
      {
        "id": "inNO",
        "definedName": "备案编号",
        "definedValue": "",
        "definedType": "text",
        "definedDescribe": "备案编号",
        "remark": "备案编号",
        "rules": [{
          "required": true,
          "message": "请输入备案编号",
          "trigger": "blur"
        }]
      },
      {
        "id": "billStatus",
        "definedName": "单据状态",
        "definedValue": "",
        "definedType": "select",
        "definedDescribe": "-请选择-",
        "remark": "单据状态",
        "valueListUrl": "/form/select/billStatus",//获取下拉选项数据的url
        "valueList": [{
          "label": "暂存",
          "value": "1"
        },
          {
            "label": "申报",
            "value": "2"
          },
          {
            "label": "审批通过",
            "value": "3"
          },
          {
            "label": "审批不通过",
            "value": "4"
          }
        ]
      },
      {
        "id": "inNO",
        "definedName": "企业内部清单编号",
        "definedValue": "",
        "definedType": "text",
        "definedDescribe": "企业内部清单编号",
        "remark": "企业内部清单编号",
        "rules": [{
          "required": true,
          "message": "请输入企业内部清单编号",
          "trigger": "blur"
        }]
      },
      {
        "id": "endDateRange",
        "definedName": "操作时间",
        "definedValue": true,
        "definedKey": "endDateRange",
        "definedType": "daterange",
        "definedDescribe": "",
      },
      {
        "id": "applyType",
        "definedName": "清单类型",
        "definedValue": "",
        "definedType": "select",
        "definedDescribe": "-请选择-",
        "remark": "清单类型",
        "valueListUrl": "/form/select/applyType", //下拉项数据地址
        "valueList": [{
          "label": "备案",
          "value": "1"
        },
          {
            "label": "变更",
            "value": "2"
          },
          {
            "label": "注销/作废",
            "value": "3"
          }
        ]
      },
    ],
    "columns": [
      {
        prop: "taxNo",
        label: "保税清单编号",
        width: "130"
      },
      {
        prop: "enterpriseNo",
        label: "企业内部编号",
        width: "130"
      },
      {
        prop: "date",
        label: "清单申报日期",
        width: "160"
      },
      {
        prop: "recordNo",
        label: "备案编号",
        width: "120"
      },
      {
        prop: "type",
        label: "清单类型",
        width: "120"
      },
      {
        prop: "supervise",
        label: "监管方式",
        width: "120"
      },
      {
        prop: "status",
        label: "单据状态",
        width: "110"
      },
      {
        prop: "reply",
        label: "回执状态",
        width: "110"
      },
      {
        prop: "time",
        label: "操作时间",
        width: "110"
      },
      {
        prop: "code",
        label: "申报单位代码",
        width: "140"
      },
      {
        prop: "name",
        label: "申报单位名称",
        width: "140"
      },
      {
        prop: "custom",
        label: "申报地海关",
        width: "100"
      }
    ],
    "dataCrud": [
      {
        "id": "125312",
        "definedName": "预录入统一编号",
        "definedValue": "1213531212123",
        "definedType": "text",
        "definedDescribe": "",
        "remark": "",
        "disabled": false,
        "readonly":true,
        "rules": [{
          "required": false,
          "message": "",
          "trigger": ""
        }]
      },
      {
        "id": "151531",
        "definedName": "清单编号",
        "definedValue": "",
        "definedType": "text",
        "definedDescribe": "",
        "remark": "",
        "disabled": true,
        "rules": [{
          "required": false,
          "message": "",
          "trigger": "blur"
        }]
      },
      {
        "id": "1231543",
        "definedName": "手(账)册编号",
        "definedValue": "",
        "definedType": "select",
        "definedDescribe": "-请选择-",
        "remark": "单据状态",
        "rules": [{
          "required": true,
          "message": "",
          "trigger": "blur"
        }],
        "valueListUrl": "/form/select/billStatus",//获取下拉选项数据的url
        "valueList": [
          {
          "label": "暂存",
          "value": "1"
        },
          {
            "label": "申报",
            "value": "2"
          },
          {
            "label": "审批通过",
            "value": "3"
          },
          {
            "label": "审批不通过",
            "value": "4"
          }
        ]
      },
      {
        "id": "esNO",
        "definedName": "经营单位代码",
        "definedValue": "",
        "definedType": "text",
        "definedDescribe": "",
        "remark": "",
        "disabled": true,
        "rules": [{
          "required": true,
          "message": "",
          "trigger": "blur"
        }]
      },


    ]




}
export default initData
