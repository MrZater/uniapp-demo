import Mock from "mockjs";
// 风险通知配置

// Mock.mock(/\/approve\/riskNotice\/list/, "post", () => {
//   return {
//     code: "00000",
//     data: {
//       total: 2,
//       list: [
//         {
//           modifyUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           keyNo: "150da60eacf9405c83c425c3157fef9b",
//           modifyTime: 1614253321000,
//           messageType: ["01", "02"],
//           createTime: 1614253321000,
//           messageTitle: "主题~~~",
//           createUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           isDel: "0",
//           rowId: 1,
//         },
//         {
//           modifyUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           keyNo: "ed019d6faa7c44a196163bebd549e6d1",
//           modifyTime: 1614248775000,
//           messageType: ["01", "02"],
//           createTime: 1614248775000,
//           messageTitle: "主题~~~",
//           createUser: "厦门港务角色,前端-测试,供应链-角色-王一赛",
//           isDel: "0",
//           rowId: 2,
//         },
//       ],
//       pageNum: 1,
//       pageSize: 10,
//       size: 2,
//       startRow: 1,
//       endRow: 2,
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
// }
// );
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
// Mock.mock(/\/approve\/riskNotice\/detail/, "post", () => {
//   return {
//     code: "00000",
//     data: {
//       riskSubjtype: "[01]-[02]",
//       noticeUsers: [
//         {
//           orgPname: "厦门港务有限公司",
//           realName: "杜泳锡-港务",
//           orgName: "业务部",
//           orgCode: "44caf2ece1754d179604987e8f2d9658",
//           postName: "后端-测试",
//           postCode: "f1dd7f7c95c94cdc82392522037eb7be",
//           orgPcode: "6c4f796a3271430caa6eb7e31ee96b76",
//           userCode: "cf40cbbfbb8e452c963ca2409229801a",
//         },
//       ],
//       keyNo: "b33c0a0d6bde41d9a79291ede2498217",
//       riskLevel: ["01", "02"],
//       messageType: ["01", "02"],
//       riskType: [
//         { code: "riskTypeBusinessInfo", dictCode: ["01"] },
//         { code: "riskTypeJudProceedings", dictCode: ["02"] },
//       ],
//       messageTitle: "复工了",
//       orgCodeList: ["systemmanageorg"],
//     },
//     msg: "操作成功!",
//   };
// });

// 风险类型
// Mock.mock(/\/approve\/riskNotice\/showRiskTypes/, "post", () => {
//   return {
//     code: "00000",
//     data: [
//       {
//         value: "工商",
//         code: "gs",
//         dicOption: [
//           {
//             dictName: "开庭公告",
//             dictCode: "333",
//           },
//           {
//             dictName: "裁判文书",
//             dictCode: "444",
//           },
//         ],
//       },
//       {
//         value: "司法",
//         code: "sf",
//         dicOption: [
//           {
//             dictName: "法人信息",
//             dictCode: "111",
//           },
//           {
//             dictName: "风险预判",
//             dictCode: "222",
//           },
//           {
//             dictName: "经营不良",
//             dictCode: "333",
//           },
//         ],
//       },
//     ],
//     msg: "操作成功!",
//   };
// });
