const initData = {
  "name": "加贸账册",
  "isSearchShow": true,
  "isTabShow" : true,
  "searchFormSchema": [{
      "id": "esNO",
      "definedName": "账册编号",
      "definedValue": "",
      "definedType": "text",
      "definedDescribe": "账册编号",
      "disabled": false,
      "rules": [{
        "required": true,
        "message": "请输入账册编号",
        "trigger": "blur"
      }]
    },
    {
      "id": "inNO",
      "definedName": "企业内部编号",
      "definedValue": "2220111",
      "definedType": "text",
      "definedDescribe": "企业内部编号",
      "disabled": true,
      "rules": [{
        "required": true,
        "message": "请输入企业内部编号",
        "trigger": "blur"
      }]
    },
    {
      "id": "endDateRange",
      "definedName": "结束有效日期",
      "definedValue": true,
      "disabled": true,
      "definedKey": "endDateRange",
      "definedType": "daterange",
      "definedDescribe": "",
    },
    {
      "id": "applyType",
      "definedName": "申报类型",
      "definedValue": "",
      "definedType": "select",
      "definedDescribe": "申报类型",
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
    {
      "id": "billStatus",
      "definedName": "单据状态",
      "definedValue": "",
      "definedType": "select",
      "definedDescribe": "单据状态",
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
    }
  ],
  "tabeDataUrl": ""
}
export default initData
