import Mock from "mockjs";

// 预警企业-列表
Mock.mock(/\/approve\/warnEnterprise\/list/, "post", () => {
  return {
    code: "00000",
    data: {
      total: 2,
      list: [
        {
          id: "1",
          code1: "厦门海峡投资有限公司",
          code2: "海峡供应链有限公司",
          code22: "12345678",
          code3: "财务部",
          code33: "987654321",
          code4: "0",
          createUser: "朱明亮",
          createTime: 1645694842000,
          modifyUser: "朱明亮",
          modifyTime: 1645694842000,
        },
        {
          id: "2",
          code1: "厦门海峡投资有限公司",
          code2: "海峡供应链有限公司",
          code22: "12345678",
          code3: "财务部",
          code33: "987654321",
          code4: "1",
          createUser: "朱明亮",
          createTime: 1645694842000,
          modifyUser: "朱明亮",
          modifyTime: 1645694842000,
        },
      ],
      pageNum: 1,
      pageSize: 10,
    },
    msg: "操作成功!",
  };
});

// 预警企业-删除
Mock.mock(/\/approve\/warnEnterprise\/delete/, "post", () => {
  return {
    code: "00000",
    data: null,
    msg: "删除成功!",
  };
});

// 预警企业-新增、编辑
Mock.mock(/\/approve\/warnEnterprise\/addOrUpdate/, "post", () => {
  return {
    code: "00000",
    data: null,
    msg: "操作成功1!",
  };
});

// 预警企业-启用、停用
Mock.mock(/\/approve\/warnEnterprise\/startOrStop/, "post", () => {
  return {
    code: "00000",
    data: null,
    msg: "操作成功1222!",
  };
});