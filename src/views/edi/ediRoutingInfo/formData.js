const formData = {
    "name": "加贸账册",
    "isSearchShow": true,
    "isTabShow" : true,
    "searchFormSchema": [{
        "id": "docType",
        "definedName": "单据类型",
        "definedValue": "",
        "definedType": "text",
        "disabled": false
      },
      {
        "id": "bizType",
        "definedName": "业务类型",
        "definedValue": "",
        "definedType": "text",
        "disabled": false
      },
      {
        "id": "codStdAreaCode",
        "definedName": "监管场所",
        "definedValue": "",
        "definedType": "select",
        "disabled": false,
        "valueListUrl": "redis/getDataSource?tableNames=codStdAreaCode",
      },
      {
        "id": "proname",
        "definedName": "报文头",
        "definedValue": "",
        "definedType": "text",
        "disabled": false
      },
      {
        "id": "status",
        "definedName": "启用标识",
        "definedValue": "",
        "definedType": "select",
        "readonly": false,
        "disabled": false,
        "valueList": [
            {
                "text": "有效",
                "id": "Y"
            },
            {
                "text": "无效",
                "id": "N"
            }
        ]
      },
      {
        "id": "passageway",
        "definedName": "传输类型",
        "definedValue": "",
        "definedType": "select",
        "readonly": false,
        "disabled": false,
        "valueList": [
            {
                "text": "内网",
                "id": "1"
            },
            {
                "text": "外网",
                "id": "2"
            }
        ]
      }
    ],
    "editFormSchema": [
      {
        "id": "docName",
        "definedName": "单据名称",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "bizName",
        "definedName": "业务名称",
        "definedValue": "", 
        "definedType": "text",
      },
      {
        "id": "token",
        "definedName": "认证码",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "routeType",
        "definedName": "路由标识",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "transMode",
        "definedName": "传输方式",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "senderId",
        "definedName": "发送方编号",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "receiverId",
        "definedName": "接收方编号",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "sendUrl",
        "definedName": "发送url",
        "definedValue": "", 
        "definedType": "text",
      },
      {
        "id": "reclUrl",
        "definedName": "接收url",
        "definedValue": "",
        "definedType": "text",
      },
      {
        "id": "remark",
        "definedName": "备注",
        "definedValue": "",
        "definedType": "text",
      }
    ]
  }
  
  
  export default formData
  