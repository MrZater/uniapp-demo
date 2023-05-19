<template>
    <div>
        <div id="pdfDom" class="report-box" v-loading="reportLoading">
            <div class="report-header">
                <!-- <div class="header-left">报告编号： {{result.logDataMap && result.logDataMap.serialNumber}}</div> -->
                <div class="header-left">报告生成时间： {{data.decisionResult && data.decisionResult.reportTime}}</div>
            </div>
            <div class="divider-line-2"></div>
            <div class="main-title">企业资信报告-专业版</div>
            <div class="tips">
                <div class="tips-title">阅读须知:</div>
                <p>1.报告生成时间：{{data.decisionResult && data.decisionResult.reportTime}}</p>
                <p>2.您所看到的报告内容为截止至该时间点该公司的资信数据快照。</p>
            </div>
            <div align="center">
                <div class="sub-gap"></div>
                <img src="@/assets/images/report/start.png" alt="图片加载失败" style="width:70%;">
            </div>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>

            <div class="main-title">{{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.bizName}}</div>
            <div class="main-title">目录</div>
            <div class="line-title">01 企业综合策略建议</div>
            <div class="divider-line-2"></div>
            <div class="tips">
                <div class="tips-title">阅读须知:</div>
                <p>建议额度</p>
                <p>信用评分</p>
                <p>信用评级</p>
                <p>企业资信评估</p>
                <p>自然人信用评估 | 法定代表人 | <span v-for="(item,index) in data.relatedPersonInfo" :key="'related_person_info'+index">关联人{{index+1}} |</span> </p>
            </div>
            <div class="sub-gap"></div>
            <div class="line-title">02 企业基础信息详情</div>
            <div class="divider-line-2"></div>
            <div class="tips">
                <p>基础信息 | 基本信息 | 补充信息 | 高管信息 | 分支机构 | 行政许可 | 变更</p>
                <p>经营信息 | 资产状况息 | 对外保证 | 股东及出自信息 | 企业对外投资 | 股东对外投资 | 股权出质 | 动产抵押</p>
                <p>经营异常 | 行政处罚 | 列入经营异常名录 | 列入严重违法失信黑名单 (工商) | 股权冻结 | 简易注销公告 | 清算 | 司法协助</p>
                <p>司法 | 企业被执行 | 失信被执行 | 裁判文书 | 开庭公告</p>
            </div>
            <div class="sub-gap"></div>
            <div class="line-title">03 法人基础信息详情代表</div>
            <div class="divider-line-2"></div>
            <div class="tips">
                <p>执行公告</p>
                <p>失信公告</p>
                <p>裁判文书</p>
                <p>法院公告</p>
                <p>开庭公告</p>
                <p>限制消费</p>
            </div>
            <div v-for="(item,index) in data.relatedPersonInfo" :key="'related'+index">
                <div class="sub-gap"></div>
                <div class="line-title">0{{4+index}} 关联人{{index+1}}基础信息详情</div>
                <div class="divider-line-2"></div>
                <div class="tips">
                    <p>执行公告</p>
                    <p>失信公告</p>
                    <p>裁判文书</p>
                    <p>法院公告</p>
                    <p>开庭公告</p>
                    <p>限制消费</p>
                </div>
            </div>
            <div class="main-title">企业综合策略建议</div>
            <div class="line-title">1 建议额度</div>
            <div class="divider-line-2"></div>
            <div class="tips">
                <p>建议信用额度：<span class="primary font18">{{data.decisionResult && data.decisionResult.surveyMaxAmt}}</span></p>
                <p>本额度为建议信用额度，最终额度以审核为准</p>
                <br>
            </div>
            <div class="sub-gap"></div>
            <div class="line-title">2 信用评分</div>
            <div class="divider-line-2"></div>
            <div class="tips">
                <p>信用评分：<span class="primary font18">{{data.decisionResult && data.decisionResult.riskScore}}</span></p>
                <br>
            </div>
            <div class="sub-gap"></div>
            <div class="line-title">3 信用评级</div>
            <div class="divider-line-2"></div>
            <div class="tips">
                <p>信用评级：<span class="primary font18">{{data.decisionResult && data.decisionResult.riskLevel}}</span></p>
                <br>
                <radar-chart :dataSource="chartData" id="activityTypelEchats" height="500px" />
            </div>
            <div class="sub-gap"></div>
            <div class="line-title">4 企业资信评估</div>
            <div class="divider-line-2"></div>
            <div class="empty" v-if="data.decisionResult && data.decisionResult.result.length === 0">暂无数据</div>
            <table class="detail-table">
                <tr>
                    <td style="width:33%">企业规则命中</td>
                    <td style="width:33%;background-color:#f5f7fa">命中数 <span class="primary">{{  "3" }}</span></td>
                    <td style="width:33%">建议策略：<span class="primary">{{data.decisionResult && data.decisionResult.result}}</span></td>
                </tr>
                <tr>
                    <td colspan="3" style="background:none">
                        <el-tag size="medium" style="margin:20px;">法人不为实际控制人</el-tag>
                        <el-tag size="medium" style="margin:20px;">受益所有人</el-tag>
                        <el-tag size="medium" style="margin:20px;">股东变更频繁</el-tag>
                    </td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">4 自然人信用风险评估</div>
            <div class="divider-line-2"></div>
            <div class="line-title">4.1 法定代表人</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="[]" class="br-table">
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="身份证" prop="id"></el-table-column>
                <el-table-column label="手机号" prop="phone"></el-table-column>
                <el-table-column label="信用评分" prop="score"></el-table-column>
                <el-table-column label="建议策略" prop="jian"></el-table-column>
            </el-table>
            <div class="detail-table-tip">
                [300, 685) <span class="danger">拒绝</span>； [685, 719) <span class="warning">复议</span>； [720,1000] <span class="primary">通过</span>
            </div>
            <div v-for="(item,index) in 1" :key="index+100" style="clear:both">
                <div class="sub-gap"></div>
                <div class="line-title">4.{{index+2}} 关联人{{index+1}}</div>
                <el-table stripe :data="[]" class="br-table">
                    <el-table-column label="姓名" prop="name"></el-table-column>
                    <el-table-column label="身份证" prop="id"></el-table-column>
                    <el-table-column label="手机号" prop="phone"></el-table-column>
                    <el-table-column label="信用评分" prop="score"></el-table-column>
                    <el-table-column label="建议策略" prop="jian"></el-table-column>
                </el-table>
                <div class="detail-table-tip">
                    [300, 685) <span class="danger"> 拒绝</span>； [685, 719) <span class="warning"> 复议</span>； [720,1000] <span class="primary"> 通过</span>
                </div>
            </div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="main-title clear" style="clear:both">企业详细信息<span style="color: #606266;font-weight: 600;font-size: 20px;">(全维信息，辅助判断)</span></div>
            <div class="line-title">1 基本信息</div>
            <div class="divider-line-2"></div>
            <div class="line-title">1.1 基本信息</div>
            <div class="divider-line-1"></div>
            <div class="baseInfo">
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">企业名称：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.bizName}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">法定代表人：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.operName}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">统一社会信用代码：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.creditCode}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">法定组织机构代码：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.orgNo}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">注册号：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.regNo}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">成立时间：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.startDate}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">经营状态：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.detailStatus}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">公司类型：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.entType}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">注册资本：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.registCapi}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">所属行业：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.tradeName}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">核准日期：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.updatedDate}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">营业期限：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.termStart}} 至
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.teamEnd}}

                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">人员规模：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.insuredCount}}
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">电话：</span>
                            <span class="unit-value">
                                <!-- {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.insuredCount}} -->
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">邮箱：</span>
                            <span class="unit-value">
                                <!-- {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.insuredCount}} -->
                            </span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="test-row">
                            <span class="unit-key">登记机关：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.belongOrg}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="test-row">
                            <span class="unit-key">注册地址：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.registAddress}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="test-row">
                            <span class="unit-key">经营范围：</span>
                            <span class="unit-value">
                                {{data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizBaseInfo && data.enterBaseInfo.basicInfo.bizBaseInfo.detailScope}}
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="sub-gap"></div>
            <div class="line-title">1.2 补充信息</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.bizapply" class="br-table">
                <el-table-column label="所属行业" prop="tradeName"></el-table-column>
                <el-table-column label="业务人员" prop="businessUserName"></el-table-column>
                <el-table-column label="业务部门" prop="businessOrgName"></el-table-column>
                <el-table-column label="企业角色" prop="bizRoles"></el-table-column>
                <el-table-column label="是否做物流额度掌控" prop="creditFlag"></el-table-column>
                <el-table-column label="法人代表身份证" prop="operPaperId"></el-table-column>
                <el-table-column label="法人代表手机号码" prop="operMobileNo"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">1.3 高管信息</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.empLoyees" class="br-table">
                <el-table-column label="姓名" prop="employeName"></el-table-column>
                <el-table-column label="职位" prop="employeJob"></el-table-column>
                <el-table-column label="关联企业" prop="employeBizname"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">1.4 分支机构</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.branches" class="br-table">
                <el-table-column label="公司名称" prop="bizName"></el-table-column>
                <el-table-column label="注册号" prop="regNo"></el-table-column>
                <el-table-column label="负责人" prop="operName"></el-table-column>
                <el-table-column label="统计社会信用代码" prop="creditCode"></el-table-column>
                <el-table-column label="登记机关" prop="belongOrg"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">1.5 变更信息</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.changeRecords" class="br-table">
                <el-table-column label="变更日期" prop="changeDate" width="150px"></el-table-column>
                <el-table-column label="变更事项" prop="projectName" width="150px"></el-table-column>
                <el-table-column label="变更前内容" prop="beforeContent"></el-table-column>
                <el-table-column label="变更后内容" prop="afterContent"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">1.6 行政许可</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.basicInfo && data.enterBaseInfo.basicInfo.permissioneci" class="br-table">
                <el-table-column label="许可文件编号" prop="licensDocno"></el-table-column>
                <el-table-column label="许可文件名称" prop="licensDocname"></el-table-column>
                <el-table-column label="有效期自" prop="validityFrom"></el-table-column>
                <el-table-column label="有效期至" prop="validityTo"></el-table-column>
                <el-table-column label="许可机关" prop="licensOffice"></el-table-column>
                <el-table-column label="许可内容" prop="licensContent"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2 经营信息</div>
            <div class="divider-line-2"></div>
            <div class="line-title">2.1 资产情况</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.assetsData" class="br-table">
                <el-table-column label="报送年度" prop="sendYear"></el-table-column>
                <el-table-column label="所有者权益合计" prop="totalOwnersEquity"></el-table-column>
                <el-table-column label="营业总收入" prop="cgrossTradingIncome"></el-table-column>
                <el-table-column label="利润总额" prop="totalProfit"></el-table-column>
                <el-table-column label="主营业务" prop="mainBusinessIncome"></el-table-column>
                <el-table-column label="净利润" prop="netProfit"></el-table-column>
                <el-table-column label="纳税总额" prop="totalTaxAmount"></el-table-column>
                <el-table-column label="负债总额" prop="totalLiablities"></el-table-column>
                <el-table-column label="金融贷款" prop="bankingCredit"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2.2 对外保证</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.providAassurance" class="br-table">
                <el-table-column label="报送年度" prop="sendYear"></el-table-column>
                <el-table-column label="债务人" prop="debtor"></el-table-column>
                <el-table-column label="债权人" prop="creditor"></el-table-column>
                <el-table-column label="主债权类型" prop="creditorCategory"></el-table-column>
                <el-table-column label="主债权数额" prop="creditorAmount"></el-table-column>
                <el-table-column label="债务期限" prop="fulfillObligation"></el-table-column>
                <el-table-column label="保证期间" prop="assuranceDurn"></el-table-column>
                <el-table-column label="保证方式" prop="assuranceType"></el-table-column>
                <el-table-column label="保证范围" prop="assuranceScope"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2.3 股东及出资信息</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.partners" class="br-table">
                <el-table-column label="股东名称" prop="stockName"></el-table-column>
                <el-table-column label="认缴出资额(万)" prop="shouldCapi"></el-table-column>
                <el-table-column label="认缴出资方式" prop="investType"></el-table-column>
                <el-table-column label="实缴出资额" prop="realCapi"></el-table-column>
                <el-table-column label="出资比例" prop="stockPercent"></el-table-column>
                <el-table-column label="认缴出资日期" prop="shoudDate"></el-table-column>
                <el-table-column label="实缴时间" prop="capiDate"></el-table-column>
                <el-table-column label="最终收益股份" prop="finalBenefitPercent"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2.4 企业对外投资</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.bizInvest" class="br-table">
                <el-table-column label="企业名称" prop="bizName"></el-table-column>
                <el-table-column label="统一社会信用代码" prop="creditCode"></el-table-column>
                <el-table-column label="法定代表人" prop="operName"></el-table-column>
                <el-table-column label="企业类型" prop="econKind"></el-table-column>
                <el-table-column label="成立时间" prop="startDate"></el-table-column>
                <el-table-column label="注册资本(万)" prop="registCapi"></el-table-column>
                <el-table-column label="出资比例" prop="fundedRatio"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2.5 股东对外投资</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.partnerInvest" class="br-table">
                <el-table-column label="股东姓名" prop="stockName"></el-table-column>
                <el-table-column label="企业名称" prop="bizName"></el-table-column>
                <el-table-column label="统一社会信用代码" prop="creditCode"></el-table-column>
                <el-table-column label="法定代表人" prop="operName"></el-table-column>
                <el-table-column label="企业性质" prop="econKind"></el-table-column>
                <el-table-column label="成立日期" prop="startDate"></el-table-column>
                <el-table-column label="注册资本(万)" prop="registCapi"></el-table-column>
                <el-table-column label="注册比例" prop="fundedRatio"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2.6 股权出质</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.pledge.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.pledge" :key="'pledge'+index">
                <tr>
                    <td>质权登记编号</td>
                    <td>{{item.registNo}}</td>
                    <td>出质人</td>
                    <td>{{item.pledgor}}</td>
                </tr>
                <tr>
                    <td>出质人证件号码</td>
                    <td>{{ item.pledgorNo }}</td>
                    <td>出质股权数额</td>
                    <td>{{ item.pledgedAmount }}</td>
                </tr>
                <tr>
                    <td>质权人</td>
                    <td>{{ item.pledgee }}</td>
                    <td>质权人证件号码</td>
                    <td>{{ item.pledgeeNo }}</td>
                </tr>
                <tr>
                    <td>登记日期</td>
                    <td>{{item.regDate}}</td>
                    <td>出质状态</td>
                    <td>{{item.pledgStatus}}</td>
                </tr>
                <tr>
                    <td>公示日期</td>
                    <td>{{item.publicDate}}</td>
                    <td>注销日期</td>
                    <td>{{"---"}}</td>
                </tr>
                <tr>
                    <td>注销原因</td>
                    <td colspan="3">{{"---"}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">2.7 动产抵押</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementInfo && data.enterBaseInfo.managementInfo.chattelMortgage" class="br-table">
                <el-table-column label="登记编号" prop="registerNo"></el-table-column>
                <el-table-column label="登记日期" prop="registerDate"></el-table-column>
                <el-table-column label="登记机关" prop="registerOffice"></el-table-column>
                <el-table-column label="被担保债劵数额" prop="debtsecuredAmount"></el-table-column>
                <el-table-column label="状态" prop="registerStatus"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">3 经营不良</div>
            <div class="divider-line-2"></div>
            <div class="line-title">3.1 行政处罚</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.penalty.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.penalty" :key="'pledge'+index">
                <tr>
                    <td>决定文书号</td>
                    <td>{{item.docNo}}</td>
                    <td>决定机关名称</td>
                    <td>{{"---"}}</td>
                </tr>
                <tr>
                    <td>处罚日期</td>
                    <td>{{"---"}}</td>
                    <td>公示日期</td>
                    <td>{{"---"}}</td>
                </tr>
                <tr>
                    <td>违法金额</td>
                    <td>{{"---"}}</td>
                    <td>违法行为类型</td>
                    <td>{{"---"}}</td>
                </tr>
                <tr>
                    <td>处罚内容</td>
                    <td colspan="3">{{item.caseContent}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">3.2 列入异常经营名录</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.bizOpException.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.bizOpException" :key="'bizOpException'+index">
                <tr>
                    <td>列入日期</td>
                    <td>{{item.addDate}}</td>
                    <td>列入机关</td>
                    <td>{{item.addOffice}}</td>
                </tr>
                <tr>
                    <td>移除日期</td>
                    <td>{{item.removeDate}}</td>
                    <td>移除机关</td>
                    <td>{{item.removeOffice}}</td>
                </tr>
                <tr>
                    <td>列入原因</td>
                    <td colspan="3">{{item.addReason}}</td>
                </tr>
                <tr>
                    <td>移除原因</td>
                    <td colspan="3">{{item.removeReason}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">3.3 列入严重违法失信黑名单（工商）</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.bizSeriousViolation.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.bizSeriousViolation"
                :key="'bizSeriousViolation'+index">
                <tr>
                    <td>列入日期</td>
                    <td>{{item.addDate}}</td>
                    <td>列入机关</td>
                    <td>{{item.addOffice}}</td>
                </tr>
                <tr>
                    <td>移除日期</td>
                    <td>{{item.removeDate}}</td>
                    <td>移除机关</td>
                    <td>{{item.removeOffice}}</td>
                </tr>
                <tr>
                    <td>列入原因</td>
                    <td colspan="3">{{item.addReason}}</td>
                </tr>
                <tr>
                    <td>移除原因</td>
                    <td colspan="3">{{item.removeReason}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">3.4 股权冻结</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.freezeInfo.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.freezeInfo" :key="'freezeInfo'+index">
                <tr>
                    <td>冻结被执行人</td>
                    <td>{{item.executee}}</td>
                    <td>证件类型</td>
                    <td>{{item.executeeIdentifyType}}</td>
                </tr>
                <tr>
                    <td>证件号码</td>
                    <td>{{item.executeeIdentifyNo}}</td>
                    <td>冻结股数数额</td>
                    <td>{{item.equityAmount}}</td>
                </tr>
                <tr>
                    <td>冻结状态</td>
                    <td>{{item.equityStatus}}</td>
                    <td>冻结期限</td>
                    <td>{{item.freezeYears}}</td>
                </tr>
                <tr>
                    <td>开始日期</td>
                    <td>{{item.freezeStartDate}}</td>
                    <td>结束日期</td>
                    <td>{{item.freezeEndDate}}</td>
                </tr>
                <tr>
                    <td>公示日期</td>
                    <td>{{item.publicDate}}</td>
                    <td>裁定文书号</td>
                    <td>{{item.execNo}}</td>
                </tr>
                <tr>
                    <td>通知文书号</td>
                    <td>{{item.docNo}}</td>
                    <td>执行法院</td>
                    <td>{{item.execCourt}}</td>
                </tr>
                <tr>
                    <td>执行事项</td>
                    <td colspan="3">{{item.execItem}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">3.5 企业简易注销公告</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.bizLogout" class="br-table">
                <el-table-column label="企业名称" prop="bizName"></el-table-column>
                <el-table-column label="登记机关" prop="belongOrg"></el-table-column>
                <el-table-column label="开始日期" prop="logoutFrom"></el-table-column>
                <el-table-column label="结束日期" prop="logoutTo"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="line-title">3.6 清算</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.liquidation" class="br-table">
                <el-table-column label="清算责任人" prop="leader"></el-table-column>
                <el-table-column label="清算组成员" prop="member"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="line-title">3.7 司法协助信息</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.managementBad && data.enterBaseInfo.managementBad.bizJustice" class="br-table">
                <el-table-column label="被执行人" prop="executee"></el-table-column>
                <el-table-column label="股权数额" prop="equityAmount"></el-table-column>
                <el-table-column label="股权数额类型" prop="equityAmountType"></el-table-column>
                <el-table-column label="执行法院" prop="execCourt"></el-table-column>
                <el-table-column label="执行通知书文号" prop="execNo"></el-table-column>
                <el-table-column label="类型 | 状态" prop="equityStatus"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="line-title">4 司法</div>
            <div class="divider-line-2"></div>
            <div class="line-title">4.1 被执行人</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.executor" class="br-table">
                <el-table-column label="案号" prop="caseNo"></el-table-column>
                <el-table-column label="执行法院名称" prop="courtName"></el-table-column>
                <el-table-column label="组织机构代码" prop="orgNo"></el-table-column>
                <el-table-column label="执行依据案号" prop="executorDependDocumentno"></el-table-column>
                <el-table-column label="立案时间" prop="registerTime"></el-table-column>
                <el-table-column label="标的金额" prop="executorMoney"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="line-title">4.2 企业失信被执行</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.uncreditexecutor.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.uncreditexecutor"
                :key="'uncreditexecutor'+index">
                <tr>
                    <td>案号</td>
                    <td>{{item.caseNo}}</td>
                    <td>公司名称</td>
                    <td>{{item.bizName}}</td>
                </tr>
                <tr>
                    <td>法定代表人</td>
                    <td>{{item.operName}}</td>
                    <td>执行单位</td>
                    <td>{{item.courtName}}</td>
                </tr>
                <tr>
                    <td>执行依据案号</td>
                    <td>{{item.executorDependDocumentno}}</td>
                    <td>立案时间</td>
                    <td>{{item.registerTime}}</td>
                </tr>
                <tr>
                    <td>发布时间</td>
                    <td>{{item.publishTime}}</td>
                    <td>作出执行依据单位</td>
                    <td>{{item.gistUnit}}</td>
                </tr>
                <tr>
                    <td>已履行部分</td>
                    <td>{{item.fulfillPart}}</td>
                    <td>未履行部门</td>
                    <td>{{item.unfulfillPart}}</td>
                </tr>
                <tr>
                    <td>生效法律文书确定的义务</td>
                    <td colspan="3">{{item.legalDuty}}</td>
                </tr>
                <tr>
                    <td>失信被执行人行为具体情形</td>
                    <td colspan="3">{{item.fulfillPerformance}}</td>
                </tr>
                <tr>
                    <td>失信被执行人行为具体情形</td>
                    <td colspan="3">{{item.disruptLegalType}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">4.3 裁判文书</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.judgmentdoc.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.judgmentdoc" :key="'judgmentdoc'+index">
                <tr>
                    <td>裁判文书编号</td>
                    <td>{{item.caseNo}}</td>
                    <td>裁判文书类型</td>
                    <td>{{item.caseType}}</td>
                </tr>
                <tr>
                    <td>案由类型</td>
                    <td>{{item.caseReasonType}}</td>
                    <td>审批时间</td>
                    <td>{{item.updateDate}}</td>
                </tr>
                <tr>
                    <td>执行法院</td>
                    <td>{{item.courtName}}</td>
                    <td>审判时间</td>
                    <td>{{item.updateDate}}</td>
                </tr>
                <tr>
                    <td>案件金额</td>
                    <td>{{item.caseAmount}}</td>
                    <td>是否原告</td>
                    <td>{{item.isProsecutor}}</td>
                </tr>
                <tr>
                    <td>涉案人员角色</td>
                    <td colspan="3">{{item.caseRole}}</td>
                </tr>
                <tr>
                    <td>裁判文书名字</td>
                    <td colspan="3">{{item.caseName}}</td>
                </tr>
                <tr>
                    <td>案由</td>
                    <td colspan="3">{{item.caseReason}}</td>
                </tr>
                <tr>
                    <td>裁判结果</td>
                    <td colspan="3">{{"---"}}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">4.4 开庭公告</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.openannounce.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.enterBaseInfo && data.enterBaseInfo.judicialInfo && data.enterBaseInfo.judicialInfo.openannounce" :key="'openannounce'+index">
                <tr>
                    <td>开庭公告ID</td>
                    <td>{{item.ktggId}}</td>
                    <td>案号</td>
                    <td>{{item.caseNo}}</td>
                </tr>
                <tr>
                    <td>开庭时间</td>
                    <td>{{item.sortTime}}</td>
                    <td>法院名称</td>
                    <td>{{item.courtName}}</td>
                </tr>
                <tr>
                    <td>原告</td>
                    <td colspan="3">{{item.plainTiff}}</td>
                </tr>
                <tr>
                    <td>案由</td>
                    <td colspan="3">{{item.caseCause}}</td>
                </tr>
                <tr>
                    <td>内容概要</td>
                    <td colspan="3">{{ item.caseBody }}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="main-title">法人代表基础信息详情</div>
            <div class="line-title">1 执行公告</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtzxgg.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtzxgg" :key="'hxcourtzxgg'+index">
                <tr>
                    <td>姓名</td>
                    <td>{{item.pname}}</td>
                    <td>身份证号码</td>
                    <td>{{item.idCardNo}}</td>
                </tr>
                <tr>
                    <td>执行法院名称</td>
                    <td>{{item.courtName}}</td>
                    <td>立案时间</td>
                    <td>{{item.sortTimeString}}</td>
                </tr>
                <tr>
                    <td>案号</td>
                    <td>{{item.caseNo}}</td>
                    <td>执行标的</td>
                    <td>{{item.execMoney}}</td>
                </tr>
                <tr>
                    <td>案件状态</td>
                    <td colspan="3">{{item.caseState}}</td>
                </tr>
                <tr>
                    <td>标题</td>
                    <td colspan="3">{{item.caseTitle}}</td>
                </tr>
                <tr>
                    <td>内容概要</td>
                    <td colspan="3">{{ item.caseBody }}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">2 失信公告</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtsxgg.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtsxgg" :key="'hxcourtsxgg'+index">
                <tr>
                    <td>姓名</td>
                    <td>{{item.pname}}</td>
                    <td>立案时间</td>
                    <td>{{item.sortTimeString}}</td>
                </tr>
                <tr>
                    <td>身份证号</td>
                    <td>{{item.idCardNo}}</td>
                    <td>履行情况</td>
                    <td>{{item.shixinLxqk}}</td>
                </tr>
                <tr>
                    <td>执行法院</td>
                    <td>{{item.courtName}}</td>
                    <td>作出执行依据单位</td>
                    <td>{{item.execYjdw}}</td>
                </tr>
                <tr>
                    <td>案号</td>
                    <td colspan="3">{{item.caseNo}}</td>
                </tr>
                <tr>
                    <td>失信被执行人行为具体情形</td>
                    <td colspan="3">{{ item.shixinJtqx }}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">3 裁判文书</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtcpws.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtcpws" :key="'hxcourtcpws'+index">
                <tr>
                    <td>裁判文书ID</td>
                    <td>{{item.cpwsId}}</td>
                    <td>案件类型</td>
                    <td>{{item.caseType}}</td>
                </tr>
                <tr>
                    <td>审结时间</td>
                    <td>{{item.sortTimeString}}</td>
                    <td>法院名称</td>
                    <td>{{item.courtName}}</td>
                </tr>
                <tr>
                    <td>审理程序</td>
                    <td>{{item.trialProcedure}}</td>
                    <td>案号</td>
                    <td>{{item.caseNo}}</td>
                </tr>
                <tr>
                    <td>案由</td>
                    <td colspan="3">{{item.caseCause}}</td>
                </tr>
                <tr>
                    <td>标题</td>
                    <td colspan="3">{{ item.caseTitle }}</td>
                </tr>
                <tr>
                    <td>内容概要</td>
                    <td colspan="3">{{ item.caseBody }}</td>
                </tr>
                <tr>
                    <td>裁判结果</td>
                    <td colspan="3">{{ item.judgeResult }}</td>
                </tr>
                <tr>
                    <td>依据</td>
                    <td colspan="3">{{ item.cpwsYiju }}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">4 法院公告</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtfygg.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtfygg" :key="'hxcourtfygg'+index">
                <tr>
                    <td>法院公告ID</td>
                    <td>{{item.fyggId}}</td>
                    <td>公告类型</td>
                    <td>{{item.ggType}}</td>
                </tr>
                <tr>
                    <td>姓名</td>
                    <td>{{item.pname}}</td>
                    <td>发布时间</td>
                    <td>{{item.sortTimeString}}</td>
                </tr>
                <tr>
                    <td>法院名称</td>
                    <td>{{item.courtName}}</td>
                    <td>标题</td>
                    <td>{{item.caseTitle}}</td>
                </tr>
                <tr>
                    <td>内容概要</td>
                    <td colspan="3">{{ item.caseBody }}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">5 开庭公告</div>
            <div class="divider-line-1"></div>
            <div class="empty" v-if="data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtktgg.length === 0">暂无数据</div>
            <table class="detail-table" v-for="(item,index) in data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtktgg" :key="'hxcourtktgg'+index">
                <tr>
                    <td>开庭公告ID</td>
                    <td>{{item.ktggId}}</td>
                    <td>开庭时间</td>
                    <td>{{item.sortTimeString}}</td>
                </tr>
                <tr>
                    <td>原告</td>
                    <td>{{item.plainTiff}}</td>
                    <td>法院名称</td>
                    <td>{{item.courtName}}</td>
                </tr>
                <tr>
                    <td>案号</td>
                    <td colspan="3">{{ item.caseNo }}</td>
                </tr>
                <tr>
                    <td>案由</td>
                    <td colspan="3">{{ item.caseCause }}</td>
                </tr>
                <tr>
                    <td>内容概要</td>
                    <td colspan="3">{{ item.caseBody }}</td>
                </tr>
            </table>
            <div class="sub-gap"></div>
            <div class="line-title">6 限制消费</div>
            <div class="divider-line-1"></div>
            <el-table stripe :data="data.methodOfGneraInfo && data.methodOfGneraInfo.hxcourtxzxf" class="br-table">
                <el-table-column label="案号" prop="elxgCaseCode"></el-table-column>
                <el-table-column label="性别" prop="elxgSexName"></el-table-column>
                <el-table-column label="年龄" prop="elxgAge"></el-table-column>
                <el-table-column label="执行法院" prop="elxgCourtName"></el-table-column>
                <el-table-column label="地域名称" prop="elxgAreaName"></el-table-column>
                <el-table-column label="发布时间" prop="elxgPublishDate"></el-table-column>
                <el-table-column label="立案时间" prop="elxgRegDate"></el-table-column>
            </el-table>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div class="sub-gap"></div>
            <div v-for="(item,index) in data.relatedPersonInfo" :key="'relatedPersonInfo'+index">
                <div class="main-title">相关人{{index+1}}基础信息详情</div>
                <div class="line-title">1 执行公告</div>
                <div class="divider-line-1"></div>
                <div class="empty" v-if="item.hxcourtzxgg.length === 0">暂无数据</div>
                <table class="detail-table" v-for="(sub,sIndex) in item.hxcourtzxgg" :key="'hxcourtzxgg_sub'+sIndex">
                    <tr>
                        <td>姓名</td>
                        <td>{{sub.pname}}</td>
                        <td>身份证号码</td>
                        <td>{{sub.idCardNo}}</td>
                    </tr>
                    <tr>
                        <td>执行法院名称</td>
                        <td>{{sub.courtName}}</td>
                        <td>立案时间</td>
                        <td>{{sub.courtName}}</td>
                    </tr>
                    <tr>
                        <td>案号</td>
                        <td>{{sub.caseNo}}</td>
                        <td>执行标的</td>
                        <td>{{sub.execMoney}}</td>
                    </tr>
                    <tr>
                        <td>案件状态</td>
                        <td colspan="3">{{sub.caseState}}</td>
                    </tr>
                    <tr>
                        <td>标题</td>
                        <td colspan="3">{{sub.caseTitle}}</td>
                    </tr>
                    <tr>
                        <td>内容概要</td>
                        <td colspan="3">{{ sub.caseBody }}</td>
                    </tr>
                </table>
                <div class="line-title">2 失信公告</div>
                <div class="divider-line-1"></div>
                <div class="empty" v-if="item.hxcourtsxgg.length === 0">暂无数据</div>
                <table class="detail-table" v-for="(sub,sIndex) in item.hxcourtsxgg" :key="'hxcourtsxgg_sub'+sIndex">
                    <tr>
                        <td>姓名</td>
                        <td>{{sub.pname}}</td>
                        <td>立案时间</td>
                        <td>{{sub.sortTimeString}}</td>
                    </tr>
                    <tr>
                        <td>身份证号</td>
                        <td>{{sub.idCardNo}}</td>
                        <td>履行情况</td>
                        <td>{{sub.shixinLxqk}}</td>
                    </tr>
                    <tr>
                        <td>执行法院</td>
                        <td>{{sub.courtName}}</td>
                        <td>作出执行依据单位</td>
                        <td>{{sub.execYjdw}}</td>
                    </tr>
                    <tr>
                        <td>案号</td>
                        <td colspan="3">{{sub.caseNo}}</td>
                    </tr>
                    <tr>
                        <td>失信被执行人行为具体情形</td>
                        <td colspan="3">{{ sub.shixinJtqx }}</td>
                    </tr>
                </table>
                <div class="line-title">3 裁判文书</div>
                <div class="divider-line-1"></div>
                <div class="empty" v-if="item.hxcourtcpws.length === 0">暂无数据</div>
                <table class="detail-table" v-for="(sub,sIndex) in item.hxcourtcpws" :key="'hxcourtcpws_sub'+sIndex">
                    <tr>
                        <td>裁判文书ID</td>
                        <td>{{sub.cpwsId}}</td>
                        <td>案件类型</td>
                        <td>{{sub.caseType}}</td>
                    </tr>
                    <tr>
                        <td>审结时间</td>
                        <td>{{sub.sortTimeString}}</td>
                        <td>法院名称</td>
                        <td>{{sub.courtName}}</td>
                    </tr>
                    <tr>
                        <td>审理程序</td>
                        <td>{{sub.trialProcedure}}</td>
                        <td>案号</td>
                        <td>{{sub.caseNo}}</td>
                    </tr>
                    <tr>
                        <td>案由</td>
                        <td colspan="3">{{sub.caseCause}}</td>
                    </tr>
                    <tr>
                        <td>标题</td>
                        <td colspan="3">{{ sub.caseTitle }}</td>
                    </tr>
                    <tr>
                        <td>内容概要</td>
                        <td colspan="3">{{ sub.caseBody }}</td>
                    </tr>
                    <tr>
                        <td>裁判结果</td>
                        <td colspan="3">{{ sub.judgeResult }}</td>
                    </tr>
                    <tr>
                        <td>依据</td>
                        <td colspan="3">{{ sub.cpwsYiju }}</td>
                    </tr>
                </table>
                <div class="line-title">4 法院公告</div>
                <div class="divider-line-1"></div>
                <div class="empty" v-if="item.hxcourtfygg.length === 0">暂无数据</div>
                <table class="detail-table" v-for="(sub,sIndex) in item.hxcourtfygg" :key="'hxcourtfygg_sub'+sIndex">
                    <tr>
                        <td>法院公告ID</td>
                        <td>{{sub.fyggId}}</td>
                        <td>公告类型</td>
                        <td>{{sub.ggType}}</td>
                    </tr>
                    <tr>
                        <td>姓名</td>
                        <td>{{sub.pname}}</td>
                        <td>发布时间</td>
                        <td>{{sub.sortTimeString}}</td>
                    </tr>
                    <tr>
                        <td>法院名称</td>
                        <td>{{sub.courtName}}</td>
                        <td>标题</td>
                        <td>{{sub.caseTitle}}</td>
                    </tr>
                    <tr>
                        <td>内容概要</td>
                        <td colspan="3">{{ sub.caseBody }}</td>
                    </tr>
                </table>

                <div class="line-title">5 开庭公告</div>
                <div class="divider-line-1"></div>
                <div class="empty" v-if="item.hxcourtktgg.length === 0">暂无数据</div>
                <table class="detail-table" v-for="(sub,sIndex) in item.hxcourtktgg" :key="'hxcourtktgg_sub'+sIndex">
                    <tr>
                        <td>开庭公告ID</td>
                        <td>{{sub.ktggId}}</td>
                        <td>开庭时间</td>
                        <td>{{sub.sortTimeString}}</td>
                    </tr>
                    <tr>
                        <td>原告</td>
                        <td>{{sub.plainTiff}}</td>
                        <td>法院名称</td>
                        <td>{{sub.courtName}}</td>
                    </tr>
                    <tr>
                        <td>案号</td>
                        <td colspan="3">{{ sub.caseNo }}</td>
                    </tr>
                    <tr>
                        <td>案由</td>
                        <td colspan="3">{{ sub.caseCause }}</td>
                    </tr>
                    <tr>
                        <td>内容概要</td>
                        <td colspan="3">{{ sub.caseBody }}</td>
                    </tr>
                </table>

                <div class="line-title">6 限制消费</div>
                <div class="divider-line-1"></div>
                <el-table stripe :data="item.hxcourtxzxf" class="br-table">
                    <el-table-column label="案号" prop="elxgCaseCode"></el-table-column>
                    <el-table-column label="性别" prop="elxgSexName"></el-table-column>
                    <el-table-column label="年龄" prop="elxgAge"></el-table-column>
                    <el-table-column label="执行法院" prop="elxgCourtName"></el-table-column>
                    <el-table-column label="地域名称" prop="elxgAreaName"></el-table-column>
                    <el-table-column label="发布时间" prop="elxgPublishDate"></el-table-column>
                    <el-table-column label="立案时间" prop="elxgRegDate"></el-table-column>
                </el-table>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
            </div>
            <div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="main-title">企业资信档案库</div>
                <div class="main-title-desc">核心着力于企业风控，致力于数据赋能、科技赋能，提高线上杠杆，风控效率</div>
                <div align="center">
                    <div class="sub-gap"></div>
                    <div class="sub-gap"></div>
                    <img src="@/assets/images/report/end.png" alt="图片加载失败" style="width:100%;">
                    <div class="sub-gap"></div>
                    <div class="sub-gap"></div>
                </div>
                <div class="main-title">报告使用说明</div>
                <div class="main-title-desc">客户使用本报告，需经过被查询人授权，客户承担因授权不充分引起的任何法律责任</div>
                <div class="main-title-desc">本报告仅限客户内部使用，请妥善保存本报告，不得向任何第三方泄露或允许任何第三方使用本报告</div>
                <div class="main-title-desc">本报告仅供客户参考，不作为客户决策的依据</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import radarChart from "./radarChart.vue";
@Component({
    components: {
        radarChart,
    },
})
export default class creditInvestigation extends Vue {
    @Prop({ default: () => ({}), type: Object }) data;
    @Prop({ default: () => false, type: Boolean }) reportLoading;
    public chartData: any = [
        {
            value: [60, 73, 85, 40, 90],
            name: "某软件",
        },
    ];
}
</script>

<style lang="scss" scoped>
</style>