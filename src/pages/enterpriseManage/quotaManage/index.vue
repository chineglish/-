<template>
  <div id="quotaManage">
    <m-breadcrumb :data="data"></m-breadcrumb>
    <m-new-form
      :componentJson="formConfigJson"
      :btnData="btnData"
      :formModel="formModel"
      @changeAcNo="changeAcNo"
      @submit="onSubmit"
    ></m-new-form>
    <div v-if="showResult">
      <d-table
        :table-data="tableData"
        :tableHeadData="tableHeadData"
        :pagesize="pagesize"
        :operate-data="operateData"
        @goDetail="goDetail"
        @updateQuota="updateQuota"
      ></d-table>
    </div>
    <m-hint-box :msgs="msgs"></m-hint-box>
  </div>
</template>

<script type="text/javascript">
/**
 * @name 限额管理
 */
import { httpPost } from '@/api/sys/http'
import util from '@/libs/util'
import { currency_type, trans_type_code } from '@/assets/js/entity'

export default {
  name: '',
  data: function () {
    return {
      showResult: false,
      formModel: {
        payerAcNoList: [],
        enterpriseCode: '',
        enterpriseName: '',
        accountNo: '',
        currency: 'CNY' // 币种
      },
      msgs: [
        '可实现企业用户进行交易限额的查询和设置功能。'
      ],
      formConfigJson: {
        formWidth: '50%',
        // labelWidth: '100%',
        rules: {},
        formItems: [
          {
            formWidth: '50%',
            labelWidth: '50%',
            group: [
              {
                'disabled': false,
                'label': '账户',
                'type': 'select',
                options: [],
                trans: { value: 'accountNoShow' },
                'changeEventName': 'changeAcNo',
                'key': 'accountNo'
              },
              {
                'disabled': false,
                'label': '币种',
                'type': 'text',
                'key': 'currency',
                formatter: (name, value) => util.handleEnums(currency_type, value)
              }
            ]
          }
        ]
      },
      btnData: [
        { btnText: '查询', class: 'm-submit-btn', clickEventName: 'submit' }
      ],
      data: ['企业管理台', '限额管理', '限额设置查询'],
      pagesize: 20,
      tableHeadData: [
        { label: '限额名称', prop: 'transTypeCode', width: '100', formatter: (row, column, cellValue, index) => util.handleEnums(trans_type_code, cellValue) },
        { label: '单笔限额(元)', prop: 'limitTrs', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '日累计限额(元)', prop: 'limitDay', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '日累计笔数', prop: 'limitDayCount', width: '100' },
        { label: '月累计限额(元)', prop: 'limitMon', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '月累计笔数', prop: 'limitMonCount', width: '100' },
        { label: '年累计限额(元)', prop: 'limitYear', width: '180', formatter: (row, column, cellValue, index) => util.formatCurrency(cellValue) },
        { label: '年累计笔数', prop: 'limitYearCount' }
      ],
      tableData: [],
      operateData: {
        btnData: [
          {
            type: 'text',
            btnText: '详情',
            eventName: 'goDetail'
          },
          {
            type: 'text',
            btnText: '修改',
            eventName: 'updateQuota'
          }
        ]
      }
    }
  },
  methods: {
    // 获取账号列表
    getAccountList () {
      // MCLimitManage
      httpPost('/eweb-query.PayerAccountListQry.do', { transCode: '' }).then(res => {
        this.formModel.payerAcNoList = res.AcList || ''
        this.formModel.payerAcNoList.forEach((item) => {
          item.accountNoShow = util.getPayerAccount(item)
        })
        this.formConfigJson.formItems[0].group[0].options = this.formModel.payerAcNoList
        if (this.formModel.payerAcNoList) {
          this.formModel.accountNo = 0
        }
      })
    },
    // 选择账号事件
    changeAcNo (data) {
      this.formModel.accountNo = data.accountNo
    },
    // 点击查询
    onSubmit (data) {
      var params = {
        acNo: this.formModel.payerAcNoList[data.accountNo].acNo,
        subAcNo: this.formModel.payerAcNoList[data.accountNo].subAcNo
      }
      httpPost('/eweb-enterprise.QueryValidLimitList.do', params).then(res => {
        this.tableData = res.limitList
        this.showResult = true
      })
    },
    // 详情
    goDetail (data) {
      let params = {
        acNo: this.formModel.payerAcNoList[this.formModel.accountNo].acNo,
        subAcNo: this.formModel.payerAcNoList[this.formModel.accountNo].subAcNo,
        productId: data.data.productId,
        transTypeCode: data.data.transTypeCode
      }
      httpPost('/eweb-enterprise.QueryAllLimitTypeRtLimit.do', params).then(res => {
        this.formModel.runtimeLimitTrs = Math.abs(res.list[0].runtimeLimitTrs) // 已用单笔
        this.formModel.runtimeLimitDay = Math.abs(res.list[0].runtimeLimitDay) // 已用日累计
        this.formModel.runtimeLimitMon = Math.abs(res.list[0].runtimeLimitMon) // 已用月累计
        this.formModel.runtimeLimitYear = Math.abs(res.list[0].runtimeLimitYear) // 已用年累计
        this.formModel.runtimeLimitDayCount = Math.abs(res.list[0].runtimeLimitDayCount) // 已用日累计笔数
        this.formModel.runtimeLimitMonCount = Math.abs(res.list[0].runtimeLimitMonCount) // 已用月累计笔数
        this.formModel.runtimeLimitYearCount = Math.abs(res.list[0].runtimeLimitYearCount) // 已用年累计必输
        this.$router.push({
          name: 'quotaManageDetail',
          params: {
            ...data,
            formModel: this.formModel,
            tableData: this.tableData
          }
        })
      })
    },
    // 修改
    updateQuota (data) {
      this.$router.push({
        name: 'quotaUpdateInput',
        params: {
          fromWhere: 'quotaManage',
          ...data,
          formModel: this.formModel,
          tableData: this.tableData
        }
      })
    }
  },
  created () {
    if (this.getUser().adminUser) {
      this.operateData = {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'goDetail'
          },
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '修改',
            eventName: 'updateQuota'
          }
        ]
      }
    } else {
      this.operateData = {
        btnData: [
          {
            type: 'text',
            size: 'mini',
            plain: true,
            btnText: '详情',
            eventName: 'goDetail'
          }
        ]
      }
    }
    if (this.$route.params.formModel) {
      this.formModel = this.$route.params.formModel
      this.formConfigJson.formItems[0].group[0].options = this.formModel.payerAcNoList
      this.tableData = this.$route.params.tableData
      this.showResult = true
    } else {
      this.getAccountList()
    }
  }
}
</script>
<style lang="scss">
  #quotaManage{
    .el-button--primary{
      background-color:#D41618;
      border-color:#D41618
    }
    .el-button--primary:hover{
      background-color:#D41618;
      border-color:#D41618
    }
    .el-button--default:hover{
      color:#D41618;
      background-color:#fff;
      border-color:#D41618
    }
    .el-form-item{
      justify-content: left !important;
    }
    .listStyle{
      p{
        line-height:30px;
        margin-bottom:20px;
        margin-top:20px;
      }
    }
  }
</style>
