/*
 * @Author: mingliang.zhu 
 * @Date: 2020-11-23 15:08:44 
 * @Last Modified by: mingliang.zhu
 * @Last Modified time: 2020-11-23 18:56:57
 */

import Mock from "mockjs";
// 企业信息-列表查询

// 企业信息详情-司法信息
// Mock.mock(/\/approve\/creditStad\/showCreditTemplateDetail/, "post", () => {
//     return {
//         "code": "00000",
//         "data": [
//             {
//                 "modelTableConfig": {
//                     "keyNo": "1ac5ca062cc440cb84cd6123cb34f4b7",
//                     "modelKeyNo": "4c25004109b748f0b85c56230e4d19fd",
//                     "tableCode": "jyxx",
//                     "tableCname": "经营信息",
//                     "createUser": "wangyisai",
//                     "createTime": 1605686367000,
//                     "modifyUser": "wangyisai",
//                     "modifyTime": 1605686367000
//                 },
//                 "modelColumnVoList": [
//                     {
//                         "keyNo": "22f3b655c64c4b938a8b4ee7b48ec064",
//                         "modeltableKeyNo": "1ac5ca062cc440cb84cd6123cb34f4b7",
//                         "columCode": "zhpg_zgxx",
//                         "columCname": "综合评估",
//                         "inputModel": "01",
//                         "columLength": "200",
//                         "requiredFlag": "0",
//                         "columType": "02",
//                         "createUser": "wangyisai",
//                         "createTime": 1605686367000,
//                         "modifyUser": "wangyisai",
//                         "modifyTime": 1605686367000,
//                         "columDicConfigList": null
//                     },
//                     {
//                         "keyNo": "f3baf23fdb4a4022961d9789a9e1b7fa",
//                         "modeltableKeyNo": "1ac5ca062cc440cb84cd6123cb34f4b7",
//                         "columCode": "ywbmdqydzgpg_zgxx",
//                         "columCname": "业务部门对企业的主观评价",
//                         "inputModel": "02",
//                         "columLength": "200",
//                         "requiredFlag": "0",
//                         "columType": "05",
//                         "createUser": "wangyisai",
//                         "createTime": 1605686367000,
//                         "modifyUser": "wangyisai",
//                         "modifyTime": 1605686367000,
//                         "columDicConfigList": [
//                             {
//                                 "keyNo": "50490fb8fa204c3a922f42c02ce091b7",
//                                 "modelcolumKeyNo": "f3baf23fdb4a4022961d9789a9e1b7fa",
//                                 "dictCode": "best",
//                                 "dictName": "优秀",
//                                 "createUser": "wangyisai",
//                                 "createTime": 1605686367000,
//                                 "modifyUser": "wangyisai",
//                                 "modifyTime": 1605686367000
//                             },
//                             {
//                                 "keyNo": "cb4236567918429d8dc0fa4fbdc0f199",
//                                 "modelcolumKeyNo": "f3baf23fdb4a4022961d9789a9e1b7fa",
//                                 "dictCode": "good",
//                                 "dictName": "良好",
//                                 "createUser": "wangyisai",
//                                 "createTime": 1605686367000,
//                                 "modifyUser": "wangyisai",
//                                 "modifyTime": 1605686367000
//                             }
//                         ]
//                     }
//                 ]
//             },
//             {
//                 "modelTableConfig": {
//                     "keyNo": "cf4d573480cc4883bad78814e9a6bc89",
//                     "modelKeyNo": "4c25004109b748f0b85c56230e4d19fd",
//                     "tableCode": "jyxx",
//                     "tableCname": "经营信息",
//                     "createUser": "wangyisai",
//                     "createTime": 1605686367000,
//                     "modifyUser": "wangyisai",
//                     "modifyTime": 1605686367000
//                 },
//                 "modelColumnVoList": [
//                     {
//                         "keyNo": "41e48035ac6e489d92830e9c4a11c43b",
//                         "modeltableKeyNo": "cf4d573480cc4883bad78814e9a6bc89",
//                         "columCode": "zhpg_zgxx",
//                         "columCname": "综合评估",
//                         "inputModel": "01",
//                         "columLength": "200",
//                         "requiredFlag": "0",
//                         "columType": "02",
//                         "createUser": "wangyisai",
//                         "createTime": 1605686367000,
//                         "modifyUser": "wangyisai",
//                         "modifyTime": 1605686367000,
//                         "columDicConfigList": null
//                     },
//                     {
//                         "keyNo": "0ce1e01b02fa49cc9cbde90c9dc7f2f9",
//                         "modeltableKeyNo": "cf4d573480cc4883bad78814e9a6bc89",
//                         "columCode": "ywbmdqydzgpg_zgxx",
//                         "columCname": "业务部门对企业的主观评价",
//                         "inputModel": "02",
//                         "columLength": "200",
//                         "requiredFlag": "0",
//                         "columType": "05",
//                         "createUser": "wangyisai",
//                         "createTime": 1605686367000,
//                         "modifyUser": "wangyisai",
//                         "modifyTime": 1605686367000,
//                         "columDicConfigList": [
//                             {
//                                 "keyNo": "d6477fb7ae1d423cb26b181498692fdb",
//                                 "modelcolumKeyNo": "0ce1e01b02fa49cc9cbde90c9dc7f2f9",
//                                 "dictCode": "best",
//                                 "dictName": "优秀",
//                                 "createUser": "wangyisai",
//                                 "createTime": 1605686367000,
//                                 "modifyUser": "wangyisai",
//                                 "modifyTime": 1605686367000
//                             },
//                             {
//                                 "keyNo": "dd7229f79301467e82e0628c9107aabc",
//                                 "modelcolumKeyNo": "0ce1e01b02fa49cc9cbde90c9dc7f2f9",
//                                 "dictCode": "good",
//                                 "dictName": "良好",
//                                 "createUser": "wangyisai",
//                                 "createTime": 1605686367000,
//                                 "modifyUser": "wangyisai",
//                                 "modifyTime": 1605686367000
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ],
//         "msg": "操作成功!"
//     }
// });
