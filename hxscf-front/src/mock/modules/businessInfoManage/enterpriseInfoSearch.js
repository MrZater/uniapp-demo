/*
 * @Author: mingliang.zhu
 * @Date: 2020-11-02 14:52:49
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-11-06 11:28:51
 * @description 企业信息管理 mock 数据
 */
import Mock from "mockjs";
// 企业信息-列表查询
// Mock.mock(/\/approve\/corpInfoSelect\/showCorpList/, "post", () => {
//     return {
//         code: "00000",
//         msg: "success",
//         data: {
//             "total": 4,
//             "list": [
//                 {
//                     "corpName": "福建森友食品有限公司",
//                     "creditCode": "91350582070890790Q",
//                     "isCreate": "0"
//                 },
//                 {
//                     "corpName": "浙江芬米商贸有限公司",
//                     "creditCode": "91330901MA2A24RA5E",
//                     "isCreate": "1"
//                 },
//                 {
//                     "corpName": "福建森友食品有限公司2",
//                     "creditCode": "91350582070890790Q2",
//                     "isCreate": "0"
//                 },
//                 {
//                     "corpName": "浙江芬米商贸有限公司2",
//                     "creditCode": "91330901MA2A24RA5E2",
//                     "isCreate": "1"
//                 }
//             ],
//             "pageNum": 1,
//             "pageSize": 10
//         },
//         "msg": "操作成功!"
//     };
// });
// 企业信息-模糊查询
// Mock.mock(/\/approve\/corpInfoSelect\/showCorpOnChangeDetails/, "get", () => {
//     return {
//         code: "00000",
//         msg: "success",
//         data: [
//             "上海有限责任公司",
//             "上海有限责任股份公司"
//         ],
//         "msg": "操作成功!"
//     };
// });
// 企业信息详情-基本信息
// Mock.mock(/\/approve\/enterprise\/showEssentialDetails/, "post", () => {
//     return {
//         "code": "00000",
//         "data": {
//             "bizBaseInfo": {
//                 "custId": "12313411",
//                 "bizName": "厦门海信有限公司",
//                 "creditCode": "20190928090100001",
//                 "operName": "王一航",
//                 "orgNo": 73637264873,
//                 "regNo": "7987878798789",
//                 "startDate": "2002-05-06",
//                 "detailStatus": "开业",
//                 "entType": "私营",
//                 "registCapi": "6,667,888",
//                 "updatedDate": "2020-06-12",
//                 "teamStart": "2002-05-16",
//                 "teamEnd": "2030-07-16",
//                 "insuredCount": "5000",
//                 "belongOrg": "厦门工商局",
//                 "registAddress": "厦门市思明区256号786室",
//                 "detailScope": "手机信息服务（未经行政许可，不得开展金融业务）；企业征信业务；技术推广、技术服务；计算机系统服务；基础软件服务；应用软件服务；设计、制作、代理、发布广告。（企业依法自主选择经营项目，开展经营活动；依法须经批准的项目，经相关部门批准后依批准的；不得从事本市产业政策禁止和限制类项目的经营活动。）",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             },
//             "bizapply": {
//                 "industryCode": "1", //所属行业编码
//                 "busUserId": "2", //业务人员（用户账号）
//                 "busOrgCode": "3", //业务部门（机构编号)
//                 "bizRoles": "4", //企业角色 01客户 02供应商 03物流方 04委托方
//                 "creditFlag": "5", //额度管控标识 0否 1是
//                 "operPaperId": "6", //法人代表身份证号码
//                 "operMobileNo": "7", //法人代表手机号
//                 "detailAddress": "8", //经营详细地址
//             },
//             "empLoyees": [{
//                 "custId": "12313411",
//                 "keyNo ": "111",
//                 "employeName": "王大宝",
//                 "employeJob": "董事长",
//                 "employeBizname": "12",
//                 "employePaperid": "11010199901010328",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             },
//             {
//                 "custId": "12313411",
//                 "keyNo": "112",
//                 "employeName": "李牧",
//                 "employeJob": "总经理",
//                 "employeBizname": "15",
//                 "employePaperid": "11010199901010328",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             }],
//             "branches": [{
//                 "custId": "12313411",
//                 "creditCode": "4367438765438756",
//                 "bizName": "无限科技有限责任公司",
//                 "COMPANY_ID": "COMPANY_ID",
//                 "operName": "王一航",
//                 "regNo": "98098098",
//                 "belongOrg": "厦门工商局",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             },
//             {
//                 "custId": "12313411",
//                 "creditCode": "4359874359874358",
//                 "bizName": "来碗科技有限责任公司",
//                 "COMPANY_ID": "COMPANY_ID",
//                 "operName": "李牧",
//                 "regNo": "09809809",
//                 "belongOrg": "厦门工商局",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             }],
//             "permissioneci": [{
//                 "custId": "12313411",
//                 "licensDocno": "67893278979879",
//                 "licensDocname": "名称1",
//                 "validityFrom": "2020-06-16",
//                 "validityTo": "2024-06-16",
//                 "licensOffice": "内容描述",
//                 "licensContent": "厦门工商局",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             },
//             {
//                 "custId": "12313411",
//                 "licensDocno": "3726487326888",
//                 "licensDocname": "名称1",
//                 "validityFrom": "2020-06-16",
//                 "validityTo": "2024-06-16",
//                 "licensOffice": "内容描述",
//                 "licensContent": "厦门工商局",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             }],
//             "changeRecords": [{
//                 "custId": "12313411",
//                 "keyNo": "67893278979879",
//                 "changeDate": "2018-07-14",
//                 "projectName": "章程备案",
//                 "beforeContent": "2016章程备案",
//                 "afterContent    ": "2018章程备案",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             },
//             {
//                 "custId": "12313411",
//                 "keyNo": "67893278979879",
//                 "changeDate": "2018-07-14",
//                 "projectName": "投资人（股权）",
//                 "beforeContent": "王大明；李义山",
//                 "afterContent    ": "王思处；李义山",
//                 "createUser": "13600000002",
//                 "createTime": 1600272000000,
//                 "modifyUser": "13600000002",
//                 "modifyTime": "20200917135455346"
//             }]
//         },
//         "msg": "成功！"
//     };
// });
// 企业信息详情-经营信息
// Mock.mock(/\/approve\/enterprise\/showEnterpriseBusDetails/, "post", () => {
//     return {
//         "code": "00000",
//         "data": {
//             "chattelMortgage": [],
//             "bizInvest": {
//                 "total": 1,
//                 "list": [
//                     {
//                         "custId": "x",
//                         "keyNo": "s",
//                         "creditCode": "s",
//                         "bizName": "企业名称1",
//                         "operName": "名称x",
//                         "econKind": "类型x",
//                         "registCapi": "0",
//                         "startDate": null,
//                         "fundedRatio": "0",
//                         "createUser": null,
//                         "createTime": 1604546898000,
//                         "modifyUser": null,
//                         "modifyTime": null
//                     }
//                 ],
//                 "pageNum": 1,
//                 "pageSize": 50,
//                 "size": 1,
//                 "startRow": 1,
//                 "endRow": 1,
//                 "pages": 1,
//                 "prePage": 0,
//                 "nextPage": 0,
//                 "isFirstPage": true,
//                 "isLastPage": true,
//                 "hasPreviousPage": false,
//                 "hasNextPage": false,
//                 "navigatePages": 8,
//                 "navigatepageNums": [
//                     1
//                 ],
//                 "navigateFirstPage": 1,
//                 "navigateLastPage": 1
//             },
//             "partners": [
//                 {
//                     "custId": "x",
//                     "keyNo": "s",
//                     "stockName": "名称1",
//                     "stockType": null,
//                     "shouldCapi": "1000",
//                     "investType": "x",
//                     "shoudDate": null,
//                     "realCapi": null,
//                     "stockPercent": "100%",
//                     "capiDate": "1122",
//                     "finalBenefitPercent": "0",
//                     "createUser": null,
//                     "createTime": 1604546898000,
//                     "modifyUser": null,
//                     "modifyTime": null
//                 }
//             ],
//             "assetsData": [
//                 {
//                     "custId": "x",
//                     "keyNo": "s",
//                     "sendYear": null,
//                     "totalOwnersEquity": "x",
//                     "grossTradingIncome": "100",
//                     "totalProfit": null,
//                     "mainBusinessIncome": "主营业务1",
//                     "netProfit": null,
//                     "totalTaxAmount": null,
//                     "totalLiabilities": "2333",
//                     "bankingCredit": "111111",
//                     "createUser": "1",
//                     "createTime": 1604546898000,
//                     "modifyUser": null,
//                     "modifyTime": null
//                 }
//             ],
//             "pledge": [
//                 {
//                     "custId": "x",
//                     "registNo": "11111",
//                     "pledgor": null,
//                     "pledgorNo": "11xx00",
//                     "pledgee": "质权人x",
//                     "pledgeeNo": null,
//                     "pledgedAmount": "出质股权数额",
//                     "regDate": "00-00",
//                     "publicDate": "2020-12-11",
//                     "pledgStatus": "x",
//                     "createUser": null,
//                     "createTime": null,
//                     "modifyUser": null,
//                     "modifyTime": null
//                 }
//             ],
//             "providAassurance": []
//         },
//         "msg": "操作成功!"
//     };
// });
// 企业信息详情-经营不良
// Mock.mock(/\/approve\/enterprise\/showPoorManageDetails/, "post", () => {
//     return {
//         "code": "00000",
//         "data": {
//             "penalty": [{//企业行政处罚
//                 "caseNo": "2019-3号决定书",
//                 "name": "行政处罚",
//                 "caseAmt": "100.00",
//                 "lianDate": "2020-06-16",
//                 "province": "厦门",
//                 "ownerName": "李亦航",
//                 "caseReason": "处罚事由" //点击详情
//             }],
//             "bizOpException": [{//企业异常经营名录
//                 "addDate": "2019-06-16",
//                 "addOffice": "厦门工商局",
//                 "addReason": "描述",
//                 "removeDate": "2020-06-16",
//                 "removeOffice": "厦门工商局",
//                 "removeReason": "移除原因" //点击详情
//             }],
//             "bizSeriousViolation": [{//企业失信黑名单
//                 "addDate": "2019-06-16",
//                 "addOffice": "厦门工商局",
//                 "addReason": "描述",
//                 "removeDate": "2020-06-16",
//                 "removeOffice": "厦门工商局",
//                 "removeReason": "移除原因" //点击详情
//             }],
//             "freezeInfo": [{//股权冻结
//                 "executee": "",
//                 "executeeIdentifyNo": "",
//                 "executeeIdentifyType": "",
//                 "equityAmount": "",
//                 "equityStatus": "",
//                 "freezeYears": "",
//                 "freezeStartDate": "",
//                 "freezeEndDate": "",
//                 "publicDate": "",
//                 "execNo": "",
//                 "docNo": "",
//                 "execCourt": "",
//                 "execItem": "" //点击详情
//             }],
//             "bizLogout": [{//简易注销公告
//                 "bizName": "",
//                 "belongOrg": "",
//                 "logoutFrom": "",
//                 "logoutTo": ""
//             }],
//             "liquidation": [{//清算
//                 "leader": "",
//                 "member": ""
//             }],
//             "bizJustice": [{//司法协助
//                 "executee": "",
//                 "equityAmount": "",
//                 "equityAmountType": "",
//                 "execCourt": "",
//                 "execNo": "",
//                 "equityStatus": ""//描述
//             }]
//         },
//         "msg": "成功！"
//     }
// });
// 企业信息详情-司法信息
Mock.mock(/\/approve\/enterpriseInfoSearch\/judicialInfoDetail/, "post", () => {
    return {
        code: "00000",
        msg: "success",
        data: {
            list1: {
                pageNum: 1,
                pageSize: 50,
                total: 100,
                list: [
                    {
                        code1: "201936478264",
                        code2: "厦门法院",
                        code3: "786327846328746",
                        code4: 80020000,
                        code5: 1604386151786,
                        code6: 100000000,
                    }
                ]
            },
            list2: {
                pageNum: 1,
                pageSize: 50,
                total: 112,
                list: [
                    {
                        code1: "201936478264",
                        code2: "天天有限责任公司",
                        code3: "李亦航",
                        code4: "厦门法院",
                        code5: "4535435",
                        code6: 1604386151786,
                        code7: 1604386151786,
                        code8: "厦门法院",
                        code9: 10000000,
                        code10: 50000000,
                    }
                ]
            },
            list3: {
                pageNum: 1,
                pageSize: 50,
                total: 147,
                list: [
                    {
                        code1: "201936478264",
                        code2: "描述",
                        code3: "未知",
                        code4: 1604386151786,
                        code5: "厦门法院",
                        code6: "描述",
                        code7: 5000000,
                        code8: "是",
                        code9: "总经理",
                    },
                ]
            },
            list4: {
                pageNum: 1,
                pageSize: 50,
                total: 150,
                list: [
                    {
                        code1: "公告类型",
                        code2: "描述",
                        code3: 1604386151786,
                        code4: "厦门法院",
                        code5: "是"
                    }
                ]
            }
        }
    };
});
// 企业信息详情-法代信息
Mock.mock(/\/approve\/enterpriseInfoSearch\/normalBandInfoDetail/, "get", () => {
    return {
        code: "00000",
        msg: "success",
        data: {
            list1: [
                {
                    code1: "大壮",
                    code2: "786327846328746",
                    code3: "786328746",
                    code4: 1604386151786,
                    code5: "法院",
                    code6: "描述",
                    code7: 10340000,
                    code8: "审核中",
                }
            ],
            list2: [
                {
                    code1: "李亦航",
                    code2: "786327846328746",
                    code3: "1234321",
                    code4: "1604386151786",
                    code5: "厦门法院",
                    code6: "厦门法院",
                }
            ],
            list3: [
                {
                    code1: "201936478264",
                    code2: "类型",
                    code3: 1604386151786,
                    code4: "厦门法院",
                    code5: "描述",
                    code6: "是",
                    code7: "3434343",
                },
            ],
            list4: [
                {
                    code1: "公告类型",
                    code2: "描述",
                    code3: "大壮",
                    code4: 1604386151786,
                    code5: "法院",
                    code6: "是",
                }
            ],
            list5: [
                {
                    code1: "公告类型",
                    code2: "描述",
                    code3: 1604386151786,
                    code4: "法院",
                    code5: "是",
                }
            ],
            list6: [
                {
                    code1: "001",
                    code2: "男",
                    code3: 21,
                    code4: "法院",
                    code5: "厦门",
                    code6: 1604386151786,
                    code7: 1604386151786,
                }
            ]
        }
    };
});
