import Mock from "mockjs";

function getOnePageData() {
  let list = [];
  for (let i = 0; i < 10; i++) {
    list.push({ name: Mock.Random.cname(), area: Mock.Random.city(true), createTime: Mock.Random.datetime() })
  }
  return list;
}

// 第三方数据表格接口，需要翻译后的数据
Mock.mock(/\/dataTable\/post/, "post", (o) => {
  console.log("Mock >>", o);
  return {
    code: 200,
    message: "success",
    body: {
      total: 100,
      columns: [
        { key: "name", label: "姓名" },
        { key: "area", label: "地区" },
        { key: "createTime", label: "创建时间" }
      ],
      list: getOnePageData()
    }
  };
});
