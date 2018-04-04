
const tableData = {
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
          sortable: true,
          formatter: function(row, column) {
            if (row.status == "N") {
              status = "待处理";
            } else if (row.status == "1") {
              status = "生成报文异常";
            }
            return status;
          }
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
          sortable: true,
          formatter: function(row, column) {
            if (row.status == "Y") {
              status = "生成报文成功";
            } else if (row.status == "N") {
              status = "生成报文异常";
            }
            return status;
          }
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
}


export default tableData