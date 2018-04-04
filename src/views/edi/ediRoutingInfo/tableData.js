const tableData = {
  columns: [{
      title: "",
      field: "select",
      radio: true,
      width: 20,
      align: "left",
      valign: "middle"
    },
    {
      title: "单据类型",
      field: "docType",
      align: "left",
      halign: "center",
      sortable: true
    },
    {
      title: "单据名称",
      field: "docName",
      align: "left",
      halign: "center",
      sortable: true
    },
    {
      title: "业务类型",
      field: "bizType",
      align: "center",
      halign: "center",
      sortable: true
    },
    {
      title: "监管场所",
      field: "areaCode",
      align: "center",
      halign: "center",
      sortable: true
    },
    {
      title: "报文头",
      field: "proname",
      align: "left",
      halign: "center",
      sortable: true
    },
    {
      title: "启用标识",
      field: "status",
      align: "center",
      halign: "center",
      sortable: true
    },
    {
      title: "传输类型",
      field: "passageway",
      align: "center",
      sortable: true
    },
    {
      title: "路由标识",
      field: "routeType",
      align: "left",
      halign: "center",
      sortable: true
    },
    {
      title: "发送方编号",
      field: "senderId",
      align: "center",
      sortable: true
    },
    {
      title: "接收方编号",
      field: "receiverId",
      align: "center",
      sortable: true
    }
  ]
}

export default tableData
