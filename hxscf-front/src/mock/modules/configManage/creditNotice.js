import Mock from "mockjs";
// 授信通知管理
// Mock.mock(/\/approve\/creditNotice\/list/, "post", () => {
//   return {
//     code: "00000",
//     data: {
//       total: 6,
//       list: [
//         {
//           modifyUser: "前端-测试-朱明亮",
//           keyNo: "b33c0a0d6bde41d9a79291ede2498217",
//           modifyTime: 1614333242000,
//           messageType: ["03"],
//           createTime: 1614325582000,
//           messageTitle: "复工了",
//           createUser: "前端-测试-朱明亮",
//           isDel: "1",
//           rowId: 1,
//         },
//         {
//           modifyUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           keyNo: "e30bd4c8d3194b33b84758470f4d7cc3",
//           modifyTime: 1614324644000,
//           messageType: ["01", "02"],
//           createTime: 1614324644000,
//           messageTitle: "主题~~~",
//           createUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           isDel: "0",
//           rowId: 2,
//         },
//         {
//           modifyUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           keyNo: "6f98c0c130934dbd93842e628e0853ee",
//           modifyTime: 1614324528000,
//           messageType: ["01", "02"],
//           createTime: 1614324528000,
//           messageTitle: "主题~~~",
//           createUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           isDel: "0",
//           rowId: 3,
//         },
//         {
//           modifyUser: "前端-测试-朱明亮",
//           keyNo: "8a41bdde82a54e42a156f26b4eb77396",
//           modifyTime: 1614324497000,
//           messageType: ["01", "02", "03"],
//           createTime: 1614324497000,
//           messageTitle: "放假了3333",
//           createUser: "前端-测试-朱明亮",
//           isDel: "0",
//           rowId: 4,
//         },
//         {
//           modifyUser: "前端-测试-朱明亮",
//           keyNo: "eb95cc8b16ec4041846f4b7b0b8db8e4",
//           modifyTime: 1614324124000,
//           messageType: ["01", "02", "03"],
//           createTime: 1614324124000,
//           messageTitle: "放假了12",
//           createUser: "前端-测试-朱明亮",
//           isDel: "0",
//           rowId: 5,
//         },
//         {
//           modifyUser: "前端-测试-朱明亮",
//           keyNo: "03de3765f54a4e8d9bda2b685d650e76",
//           modifyTime: 1614322801000,
//           messageType: ["01", "02", "03"],
//           createTime: 1614322801000,
//           messageTitle: "放假了",
//           createUser: "前端-测试-朱明亮",
//           isDel: "0",
//           rowId: 6,
//         },
//       ],
//       pageNum: 1,
//       pageSize: 10,
//       size: 6,
//       startRow: 1,
//       endRow: 6,
//       pages: 1,
//       prePage: 0,
//       nextPage: 0,
//       isFirstPage: true,
//       isLastPage: true,
//       hasPreviousPage: false,
//       hasNextPage: false,
//       navigatePages: 8,
//       navigatepageNums: [1],
//       navigateFirstPage: 1,
//       navigateLastPage: 1,
//     },
//     msg: "操作成功!",
//   };
// });
// 启用
// Mock.mock(/\/approve\/riskNotice\/start/, "post", () => {
//   return {
//     code: "00000",
//     data: null,
//     msg: "启用成功!",
//   };
// });

// // 停用
// Mock.mock(/\/approve\/riskNotice\/stop/, "post", () => {
//   return {
//     code: "00000",
//     data: null,
//     msg: "停用成功!",
//   };
// });

// 详情
// Mock.mock(/\/approve\/creditNotice\/detail/, "post", () => {
//   return {
//     code: "00000",
//     data: {
//       noticeUsers: [
//         {
//           orgPname: "海峡供应链有限公司",
//           realName: "吴恒",
//           orgName: "财务部",
//           orgCode: "d59700e159504e46b1d366c119e426aa",
//           postName: "后端-测试",
//           postCode: "f1dd7f7c95c94cdc82392522037eb7be",
//           orgPcode: "6728bcfcdccb4fa381149f5ee8ce0022",
//           userCode: "60a3d69d23244cf2b162892728aeb171",
//         },
//       ],
//       keyNo: "a346b4ab913f4fcaac0323b52010e622",
//       messageType: ["01", "02"],
//       messageTitle: "下班了",
//       orgCodeList: ["systemmanageorg", "systemmanageorg"],
//     },
//     msg: "操作成功!",
//   };
// });
