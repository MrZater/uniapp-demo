import Mock from "mockjs";

// 字典
Mock.mock(/\/sys\/dic\/list/, "get", () => {
  return {
    code: 200,
    message: "success",
    body: [
      {
        itemValue: "0",
        itemName: "类别一"
      },
      {
        itemValue: "1",
        itemName: "类别二"
      },
      {
        itemValue: "2",
        itemName: "类别三"
      }
    ]
  };
});
