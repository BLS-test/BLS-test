const formData = {
    "name": "加贸账册",
    "isSearchShow": true,
    "isTabShow" : true,
    "searchFormSchema": [{
        "id": "areaCode",
        "definedName": "监管场所",
        "definedValue": "",
        "definedType": "text",
        "disabled": false,
      },
      {
        "id": "docType",
        "definedName": "单据类型",
        "definedValue": "",
        "definedType": "text",
        "disabled": false,
      },
      {
        "id": "bizType",
        "definedName": "业务类型",
        "definedValue": "",
        "definedType": "text",
        "disabled": false,
      },
      {
        "id": "seqNo",
        "definedName": "单据编号",
        "definedValue": "",
        "definedType": "text",
        "disabled": false,
      },
    ],
    "editFormSchema": [
      {
        "id": "chgTmsCnt",
        "definedName": "变更次数",
        "definedValue": "",
        "definedType": "text",
        "readonly": false,
        "disabled": false
      },
      {
        "id": "createTime",
        "definedName": "创建时间",
        "definedValue": "",
        "definedType": "text",
        "readonly": false,
        "disabled": false
      },
      {
        "id": "remarks",
        "definedName": "备注",
        "definedValue": "",
        "definedType": "text",
        "readonly": false,
        "disabled": false
      },
      {
        "id": "updateTime",
        "definedName": "修改时间",
        "definedValue": "",
        "definedType": "text",
        "definedDescribe": "修改时间",
        "readonly": false,
        "disabled": false,
      },
      {
        "id": "status",
        "definedName": "处理标识",
        "definedValue": "",
        "definedType": "text",
        "readonly": false,
        "disabled": false
      }
    ]
  }

  
  export default formData
  