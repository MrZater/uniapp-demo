<template>
    <div class="template-container">
        <div class="sub-title">授信方式</div>
        <div class="sub-gap"></div>
        <div>
            <el-checkbox-group v-model="creditType" :min="1" @change="onChange">
                <el-checkbox label="01">信用</el-checkbox>
                <el-checkbox label="02">保证</el-checkbox>
                <el-checkbox label="03">抵押</el-checkbox>
                <el-checkbox label="04">质押</el-checkbox>
                <el-checkbox label="05">其他</el-checkbox>
            </el-checkbox-group>
        </div>
        <el-form :model="formData" :rules="rules" ref="forms" size="small">
            <div v-if="creditType.includes('02')">
                <div class="sub-gap"></div>
                <div class="sub-gap"></div>
                <div class="sub-title">保证机构信息<el-button type="primary" class="br-btn" @click="onAdd(formData.loanCreditSxguaranteebizs)">新增</el-button>
                </div>
                <el-table stripe border :data="formData.loanCreditSxguaranteebizs" class="br-table">
                    <el-table-column label="保证机构" prop="custId" width="250px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguaranteebizs.' + scope.$index + '.custId' " class="br-form-item-label" :rules="rules.code2">
                                <el-select v-model="scope.row.custId" filterable class="br-select" @change="(val)=>onOrgChange(scope.row,val)">
                                    <el-option v-for="(item,index) in orgOption" :key="index" :value="item.custId" :label="item.bizName" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="资信评分" prop="riskScore" width="100px"></el-table-column>
                    <el-table-column label="信用等级" prop="riskLevel" width="100px"></el-table-column>
                    <el-table-column label="建议信用额度上限" prop="surveyMaxAmt" width="130px"></el-table-column>
                    <el-table-column label="信用风险额度" prop="riskMaxAmt" width="100px"></el-table-column>
                    <el-table-column label="保证金额" prop="guaranteeMoney" width="200px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguaranteebizs.' + scope.$index + '.guaranteeMoney' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.guaranteeMoney" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="保证合同编号" prop="guaranteeContractNo" width="230px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguaranteebizs.' + scope.$index + '.guaranteeContractNo' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.guaranteeContractNo" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" width="200px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguaranteebizs.' + scope.$index + '.beginDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.beginDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="endDate" width="200px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguaranteebizs.' + scope.$index + '.endDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" prop="files" min-width="150">
                        <template slot-scope="scope">
                            <el-upload class="upload-demo" :file-list="scope.row.files" action="" :auto-upload="false" multiple
                                :on-remove="(file,fileList)=> handleRemove(file,fileList,formData.loanCreditSxguaranteebizs,scope.$index)"
                                :on-change="(file,fileList)=> handleChange(file,fileList,formData.loanCreditSxguaranteebizs,scope.$index)">
                                <el-button size="small" type="text">上传文件</el-button>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onReport(scope.row)">资信报告</el-button>
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.loanCreditSxguaranteebizs)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('02')">
                <div class="sub-gap"></div>
                <div class="sub-title">保证人信息<el-button type="primary" class="br-btn" @click="onAdd(formData.loanCreditSxguarantors)">新增</el-button>
                </div>

                <el-table stripe border :data="formData.loanCreditSxguarantors" class="br-table">
                    <el-table-column label="保证人姓名" prop="guarantorName" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguarantors.' + scope.$index + '.guarantorName' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.guarantorName" class="br-input-small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="保证人身份证号" prop="guarantorPaperid" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguarantors.' + scope.$index + '.guarantorPaperid' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.guarantorPaperid" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="保证金额" prop="guaranteeMoney" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguarantors.' + scope.$index + '.guaranteeMoney' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.guaranteeMoney" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="保证合同编号" prop="guaranteeContractNo" min-width="230">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguarantors.' + scope.$index + '.guaranteeContractNo' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.guaranteeContractNo" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguarantors.' + scope.$index + '.beginDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.beginDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="endDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxguarantors.' + scope.$index + '.endDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" prop="files" min-width="150">
                        <template slot-scope="scope">
                            <el-upload class="upload-demo" :file-list="scope.row.files" action="" :auto-upload="false" multiple
                                :on-remove="(file,fileList)=> handleRemove(file,fileList,formData.loanCreditSxguarantors,scope.$index)"
                                :on-change="(file,fileList)=> handleChange(file,fileList,formData.loanCreditSxguarantors,scope.$index)">
                                <el-button size="small" type="text">上传文件</el-button>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.loanCreditSxguarantors)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('03')">
                <div class="sub-gap"></div>
                <div class="sub-title">抵押信息<el-button type="primary" class="br-btn" @click="onAdd(formData.loanCreditSxmortgageinfos)">新增</el-button>
                </div>
                <el-table stripe border :data="formData.loanCreditSxmortgageinfos" class="br-table">
                    <el-table-column label="抵押物" prop="pawn" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.pawn' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.pawn" class="br-input-small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="mortgageType" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.mortgageType' " class="br-form-item-label" :rules="rules.code2">
                                <el-select v-model="scope.row.mortgageType" filterable class="br-select-small">
                                    <el-option v-for="(item,index) in $select('mortgageType')" :key="index" :value="item.value" :label="item.text" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押价值（元）" prop="mortgageValue" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.mortgageValue' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model.trim="scope.row.mortgageValue" :min="0" :step="1000" @change="(val)=>onRateChange(val,scope.row)"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="转换比例（%）" prop="conversionRatio" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.conversionRatio' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model.trim="scope.row.conversionRatio" :min="0" :max="1" :precision="2" :step="0.1" @change="(val)=>onRateChange(val,scope.row)"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="转换授信额度" prop="conversionCreditQuota" min-width="150"></el-table-column>
                    <el-table-column label="抵押权人" prop="mortgagee" min-width="250">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.mortgagee' " class="br-form-item-label" :rules="rules.code2">
                                <el-select v-model="scope.row.mortgagee" multiple filterable collapse-tags class="br-select">
                                    <el-option v-for="(item,index) in mortgageeOptions" :key="index" :value="item.orgCode" :label="item.orgName" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押合同编号" prop="mortgageContractNo" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.mortgageContractNo' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.mortgageContractNo" class="br-input-small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.beginDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.beginDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="endDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxmortgageinfos.' + scope.$index + '.endDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" prop="files" min-width="150">
                        <template slot-scope="scope">
                            <el-upload class="upload-demo" :file-list="scope.row.files" action="" :auto-upload="false" multiple
                                :on-remove="(file,fileList)=> handleRemove(file,fileList,formData.loanCreditSxmortgageinfos,scope.$index)"
                                :on-change="(file,fileList)=> handleChange(file,fileList,formData.loanCreditSxmortgageinfos,scope.$index)">
                                <el-button size="small" type="text">上传文件</el-button>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.loanCreditSxmortgageinfos)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('04')">
                <div class="sub-gap"></div>
                <div class="sub-title">质押信息<el-button type="primary" class="br-btn" @click="onAdd(formData.loanCreditSxpledges)">新增</el-button>
                </div>
                <el-table stripe border :data="formData.loanCreditSxpledges" class="br-table">
                    <el-table-column label="抵押物" prop="pawn" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.pawn' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.pawn" class="br-input-small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="类型" prop="mortgageType" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.mortgageType' " class="br-form-item-label" :rules="rules.code2">
                                <el-select v-model="scope.row.mortgageType" filterable class="br-select-small">
                                    <el-option v-for="(item,index) in $select('mortgageType')" :key="index" :value="item.value" :label="item.text" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押价值（元）" prop="mortgageValue" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.mortgageValue' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model.trim="scope.row.mortgageValue" :min="0" :step="1000" @change="(val)=>onRateChange(val,scope.row)"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="转换比例（%）" prop="conversionRatio" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.conversionRatio' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model="scope.row.conversionRatio" :min="0" :max="1" :precision="2" :step="0.1" @change="(val)=>onRateChange(val,scope.row)"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="转换授信额度" prop="conversionCreditQuota" min-width="150"></el-table-column>
                    <el-table-column label="抵押权人" prop="mortgagee" min-width="250">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.mortgagee' " class="br-form-item-label" :rules="rules.code2">
                                <el-select v-model="scope.row.mortgagee" multiple filterable collapse-tags class="br-select">
                                    <el-option v-for="(item,index) in mortgageeOptions" :key="index" :value="item.orgCode" :label="item.orgName" />
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="抵押合同编号" prop="mortgageContractNo" min-width="150">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.mortgageContractNo' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.mortgageContractNo" class="br-input-small"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.beginDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.beginDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="endDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxpledges.' + scope.$index + '.endDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" prop="files" min-width="150">
                        <template slot-scope="scope">
                            <el-upload class="upload-demo" :file-list="scope.row.files" action="" :auto-upload="false" multiple
                                :on-remove="(file,fileList)=> handleRemove(file,fileList,formData.loanCreditSxpledges,scope.$index)"
                                :on-change="(file,fileList)=> handleChange(file,fileList,formData.loanCreditSxpledges,scope.$index)">
                                <el-button size="small" type="text">上传文件</el-button>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.loanCreditSxpledges)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-if="creditType.includes('05')">
                <div class="sub-gap"></div>
                <div class="sub-title">其他<el-button type="primary" class="br-btn" @click="onAdd(formData.loanCreditSxotherstypes)">新增</el-button>
                </div>
                <el-table stripe border :data="formData.loanCreditSxotherstypes" class="br-table">
                    <el-table-column label="授信方式" prop="creditType" min-width="250px">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxotherstypes.' + scope.$index + '.creditType' " class="br-form-item-label" :rules="rules.code1">
                                <el-input v-model.trim="scope.row.creditType" class="br-input"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="转换授信额度" prop="conversionCreditQuota" min-width="250">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxotherstypes.' + scope.$index + '.conversionCreditQuota' " class="br-form-item-label" :rules="rules.code2">
                                <el-input-number v-model.trim="scope.row.conversionCreditQuota" :min="0" :step="1000"></el-input-number>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="开始时间" prop="beginDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxotherstypes.' + scope.$index + '.beginDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.beginDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="结束时间" prop="endDate" min-width="200">
                        <template slot-scope="scope">
                            <el-form-item :prop="'loanCreditSxotherstypes.' + scope.$index + '.endDate' " class="br-form-item-label" :rules="rules.code2">
                                <el-date-picker v-model="scope.row.endDate" type="date" placeholder="选择日期" class="br-datepicker-small" value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="附件" prop="files" min-width="150">
                        <template slot-scope="scope">
                            <el-upload class="upload-demo" :file-list="scope.row.files" action="" :auto-upload="false" multiple
                                :on-remove="(file,fileList)=> handleRemove(file,fileList,formData.loanCreditSxotherstypes,scope.$index)"
                                :on-change="(file,fileList)=> handleChange(file,fileList,formData.loanCreditSxotherstypes,scope.$index)">
                                <el-button size="small" type="text">上传文件</el-button>
                            </el-upload>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="onRemark(scope.row)">备注</el-button>
                            <el-popconfirm title="确认删除该数据吗？" @onConfirm="onDelete(scope.$index,formData.loanCreditSxotherstypes)" style="margin-left:10px">
                                <el-button type="text" size="mini" slot="reference">删除</el-button>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
        <remark-dialog ref="remark"></remark-dialog>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
const general = namespace("general");
import RemarkDialog from "./remark-dialog.vue";
@Component({
    components: {
        "remark-dialog": RemarkDialog,
    },
})
export default class creditWay extends Vue {
    @Prop({ default: () => [], type: Array }) propCreditTypes;
    @Watch("propCreditTypes", { deep: true })
    onCreditType(val) {
        if (val) {
            this.creditType = val;
        }
    }
    @Prop({ default: () => {}, type: Object }) propData;
    @Watch("propData", { deep: true })
    onPropData(val) {
        if (val) {
            this.formData = { ...val };
        }
    }
    @general.Action queryCreditedBiz; //保证机构
    @general.State orgOption; //保证机构
    @general.Action queryOrgNameList; //抵押权人
    @general.State mortgageeOptions; //抵押权人
    public creditType = ["01"];
    public formData: any = {
        loanCreditSxguaranteebizs: [
            // {
            //     custId: "KHBH89389899-620210118I4r0",
            //     riskScore: "100",
            //     riskLevel: "AA",
            //     surveyMaxAmt: 10000,
            //     riskMaxAmt: 1000,
            //     guaranteeMoney: 10000,
            //     guaranteeContractNo: "2020010201211",
            //     beginDate: "2020-10-20",
            //     endDate: "2020-10-20",
            // },
            // {
            //     custId: "KHBH89389899-620210118I4r0",
            //     riskScore: "100",
            //     riskLevel: "AA",
            //     surveyMaxAmt: 10000,
            //     riskMaxAmt: 1000,
            //     guaranteeMoney: 10000,
            //     guaranteeContractNo: "2020010201211",
            //     beginDate: "2020-10-20",
            //     endDate: "2020-10-20",
            // },
        ],
        loanCreditSxguarantors: [
            // {
            //     guarantorName: "朱明亮",
            //     guarantorPaperid: "130824199401026011",
            //     guaranteeMoney: 1000,
            //     guaranteeContractNo: "2020010201211",
            //     beginDate: "2020-10-20",
            //     endDate: "2020-10-20",
            // },
        ],
        loanCreditSxmortgageinfos: [
            // {
            //     pawn: "房子",
            //     mortgageType: "02",
            //     mortgageValue: 1000,
            //     conversionRatio: "0.75",
            //     conversionCreditQuota: 750,
            //     mortgagee: ["ddd8b5268515489c92c9b54998467313"],
            //     mortgageContractNo: "202001020102025",
            //     beginDate: "2020-10-20",
            //     endDate: "2020-10-20",
            // },
        ],
        loanCreditSxpledges: [
            // {
            //     pawn: "车子",
            //     mortgageType: "01",
            //     mortgageValue: 1000,
            //     conversionRatio: "0.75",
            //     conversionCreditQuota: 750,
            //     mortgagee: ["ddd8b5268515489c92c9b54998467313"],
            //     mortgageContractNo: "202001020102025",
            //     beginDate: "2020-10-20",
            //     endDate: "2020-10-20",
            // },
        ],
        loanCreditSxotherstypes: [
            // {
            //     creditType: "贷款",
            //     conversionCreditQuota: 1000,
            //     beginDate: "2020-10-20",
            //     endDate: "2020-10-20",
            // },
        ],
    };

    public rules = {
        code1: [{ required: true, message: "请输入", trigger: "blur" }],
        code2: [{ required: true, message: "请选择", trigger: "change" }],
    };

    mounted() {
        // 保证机构
        this.queryCreditedBiz({ flag: "01" });
        // 抵押权人
        this.queryOrgNameList({ flag: "5" });
    }

    onRateChange(val, row) {
        row.conversionCreditQuota = row.mortgageValue * row.conversionRatio;
    }

    // 保证机构改变时
    onOrgChange(row, val) {
        this.orgOption.forEach((item) => {
            if (item.custId === val) {
                row.bizName = item.bizName || "";
                row.riskScore = item.riskScore || "";
                row.riskLevel = item.riskLevel || "";
                row.surveyMaxAmt = item.surveyMaxAmt || 0;
                row.riskMaxAmt = item.riskMaxAmt || 0;
            }
        });
    }

    // 授信方式
    onChange(val) {
        this.$bus.$emit("onCreditWayChange", [...val]);
    }

    // 资信报告
    onReport(row) {}

    // 添加
    onAdd(list) {
        list.push({});
    }

    // 文件上传
    handleChange(file, fileList, list, index) {
        list[index].files = fileList;
    }
    // 文件删除
    handleRemove(file, fileList, list, index) {
        list[index].deleteUrls
            ? list[index].deleteUrls.push(file.url)
            : (list[index].deleteUrls = [file.url]);

        list[index].files = list[index].files.filter(
            (item) => item.url != file.url
        );
    }

    // 备注
    onRemark(row) {
        let $el: any = this.$refs["remark"];
        $el.init(row);
    }

    // 供父组件使用
    handleParams() {
        let {
            loanCreditSxguaranteebizs,
            loanCreditSxguarantors,
            loanCreditSxmortgageinfos,
            loanCreditSxpledges,
            loanCreditSxotherstypes,
        } = this.formData;
        let params: any = {};

        if (this.creditType.includes("02")) {
            params.loanCreditSxguaranteebizs = loanCreditSxguaranteebizs;
            params.loanCreditSxguarantors = loanCreditSxguarantors;
        }
        if (this.creditType.includes("03")) {
            params.loanCreditSxmortgageinfos = loanCreditSxmortgageinfos;
        }
        if (this.creditType.includes("04")) {
            params.loanCreditSxpledges = loanCreditSxpledges;
        }
        if (this.creditType.includes("05")) {
            params.loanCreditSxotherstypes = loanCreditSxotherstypes;
        }

        return params;
    }

    // 删除
    onDelete(index, rows) {
        rows.splice(index, 1);
    }
}
</script>

<style scoped lang="scss">
.br-btn {
    position: absolute;
    right: 0px;
    top: -5px;
}
</style>
